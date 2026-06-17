"use strict";
var __importDefault =
  (this as any).__importDefault ||
  function (mod: any) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const db_1 = require("../../config/db");

const loginUserIntoDB = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [
    email.toLowerCase(),
  ]);

  if (user.rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcryptjs_1.default.compare(
    password,
    user.rows[0].password,
  );

  if (!isMatch) {
    // BUG FIX 13: Original threw "Invalid Credentials!" (with exact wording).
    // Use same generic message as user-not-found to prevent user enumeration attacks.
    throw new Error("Invalid credentials");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const token = jsonwebtoken_1.default.sign(
    jwtPayload,
    config_1.default.jwtSecret,
    {
      expiresIn: "1d",
    },
  );

  delete user.rows[0].password;
  return { token, user: user.rows[0] };
};

const signinUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  // BUG FIX 14: Original allowed any caller to self-assign role="admin" during signup.
  // New users must always be created as "customer". Only admins can elevate roles
  // later via PUT /api/v1/users/:userId.
  const safeRole = "customer";

  // BUG FIX 15: email must be stored lowercase (per schema requirement) but
  // original code stored it as-is, so login with different casing would fail.
  const normalizedEmail = (email as string).toLowerCase();
  const hashedPass = await bcryptjs_1.hash(password as string, 10);
  const result = await db_1.pool.query(
    `INSERT INTO users(name, email, password, phone, role) 
         VALUES($1, $2, $3, $4, $5) 
         RETURNING *`,
    [name, normalizedEmail, hashedPass, phone, safeRole],
  );
  delete result.rows[0].password;
  return result;
};

exports.authServices = {
  loginUserIntoDB,
  signinUser,
};

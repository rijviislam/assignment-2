import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../config/db";
const loginUserIntoDB = async (email: string, password: string) => {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (user.rows.length === 0) {
    throw new Error("User not found");
  }
  if (!isMatch) {
    throw new Error("Invalid Credentials!");
  }
  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };
  // const secret = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
  const token = jwt.sign(jwtPayload, config.jwtSecret as string, {
    expiresIn: "1d",
  });
  delete user.rows[0].password;
  return { token, user: user.rows[0] };
};

const signinUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) 
   VALUES($1, $2, $3, $4, $5) 
   RETURNING *`,
    [name, email, hashedPass, phone, role]
  );
  delete result.rows[0].password;
  return result;
};

export const authServices = {
  loginUserIntoDB,
  signinUser,
};

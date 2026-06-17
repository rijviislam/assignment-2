"use strict";

import { NextFunction, Request, Response } from "express";

var __importDefault =
  (this as any).__importDefault ||
  function (mod: any) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const db_1 = require("../config/db");

const auth = (...roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ success: false, message: "You are not authorized" });
      }

      const token = authHeader.split(" ")[1];

      // BUG FIX 1: jwt.verify throws on expired token — was crashing with 500
      // because the original code had no try/catch around this block,
      // now it is inside try/catch so expired tokens return 401 correctly.
      let decoded;
      try {
        decoded = jsonwebtoken_1.default.verify(
          token,
          config_1.default.jwtSecret,
        );
      } catch (jwtErr) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid or expired token" });
      }

      const user = await db_1.pool.query(
        `SELECT id, name, email, role FROM users WHERE email=$1`,
        [decoded.email],
      );

      if (user.rows.length === 0) {
        return res
          .status(401)
          .json({ success: false, message: "User not found!" });
      }

      // BUG FIX 2: was setting req.user = decoded (JWT data) but the DB user
      // may have a different/updated role than what's in the old token.
      // Always trust the live DB role for authorization decisions.
      req.user = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      };

      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ success: false, message: "You are not authorized" });
      }

      next();
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
};

export default auth;

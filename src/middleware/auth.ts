import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("You are not aythorized");
    }
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

    console.log(decoded);
    const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      decoded.email,
    ]);
    if (user.rows.length === 0) {
      throw new Error("user not found!");
    }
    req.user = decoded;
    console.log(token);
    next();
  };
};

export default auth;

import { Request, Response } from "express";

Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");

const loginUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const result = await auth_service_1.authServices.loginUserIntoDB(
      req.body.email,
      req.body.password,
    );
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const signinUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, email, password, phone",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const result = await auth_service_1.authServices.signinUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

export const authController = {
  loginUser,
  signinUser,
};

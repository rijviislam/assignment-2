import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUserIntoDB(
      req.body.email,
      req.body.password
    );
    res
      .status(200)
      .json({ success: true, message: "user login", data: result });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const signinUser = async (req: Request, res: Response) => {
  // const { name, email, password } = req.body;

  try {
    const result = await authServices.signinUser(req.body);
    console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Data Inserted Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const authController = {
  loginUser,
  signinUser,
};

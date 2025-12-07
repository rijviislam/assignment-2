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
      .json({ success: true, message: "user login", data: result.rows[0] });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
export const authController = {
  loginUser,
};

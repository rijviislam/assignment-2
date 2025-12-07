import { Request, Response } from "express";
import { userServices } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      message: "User Retrieve successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "User can not found" });
  }
};

const updatedUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await userServices.updatedUser(
      name,
      email,
      req.params.id as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const useCreateUser = {
  getUser,
  updatedUser,
};

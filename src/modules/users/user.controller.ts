import { Request, Response } from "express";
import { userServices } from "./user.service";
const createUser = async (req: Request, res: Response) => {
  // const { name, email, password } = req.body;

  try {
    const result = await userServices.createUser(req.body);
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(500).json({ success: false, message: "User Cant found" });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const useCreateUser = {
  createUser,
  getUser,
  getSingleUser,
};

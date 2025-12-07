import { Request, Response } from "express";
import { useVehiclesServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await useVehiclesServices.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await useVehiclesServices.getVehicle();

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await useVehiclesServices.getSingleVehicles(
      req.params.id as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: "Vehicles not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const updateVehicle = async (req: Request, res: Response) => {
  const { daily_rent_price, availability_status } = req.body;
  try {
    const result = await useVehiclesServices.updateVehicle(
      daily_rent_price,
      availability_status,
      req.params.id as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await useVehiclesServices.deleteVehicle(
      req.params.id as string
    );
    if (result.rowCount === 0) {
      res.status(404).json({ success: false, message: "Vehicle not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Vehicle deleted successfully" });
    }
  } catch (err: any) {
    res.json(404).json({ success: false, message: err.message });
  }
};

export const useCreateVehicle = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};

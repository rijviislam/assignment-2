import { Request, Response } from "express";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateVehicle = void 0;
const vehicle_service_1 = require("./vehicle.service");

const createVehicle = async (req: Request, res: Response) => {
  try {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = req.body;

    if (
      !vehicle_name ||
      !type ||
      !registration_number ||
      !daily_rent_price ||
      !availability_status
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: vehicle_name, type, registration_number, daily_rent_price, availability_status",
      });
    }

    const validTypes = ["car", "bike", "van", "SUV"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid type. Must be one of: ${validTypes.join(", ")}`,
      });
    }

    const validStatuses = ["available", "booked"];
    if (!validStatuses.includes(availability_status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid availability_status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const result = await vehicle_service_1.useVehiclesServices.createVehicle(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A vehicle with this registration number already exists",
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicle_service_1.useVehiclesServices.getVehicle();
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
    const result =
      await vehicle_service_1.useVehiclesServices.getSingleVehicles(
        req.params.id,
      );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicle_service_1.useVehiclesServices.updateVehicle(
      req.body,
      req.params.id,
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicle_service_1.useVehiclesServices.deleteVehicle(
      req.params.id,
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Vehicle deleted successfully" });
  } catch (err: any) {
    if (err.code === "23503") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete vehicle with active bookings",
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

export const useCreateVehicle = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};

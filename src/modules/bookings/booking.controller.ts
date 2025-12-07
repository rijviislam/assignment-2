import { Request, Response } from "express";
import { useServiceBookings } from "./booking.service";

const createBookings = async (req: Request, res: Response) => {
  try {
    const result = await useServiceBookings.createBooking(req.body);
    console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Booking Inserted Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getBooking = async (req: Request, res: Response) => {
  try {
    const result = await useServiceBookings.getBooking();
    res.status(200).json({
      success: true,
      message: "Bookings Retrieve successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ success: false, message: "Bookings can not found!" });
  }
};
const deleteBooking = async (req: Request, res: Response) => {
  try {
    const result = await useServiceBookings.deleteBooking(
      req.params.id as string
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Booking deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const useCreateBookings = {
  createBookings,
  getBooking,
  deleteBooking,
};

import { useServiceBookings } from "./booking.service";

const createBooking = async (req: any, res: any, next: any) => {
  try {
    const result = await useServiceBookings.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

const getBooking = async (req: any, res: any, next: any) => {
  try {
    const { id, role } = req.user;

    const result = await useServiceBookings.getBooking(id, role);

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    next(err);
  }
};

const updateBooking = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { role } = req.user;

    const result = await useServiceBookings.updateBooking(id, status, role);

    res.status(200).json({
      success: true,
      message: "Booking updated",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

export const bookingController = {
  createBooking,
  getBooking,
  updateBooking,
};

import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
    throw new Error("Missing required booking fields");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const vehicleResult = await client.query(
      `SELECT * FROM vehicles WHERE id=$1 FOR UPDATE`,
      [vehicle_id],
    );

    if (vehicleResult.rows.length === 0) {
      throw new Error("Vehicle not found");
    }

    const vehicle = vehicleResult.rows[0];

    if (vehicle.availability_status !== "available") {
      throw new Error("Vehicle is not available");
    }

    const start = new Date(rent_start_date as string);
    const end = new Date(rent_end_date as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date format");
    }

    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      throw new Error("rent_end_date must be after rent_start_date");
    }

    const price = Number(vehicle.daily_rent_price);

    if (!Number.isFinite(price)) {
      throw new Error("Invalid vehicle price in database");
    }

    const total_price = price * days;

    if (!Number.isFinite(total_price)) {
      throw new Error("Total price calculation failed");
    }

    console.log("BOOKING DEBUG:", {
      price,
      days,
      total_price,
    });

    const result = await client.query(
      `INSERT INTO bookings
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        "active",
      ],
    );

    await client.query(
      `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
      [vehicle_id],
    );

    await client.query("COMMIT");

    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const getBooking = async (userId: string, userRole: string) => {
  if (userRole === "admin") {
    return pool.query(`SELECT * FROM bookings ORDER BY id DESC`);
  }

  return pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1 ORDER BY id DESC`,
    [userId],
  );
};

const updateBooking = async (
  bookingId: string,
  status: string,
  userRole: string,
) => {
  const allowedStatuses = ["cancelled", "returned"];

  if (!allowedStatuses.includes(status)) {
    throw new Error(
      `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
    );
  }

  const bookingResult = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);

  if (bookingResult.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingResult.rows[0];

  if (booking.status !== "active") {
    throw new Error(`Booking is already ${booking.status}`);
  }

  if (userRole === "customer") {
    if (status !== "cancelled") {
      throw new Error("Customers can only cancel bookings");
    }

    const today = new Date();
    const startDate = new Date(booking.rent_start_date);

    if (today >= startDate) {
      throw new Error("Cannot cancel booking after start date");
    }
  }

  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId],
  );

  if (status === "cancelled" || status === "returned") {
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id],
    );
  }

  return result;
};

export const useServiceBookings = {
  createBooking,
  getBooking,
  updateBooking,
};

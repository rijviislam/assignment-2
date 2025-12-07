import express from "express";
import auth from "../../middleware/auth";
import { useCreateBookings } from "./booking.controller";

const router = express.Router();
router.post("/", auth("customer", "admin"), useCreateBookings.createBookings);
router.get("/", auth("customer", "admin"), useCreateBookings.getBooking);
router.get("/:id", auth("customer", "admin"), useCreateBookings.updateBooking);

export const bookingsRouter = router;

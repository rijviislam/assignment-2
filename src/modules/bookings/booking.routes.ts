import express from "express";
import { useCreateBookings } from "./booking.controller";

const router = express.Router();
router.post("/", useCreateBookings.createBookings);
router.get("/", useCreateBookings.getBooking);
router.delete("/:id", useCreateBookings.deleteBooking);

export const bookingsRouter = router;

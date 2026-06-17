import express from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.post("/", auth("customer", "admin"), bookingController.createBooking);

router.get("/", auth("customer", "admin"), bookingController.getBooking);

router.patch(
  "/:id",
  auth("customer", "admin"),
  bookingController.updateBooking,
);

export const bookingsRouter = router;

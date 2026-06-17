import express, { NextFunction, Request, Response } from "express";
import config from "../config";
import db from "../config/db";

import { authRoute } from "./auth/auth.routes";
import { bookingsRouter } from "./bookings/booking.routes";
import { userRouters } from "./users/user.routes";
import { vehiclesRouters } from "./vehicles/vehicle.routes";

const app = express();
const port = config.port;

// Middleware
app.use(express.json());

// DB connection
db();

// Test route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "⚡ TypeScript + Express = Magic backend in action! ✨",
  });
});

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRouters);
app.use("/api/v1/vehicles", vehiclesRouters);
app.use("/api/v1/bookings", bookingsRouter);

// Global error handler (IMPORTANT: must be last)
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(port, () => {
  console.log("⚡ Server running successfully!");
});

export default app;

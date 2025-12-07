import express, { Request, Response } from "express";
import config from "../config";
import initDB from "../config/db";
import { authRoute } from "./auth/auth.routes";
import { bookingsRouter } from "./bookings/booking.routes";
import { userRouters } from "./users/user.routes";
import { vehiclesRouters } from "./vehicles/vehicle.routes";

const app = express();
const port = config.port;

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "⚡ TypeScript + Express = Magic backend in action! ✨",
  });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRouters);
app.use("/api/v1/vehicles", vehiclesRouters);
app.use("/api/v1/bookings", bookingsRouter);
app.listen(port, () => {
  console.log("⚡ TypeScript + Express = Magic backend in action! ✨");
});
export default app;

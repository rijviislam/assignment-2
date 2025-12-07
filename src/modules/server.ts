import express, { Request, Response } from "express";
// import config from "../../config";
// import initDB from "../../config/db";
import config from "../config";
import initDB from "../config/db";
import { authRoute } from "./auth/auth.routes";
import { bookingsRouter } from "./bookings/booking.routes";
import { userRouters } from "./users/user.routes";
import { vehiclesRouters } from "./vehicles/vehicle.routes";
const app = express();
const port = config.port;
// parser
app.use(express.json());

// initializing DB
initDB();

// app.get("/", (req: Request, res: Response) => {
//   res.send("⚡ TypeScript + Express = Magic backend in action! ✨");
//   res.json({
//     endpoints: {
//       users: "/api/v1/users",
//       vehicles: "/api/v1/vehicles",
//       bookings: "/api/v1/bookings",
//     },
//   });
// });

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "⚡ TypeScript + Express = Magic backend in action! ✨",
    status: "running",
    timestamp: new Date().toISOString(),
    endpoints: {
      users: {
        GET: "/api/v1/users",
        POST: "/api/v1/users",
        GET_SINGLE: "/api/v1/users/:id",
      },
      vehicles: "/api/v1/vehicles",
      bookings: "/api/v1/bookings",
    },
    documentation: "Check README for API details",
  });
});

//users CRUD
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRouters);
app.use("/api/v1/vehicles", vehiclesRouters);
app.use("/api/v1/bookings", bookingsRouter);

// Local: http://localhost:8000/api/v1/users
// Vercel: https://assignment2...vercel.app/api/v1/users

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

app.listen(port, () => {
  console.log(
    "\x1b[35m%s\x1b[0m",
    "███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ "
  );
  console.log(
    "\x1b[35m%s\x1b[0m",
    "██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗"
  );
  console.log(
    "\x1b[35m%s\x1b[0m",
    "███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝"
  );
  console.log(
    "\x1b[35m%s\x1b[0m",
    "╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗"
  );
  console.log(
    "\x1b[35m%s\x1b[0m",
    "███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║"
  );
  console.log(
    "\x1b[35m%s\x1b[0m",
    "╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝"
  );
  console.log(`\n🚀 Server is flying on port ${port}`);
});

import express, { Request, Response } from "express";
import config from "../../config";
import initDB from "../../config/db";
import { bookingsRouter } from "./bookings/booking.routes";
import { userRouters } from "./users/user.routes";
import { vehiclesRouters } from "./vehicles/vehicle.routes";
const app = express();
const port = config.port;
// parser
app.use(express.json());

// initializing DB
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("⚡ TypeScript + Express = Magic backend in action! ✨");
});

//users CRUD
app.use("/api/v1", userRouters);
app.use("/vehicles", vehiclesRouters);
app.use("/bookings", bookingsRouter);

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

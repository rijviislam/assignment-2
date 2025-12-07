import express from "express";
import auth from "../../middleware/auth";
import { useCreateVehicle } from "./vehicle.controller";

const router = express.Router();
router.post("/", auth("admin"), useCreateVehicle.createVehicle);
router.get("/", useCreateVehicle.getVehicles);
router.get("/:id", useCreateVehicle.getSingleVehicle);
router.put("/:id", auth("admin"), useCreateVehicle.updateVehicle);
router.delete("/:id", auth("admin"), useCreateVehicle.deleteVehicle);

export const vehiclesRouters = router;

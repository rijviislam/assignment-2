import express from "express";
import { useCreateVehicle } from "./vehicle.controller";

const router = express.Router();
router.post("/", useCreateVehicle.createVehicle);
router.get("/", useCreateVehicle.getVehicles);
router.get("/:id", useCreateVehicle.getSingleVehicle);
router.put("/:id", useCreateVehicle.updateVehicle);
router.delete("/:id", useCreateVehicle.deleteVehicle);

export const vehiclesRouters = router;

import express from "express";
import { useCreateUser } from "./user.controller";

const router = express.Router();
router.post("/", useCreateUser.createUser);
router.get("/", useCreateUser.getUser);
router.get("/:id", useCreateUser.getSingleUser);

export const userRouters = router;

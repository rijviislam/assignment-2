import express from "express";
import { useCreateUser } from "./user.controller";

const router = express.Router();
router.post("/users", useCreateUser.createUser);
router.get("/users", useCreateUser.getUser);
router.get("/users/:id", useCreateUser.getSingleUser);

export const userRouters = router;

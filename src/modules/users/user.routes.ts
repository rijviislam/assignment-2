import express from "express";
import auth from "../../middleware/auth";
import { useCreateUser } from "./user.controller";

const router = express.Router();
router.get("/", auth(), useCreateUser.getUser);
router.get("/:id", useCreateUser.getSingleUser);
router.put("/:id", useCreateUser.updatedUser);

export const userRouters = router;

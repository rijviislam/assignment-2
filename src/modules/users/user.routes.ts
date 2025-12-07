import express from "express";
import auth from "../../middleware/auth";
import { useCreateUser } from "./user.controller";

const router = express.Router();
router.get("/", auth("admin"), useCreateUser.getUser);
router.put("/:id", auth("admin", "customer"), useCreateUser.updatedUser);
router.delete("/:id", auth("admin"), useCreateUser.deleteUser);

export const userRouters = router;

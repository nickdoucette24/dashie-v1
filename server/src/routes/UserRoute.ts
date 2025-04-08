import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

router.get("/", authenticate, authorize(["admin"]), getAllUsers);

router.get("/:id", authenticate, getUserById);

router.post("/", authenticate, authorize(["admin"]), createUser);

router.put("/:id", authenticate, updateUser);

router.delete("/:id", authenticate, authorize(["admin"]), deleteUser);

export default router;

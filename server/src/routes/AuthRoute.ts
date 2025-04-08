import express from "express";
import {
  register,
  login,
  getProfile,
  refreshToken,
  logout,
  validateRegister,
} from "../controllers/AuthController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/register", validateRegister, register);

router.post("/login", login);

router.get("/profile", authenticate, getProfile);

router.post("/refresh", refreshToken);

router.post("/logout", authenticate, logout);

export default router;

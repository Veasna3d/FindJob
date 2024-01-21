import express from "express";
import { rateLimit } from "express-rate-limit";
import { register, signIn } from "../controllers/authController.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const router = express.Router();


router.post("/register", limiter, register);
router.post("/login", signIn);

export default router;

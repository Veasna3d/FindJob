import express from "express";
import { rateLimit } from "express-rate-limit";

import {
  getCompanies,
  getCompanyById,
  getCompanyJobListing,
  getCompanyProfile,
  register,
  signIn,
  updateCompanyProfile,
} from "../controllers/companiesController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", limiter, register);
router.post("/get-company-profile", userAuth, getCompanyProfile);
router.post("get-company-joblisting", userAuth, getCompanyJobListing);
router.get("/", getCompanies);
router.get("/get-company/:id", getCompanyById);
router.put("/update-company", userAuth, updateCompanyProfile);

export default router;

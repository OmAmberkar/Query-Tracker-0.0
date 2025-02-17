import { userLogin } from "../controllers/login.controller.js";
import express from "express";
import { validateLoginInput } from "../middleware/auth.middleware.js";

const router = express.Router();

// Add validation middleware before login handler
router.get("/login", validateLoginInput, userLogin);

export default router;


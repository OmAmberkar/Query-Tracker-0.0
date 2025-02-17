import { userLogin } from "../controllers/login.controller.js";
import express from "express";

const router = express.Router();

router.post("/login", userLogin);

export default router;
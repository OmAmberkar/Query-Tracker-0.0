import { ticketData } from "../controllers/ticketgeneration.controller.js";
import express from "express";

const router = express.Router();

router.post("/query", ticketData);

export default router ;
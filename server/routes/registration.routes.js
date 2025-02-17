import { createUser } from '../controllers/registrations.controller.js'
import express from 'express';

const router = express.Router();

router.post('/register', createUser);

export default router;
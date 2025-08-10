import { createUser } from '../controllers/registrations.controller.js'
import { validateRegistration } from '../middleware/validation.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/register', validateRegistration, createUser);

export default router;
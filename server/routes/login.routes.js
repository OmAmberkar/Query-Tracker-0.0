import { userLogin } from '../controllers/login.controller.js'
import { validateLogin } from '../middleware/validation.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/login', validateLogin, userLogin);

export default router;
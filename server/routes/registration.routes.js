import { createUser, getUserProfile, getTeamMembers, requestAdminRole } from '../controllers/registrations.controller.js'
import { validateRegistration } from '../middleware/validation.middleware.js';
import { authenticateUser } from '../middleware/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/register', validateRegistration, createUser);
router.get('/profile', authenticateUser, getUserProfile);
router.get('/team', authenticateUser, getTeamMembers);
router.put('/request-admin', authenticateUser, requestAdminRole);

export default router;
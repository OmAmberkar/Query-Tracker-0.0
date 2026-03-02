import express from 'express';
import { getAllUsers, updateUserRole, deleteUser } from '../controllers/admin.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all users
router.get('/users', authenticateUser, getAllUsers);

// Update user role
router.put('/users/:id/role', authenticateUser, updateUserRole);

// Delete user
router.delete('/users/:id', authenticateUser, deleteUser);

export default router;

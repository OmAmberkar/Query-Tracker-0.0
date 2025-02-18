import express from 'express';
import { createTicket, getAllTickets } from '../controllers/ticketController.js';

const router = express.Router();

// Route to get all tickets
router.get('/tickets', getAllTickets);

// Route to create a new ticket
router.post('/tickets', createTicket);

export default router;

import express from 'express';
import { createTicket, getAllTickets } from '../controllers/ticketgeneration.controller.js'

const router = express.Router();

// Route to get all tickets
router.get('/getTickets', getAllTickets);

// Route to create a new ticket
router.post('/createTicket', createTicket);

export default router;

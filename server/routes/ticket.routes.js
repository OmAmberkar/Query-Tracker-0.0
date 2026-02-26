// import express from 'express';
// import { createTicket, getAllTickets } from '../controllers/ticketgeneration.controller.js'

// const router = express.Router();

// // Route to get all tickets
// router.get('/getTickets', getAllTickets);

// // Route to create a new ticket
// router.post('/createTicket', createTicket);

// export default router;

import express from 'express';
import {
  createTicket,
  getAllTickets,
  deleteTicket,
  updateTicket ,
  completeTicket,
} from '../controllers/ticketgeneration.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

// Route to get all tickets
router.get('/getTickets' , authenticateUser, getAllTickets);

// Route to create a new ticket
router.post('/createTicket', authenticateUser, createTicket);

// Route to delete a ticket by ID
router.delete('/deleteTicket/:id', authenticateUser, deleteTicket);

// Route to update ticket description by ID
router.put('/updateTicket/:id', authenticateUser, updateTicket);

router.patch('/taskComplete/:id' , authenticateUser, completeTicket);

export default router;

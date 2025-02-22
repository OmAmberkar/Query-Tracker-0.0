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
  updateTicket 
} from '../controllers/ticketgeneration.controller.js';

const router = express.Router();

// Route to get all tickets
router.get('/getTickets', getAllTickets);

// Route to create a new ticket
router.post('/createTicket', createTicket);

// Route to delete a ticket by ID
router.delete('/deleteTicket/:id', deleteTicket);

// Route to update ticket description by ID
router.put('/updateTicket/:id', updateTicket);

export default router;

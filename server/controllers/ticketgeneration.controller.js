import Ticket from '../models/ticket.model.js';

// Get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tickets", error });
    }
};

// Create a new ticket
export const createTicket = async (req, res) => {
    try {
        const { name, grpno, email, subject, description } = req.body;

        if (!name || !grpno || !email || !subject || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTicket = new Ticket({
            name,
            email,
            grpno,
            subject,
            description,
        });

        await newTicket.save();
        res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });

    } catch (error) {
        res.status(500).json({ message: "Error creating ticket", error });
    }
};

export default { getAllTickets, createTicket };
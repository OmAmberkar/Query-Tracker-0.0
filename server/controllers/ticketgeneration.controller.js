// import Ticket from '../models/ticket.model.js';

// // Get all tickets
// export const getAllTickets = async (req, res) => {
//     try {
//         const tickets = await Ticket.find();
//         res.status(200).json(tickets);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tickets", error });
//     }
// };

// // Create a new ticket
// export const createTicket = async (req, res) => {
//     try {
//         const { name, grpno, email, subject, description } = req.body;

//         if (!name || !grpno || !email || !subject || !description) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const newTicket = new Ticket({
//             name,
//             email,
//             grpno,
//             subject,
//             description,
//         });

//         await newTicket.save();
//         res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });

//     } catch (error) {
//         res.status(500).json({ message: "Error creating ticket", error });
//     }
// };

// export default { getAllTickets, createTicket };






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

// Delete a ticket by ID
export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        await Ticket.findByIdAndDelete(id);
        res.status(200).json({ message: "Ticket deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ticket", error });
    }
};

// Update ticket description by ID
export const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            { description },
            { new: true } // Returns updated ticket
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json({ message: "Ticket updated successfully!", updatedTicket });
    } catch (error) {
        res.status(500).json({ message: "Error updating ticket", error });
    }
};

export default { getAllTickets, createTicket, deleteTicket, updateTicket };

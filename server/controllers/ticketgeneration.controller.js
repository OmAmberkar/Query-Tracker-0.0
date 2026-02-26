import Ticket from '../models/ticket.model.js';
// Get all tickets

export const getAllTickets = async (req, res) => {
  try {
    const { status, sort } = req.query; // Extract query parameters
    const user = req.user;

    // ensure authentication middleware already ran
    if (!user) {
        // shouldn't happen when authenticateUser is applied, but guard anyway
        return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    let filter = {}; // Default: no filter
    if (status) filter.status = status; // Filter by status (open or resolved)

    if(user.role != "admin"){
        filter.email = user.email.toLowerCase();
    }

    let sortOption = { createdAt: -1 }; // Default: Newest first
    if (sort === "oldest") sortOption = { createdAt: 1 }; // Sort by oldest first

    const tickets = await Ticket.find(filter).sort(sortOption); // Apply filter & sorting

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Create a new ticket
export const createTicket = async (req, res) => {
    try {
        const { name, grpno, subject, description } = req.body;
        const email = req.user?.email;

        // validate all required fields, email comes from auth cookie
        if (!name || !grpno || !email || !subject || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTicket = new Ticket({
            name,
            email: email.toLowerCase(),
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



export const completeTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check if the status is 'resolved' or 'open' and update accordingly
        let newStatus = status === 'open' ? 'open' : 'resolved';

        const updatedTicket = await Ticket.findByIdAndUpdate(id, { status: newStatus }, { new: true });

        if (updatedTicket) {
            res.status(200).json({ message: `Ticket status updated to ${newStatus}`, updatedTicket });
        } else {
            res.status(404).json({ message: "Ticket not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error updating ticket", error });
    }
}

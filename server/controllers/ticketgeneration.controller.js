import Ticket from '../models/ticket.model.js';
import User from '../models/user.model.js';

// Get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const { status, sort } = req.query;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        let filter = {};
        if (status) filter.status = status;

        // BUSINESS LOGIC: 
        // Admin sees all tickets.
        // Regular users see all tickets (as requested), but we'll mark ownership in frontend
        // or keep the filter if "seeing all" was specifically for the admin panel.
        // The user said: "as a admin i must see the all of the tickets and well other user can also see my tickets but just cant edit those but they can give solution to that query"
        // This implies users should be able to see tickets created by others (or at least admins).
        // Let's remove the email filter to allow everyone to see all tickets.

        let sortOption = { createdAt: -1 };
        if (sort === "oldest") sortOption = { createdAt: 1 };

        const tickets = await Ticket.find(filter).sort(sortOption);

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
        
        if (!name || !grpno || !email || !subject || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Fetch user from DB to get their teamName and check approval
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.isApproved) {
            return res.status(403).json({ message: "Your account is pending admin approval." });
        }

        const newTicket = new Ticket({
            name,
            email: email.toLowerCase(),
            teamName: user.teamName, // Autofilled from user's profile
            grpno,
            subject,
            description,
        });

        await newTicket.save();
        res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: "Error creating ticket", error: error.message });
    }
};

// Delete a ticket by ID
export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        // Only owner or admin can delete
        if (req.user.role !== 'admin' && ticket.email !== req.user.email) {
            return res.status(403).json({ message: "Unauthorized to delete this record" });
        }

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
        const { description, solution, status } = req.body;

        const ticket = await Ticket.findById(id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        // If giving a solution, anyone can do it (as per requirement)
        if (solution !== undefined && solution !== ticket.solution) {
            ticket.solution = solution;
        }

        // If updating description or status, only owner or admin can do it
        if (description !== undefined || status !== undefined) {
            if (req.user.role !== 'admin' && ticket.email !== req.user.email) {
                // If they are only trying to add a solution, we already handled it
                // If they try to change description, we block
                if (description !== undefined && description !== ticket.description) {
                    return res.status(403).json({ message: "Unauthorized to modify core record" });
                }
            } else {
                if (description !== undefined) ticket.description = description;
                if (status !== undefined) ticket.status = status;
            }
        }

        const updatedTicket = await ticket.save();
        res.status(200).json({ message: "Ticket updated successfully!", updatedTicket });
    } catch (error) {
        res.status(500).json({ message: "Error updating ticket", error: error.message });
    }
};

export const completeTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const ticket = await Ticket.findById(id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        // Only owner or admin can mark complete
        if (req.user.role !== 'admin' && ticket.email !== req.user.email) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        let newStatus = status === 'open' ? 'open' : 'resolved';
        ticket.status = newStatus;
        await ticket.save();

        res.status(200).json({ message: `Ticket status updated to ${newStatus}`, updatedTicket: ticket });
    } catch (error) {
        res.status(500).json({ message: "Error updating ticket", error });
    }
}

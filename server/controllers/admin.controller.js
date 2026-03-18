import User from "../models/user.model.js";

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access only" });
        }
        const users = await User.find({}, "-password");
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
    }
};

// Update user role (Admin only)
export const updateUserRole = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access only" });
        }
        const { id } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        const updateData = { role };
        if (role === 'admin') {
            updateData.teamName = 'ADMIN';
            updateData.isApproved = true;
            updateData.isAdminRequested = false; // Request fulfilled
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: `Node elevated to ${role.toUpperCase()} status`, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user role", error: error.message });
    }
};

// Approve User (Admin only)
export const approveUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access only" });
        }
        const { id } = req.params;
        const { isApproved } = req.body;

        const user = await User.findByIdAndUpdate(id, { isApproved }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: `User ${isApproved ? 'approved' : 'disapproved'} successfully`, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error approving user", error: error.message });
    }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access only" });
        }
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
    }
};

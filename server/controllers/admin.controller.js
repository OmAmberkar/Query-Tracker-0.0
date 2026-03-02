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

        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User role updated", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user role", error: error.message });
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

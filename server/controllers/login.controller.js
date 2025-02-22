import User from "../models/user.model.js";
import { hashPassword, verifyPassword } from "../utils/encryption.utils.js";

const userLogin = async (req, res) => {
    const { email, password , role } = req.body;
    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

    
        res.cookie("email", email, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            maxAge: 28 * 60 * 60 * 1000, // 28 hours in milliseconds
            sameSite: "Strict", 
        });

        res.status(200).json(
            { success: true,
             message: "User logged in successfully",
             role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};

export { userLogin };

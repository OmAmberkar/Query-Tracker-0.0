import User from "../models/user.model.js";
import { verifyPassword } from "../utils/encryption.utils.js";

const userLogin = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check if user is approved (Admins are always approved)
    if (user.role === "user" && !user.isApproved) {
      return res.status(403).json({ success: false, message: "Your account is pending admin approval." });
    }

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("email", email, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 28 * 60 * 60 * 1000, // 28 hours in milliseconds
      sameSite: isProduction ? "None" : "Lax",
    });
    res.cookie("role", user.role, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 28 * 60 * 60 * 1000, // 28 hours in milliseconds
      sameSite: isProduction ? "None" : "Lax",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export { userLogin };

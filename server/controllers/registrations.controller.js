import User from "../models/user.model.js";
import { hashPassword } from "../utils/encryption.utils.js";

const createUser = async (req, res) => {
  const { name, username, email, teamName, contact, password, isAdminRequested } = req.body;

  try {
    // 1. Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Network error: Email already registered in sector" });
    }

    // 2. Check if username already exists in the same team
    const existingUser = await User.findOne({ 
      username: username.toLowerCase(), 
      teamName 
    });
    if (existingUser) {
      return res.status(409).json({ message: "Network error: Codename already exists in this sector" });
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Generate profile picture (Techy Robot Style)
    const profilePic = `https://api.dicebear.com/9.x/bottts/svg?seed=${username.toLowerCase()}`;

    // 5. Create new user
    const newUser = new User({
      name,
      username: username.toLowerCase(),
      email,
      teamName,
      contact,
      password: hashedPassword,
      profilePic,
      role: "user", 
      isApproved: false,
      isAdminRequested: !!isAdminRequested, 
    });

    await newUser.save();

    res.status(201).json({ 
      status: 'success', 
      message: "Registration successful! Node awaiting admin verification.", 
      user: newUser, 
      success: true 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "CRITICAL: Protocol initialization failed", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching profile", error: error.message });
    }
};

const getTeamMembers = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const members = await User.find({ teamName: user.teamName }).select("-password");
        res.status(200).json({ success: true, message: "Team members in sector", members });
    } catch (error) {
        res.status(500).json({ success: false, message: "Team sync failure", error: error.message });
    }
};

const requestAdminRole = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ success: false, message: "Node not found" });
        
        if (user.role === 'admin') {
            return res.status(400).json({ success: false, message: "Node already has administrative status" });
        }

        user.isAdminRequested = true;
        await user.save();

        res.status(200).json({ success: true, message: "Elevation request logged in system records.", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Request protocol failed", error: error.message });
    }
};

export { createUser, getUserProfile, getTeamMembers, requestAdminRole };

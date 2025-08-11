import User from "../models/user.model.js";
import { hashPassword } from "../utils/encryption.utils.js";

const createUser = async (req, res) => {
  const { name, username, email, contact, password } = req.body;

  try {
    // 1. Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Check if username already exists (case-insensitive)
    const existingUsername = await User.findOne({ username: username.toLowerCase() });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Create new user
    const newUser = new User({
      name,
      username: username.toLowerCase(),
      email,
      contact,
      password: hashedPassword,
      role:"user"
    });

    await newUser.save();

    // 5. Respond
    res.status(201).json({ status:'success', message: "User created successfully", user: newUser, success:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { createUser };

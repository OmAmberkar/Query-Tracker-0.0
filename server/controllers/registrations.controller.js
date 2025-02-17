import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/encryption.utils.js";

const createUser = async (req, res) => {
  const { name, username, email, contact, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      username,
      email,
      contact,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


export { createUser };
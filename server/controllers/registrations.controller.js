import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/encryption.utils.js";

const createUser = async (req, res) => {
  const { name, email, contact, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
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

const userLogin = async (req,res) =>{
    const { email, password } = req.body ;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isMatch = await verifyPassword(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        res.status(200).json({ success:true , message:"User logged in successfully"});
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error});
    }
}

export { createUser, userLogin };
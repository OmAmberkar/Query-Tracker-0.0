import User from "../models/user.model";
import { hashPassword, verifyPassword } from "../utils/encryption.utils";

const userLogin = async (req,res) => {
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isMatch = await verifyPassword(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        res.status(200).json({success:true, message:"User logged in successfully"});

    }
    catch(error){
        res.status(500).json({message:"Something went wrong", error});
    }
}

export { userLogin };
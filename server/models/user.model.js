import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  
    },

    username: {
        type: String,
        required: true,  
        unique: true,    
        minlength: 3,    
    },

    email: {
        type: String,
        required: true,
        unique: true,    
        lowercase: true, 
    },

    contact: {
        type: Number,
        required: true,
        minlength: 10,
    },

    password: {
        type: String,
        required: true,
    },

    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
      },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

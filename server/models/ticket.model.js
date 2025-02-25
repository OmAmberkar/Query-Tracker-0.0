import mongoose from "mongoose";
import User from "./user.model.js";

const TicketSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      // required: true,
    },
    
    grpno:{
      type:String,
      required: true,
    },

    email:{
      type: String,
      required: true,
    },

    subject: {
      type: String,
      // required: true,
    },

    description: { 
      type: String, 
      // required: true 
    },
    
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: User, 
      // required: true,
    }, 

    // assignedTo: { 
    //   type: mongoose.Schema.Types.ObjectId, 
    //   ref: "User" 
    // },
    
    status: {
      type: String,
      enum: ["open", "resolved"],
      default: "open",
    },


  },{ timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;

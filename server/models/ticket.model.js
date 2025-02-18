import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    name:{
      type:String,
      required: true,
    },
    
    grpno:{
      type:String,
      required: true,
    },

    description: { 
      type: String, 
      required: true 
    },
    
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true
    }, 

    // assignedTo: { 
    //   type: mongoose.Schema.Types.ObjectId, 
    //   ref: "User" 
    // },
    
    status: {
      type: String,
      enum: ["open", "in progress", "resolved", "closed"],
      default: "open",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);

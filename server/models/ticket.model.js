import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
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

    assignedTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    
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

    // ✅ Embedded Comments (Fixed Placement)
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Who added the comment
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", TicketSchema);

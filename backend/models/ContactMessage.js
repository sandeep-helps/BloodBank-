import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true
  },
  status: {
    type: String,
    enum: ["pending", "read", "replied"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
export default ContactMessage;
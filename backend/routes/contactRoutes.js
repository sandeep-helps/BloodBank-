import express from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Create new contact message
    const contactMessage = new ContactMessage({
      fullName,
      email,
      phone,
      message
    });

    await contactMessage.save();

    res.status(201).json({
      success: true,
      message: "Thank you for contacting us. We'll get back to you soon!",
      data: contactMessage
    });

  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message. Please try again later." 
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages (for admin)
// @access  Private/Admin
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch messages" 
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact message (for admin)
// @access  Private/Admin
router.get("/:id", async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch message" 
    });
  }
});

// @route   PATCH /api/contact/:id/status
// @desc    Update message status (for admin)
// @access  Private/Admin
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!["pending", "read", "replied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: message
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update status" 
    });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete a message (for admin)
// @access  Private/Admin
router.delete("/:id", async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete message" 
    });
  }
});

export default router;
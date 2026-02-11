const Contact = require('../models/Contact');
const { sendContactEmail, sendAutoReply } = require('../config/email');

// Submit contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: 'Please provide all required fields: name, email, subject, and message'
      });
    }

    // Create contact record
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      phone,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });

    await contact.save();

    // Send email notification
    try {
      await sendContactEmail({ name, email, subject, message, phone });

      // Auto-reply is optional and disabled by default to avoid confusion.
      if (process.env.SEND_AUTO_REPLY === 'true') {
        await sendAutoReply(email, name);
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still return success since contact was saved
    }

    res.status(201).json({
      message: 'Thank you for your message! I will get back to you soon.',
      success: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      message: 'Failed to send message. Please try again later.',
      error: error.message
    });
  }
};

// Get all contacts (admin route - add authentication later)
exports.getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, isRead } = req.query;

    const query = {};
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Contact.countDocuments(query);

    res.json({
      contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// Mark contact as read
exports.markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact marked as read', contact });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      message: 'Error updating contact',
      error: error.message
    });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      message: 'Error deleting contact',
      error: error.message
    });
  }
};

module.exports = exports;

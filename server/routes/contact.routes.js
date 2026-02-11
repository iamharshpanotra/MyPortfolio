const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contact.controller');

// Validation middleware
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

// Public route
router.post('/', validateContact, contactController.submitContact);

// Test email configuration (for debugging)
router.get('/test-email', async (req, res) => {
  try {
    const { sendContactEmail } = require('../config/email');

    console.log('🧪 Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'NOT SET');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (length: ' + process.env.EMAIL_PASS?.length + ')' : 'NOT SET');

    // Send test email
    await sendContactEmail({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Email Configuration Test',
      message: 'This is a test email to verify the email configuration is working correctly.',
      phone: ''
    });

    res.json({
      success: true,
      message: 'Test email sent successfully! Check your inbox.',
      config: {
        emailUser: process.env.EMAIL_USER,
        emailPassLength: process.env.EMAIL_PASS?.length || 0
      }
    });
  } catch (error) {
    console.error('❌ Test email failed:', error);
    res.status(500).json({
      success: false,
      message: 'Test email failed',
      error: error.message,
      config: {
        emailUser: process.env.EMAIL_USER || 'NOT SET',
        emailPassLength: process.env.EMAIL_PASS?.length || 0
      }
    });
  }
});

// Admin routes (add authentication middleware later)
router.get('/', contactController.getAllContacts);
router.patch('/:id/read', contactController.markAsRead);
router.delete('/:id', contactController.deleteContact);

module.exports = router;

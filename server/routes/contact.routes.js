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

// Admin routes (add authentication middleware later)
router.get('/', contactController.getAllContacts);
router.patch('/:id/read', contactController.markAsRead);
router.delete('/:id', contactController.deleteContact);

module.exports = router;

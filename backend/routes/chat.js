const express = require('express');
const { moodChat, getMoodFAQs } = require('../controllers/chatController');
const router = express.Router();

/**
 * @route   POST /api/chat/:mood
 * @desc    Get chatbot response based on mood
 * @access  Public
 */
router.post('/:mood', moodChat);

/**
 * @route   GET /api/chat/faqs
 * @desc    Get all mood FAQs
 * @access  Public
 */
router.get('/faqs', getMoodFAQs);

module.exports = router;
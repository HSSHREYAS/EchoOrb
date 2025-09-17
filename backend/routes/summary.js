const express = require('express');
const { getWeeklySummary } = require('../controllers/summaryController');
const router = express.Router();

/**
 * @route   GET /api/summary/:userId
 * @desc    Get weekly summary for a user
 * @access  Private
 */
router.get('/:userId', getWeeklySummary);

module.exports = router;
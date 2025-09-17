const express = require('express');
const { 
  getDailyChallenge, 
  completeChallenge, 
  getAllChallenges 
} = require('../controllers/challengeController');
const router = express.Router();

/**
 * @route   GET /api/daily-challenge/:userId
 * @desc    Get daily challenge for a user
 * @access  Private
 */
router.get('/:userId', getDailyChallenge);

/**
 * @route   POST /api/daily-challenge/complete
 * @desc    Complete a challenge
 * @access  Private
 */
router.post('/complete', completeChallenge);

/**
 * @route   GET /api/daily-challenge
 * @desc    Get all challenges
 * @access  Private
 */
router.get('/', getAllChallenges);

module.exports = router;
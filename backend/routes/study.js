const express = require('express');
const { 
  uploadFile, 
  summarizeText, 
  generateQuiz, 
  recordTimerSession, 
  getStudySessions 
} = require('../controllers/studyController');
const router = express.Router();

/**
 * @route   POST /api/study/upload
 * @desc    Upload a study file
 * @access  Private
 */
router.post('/upload', uploadFile);

/**
 * @route   POST /api/study/summarize
 * @desc    Generate summary of study material
 * @access  Private
 */
router.post('/summarize', summarizeText);

/**
 * @route   POST /api/study/quiz
 * @desc    Generate quiz from study material
 * @access  Private
 */
router.post('/quiz', generateQuiz);

/**
 * @route   POST /api/study/timer
 * @desc    Record a study timer session
 * @access  Private
 */
router.post('/timer', recordTimerSession);

/**
 * @route   GET /api/study/:userId
 * @desc    Get all study sessions for a user
 * @access  Private
 */
router.get('/:userId', getStudySessions);

module.exports = router;
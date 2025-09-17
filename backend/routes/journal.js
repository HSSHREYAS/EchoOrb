const express = require('express');
const { 
  createJournal, 
  getJournals, 
  getJournal, 
  analyzeJournal 
} = require('../controllers/journalController');
const router = express.Router();

/**
 * @route   POST /api/journal
 * @desc    Create a new journal entry
 * @access  Private
 */
router.post('/', createJournal);

/**
 * @route   GET /api/journal/:userId
 * @desc    Get all journal entries for a user
 * @access  Private
 */
router.get('/:userId', getJournals);

/**
 * @route   GET /api/journal/entry/:journalId
 * @desc    Get a single journal entry
 * @access  Private
 */
router.get('/entry/:journalId', getJournal);

/**
 * @route   POST /api/journal/analyze
 * @desc    Analyze a journal entry
 * @access  Private
 */
router.post('/analyze', analyzeJournal);

module.exports = router;
const Challenge = require('../models/Challenge');
const mongoose = require('mongoose');

/**
 * Initialize the challenge database with default challenges
 */
const initializeChallengeDb = async () => {
  try {
    const count = await Challenge.countDocuments();
    
    // Only add default challenges if the collection is empty
    if (count === 0) {
      const defaultChallenges = [
        {
          title: 'Gratitude Journal',
          description: 'Write down 3 things you are grateful for today.',
          type: 'gratitude'
        },
        {
          title: '5-Minute Meditation',
          description: 'Take 5 minutes to practice mindful breathing.',
          type: 'mindfulness'
        },
        {
          title: 'Digital Detox',
          description: 'Spend 30 minutes away from all screens.',
          type: 'wellness'
        },
        {
          title: 'Random Act of Kindness',
          description: 'Do something nice for someone without expectation of return.',
          type: 'social'
        },
        {
          title: 'Nature Time',
          description: 'Spend 15 minutes outside in nature.',
          type: 'wellness'
        },
        {
          title: 'Learn Something New',
          description: 'Spend 10 minutes learning about a new topic.',
          type: 'productivity'
        },
        {
          title: 'Creative Expression',
          description: 'Spend 15 minutes drawing, writing, or creating something.',
          type: 'creativity'
        },
        {
          title: 'Positive Affirmations',
          description: 'Write down 3 positive affirmations and repeat them to yourself.',
          type: 'mindfulness'
        },
        {
          title: 'Reach Out',
          description: 'Send a message to a friend or family member you haven\'t spoken to in a while.',
          type: 'social'
        },
        {
          title: 'Declutter',
          description: 'Spend 10 minutes decluttering a small area of your living space.',
          type: 'productivity'
        }
      ];
      
      await Challenge.insertMany(defaultChallenges);
      console.log('Default challenges added to the database');
    }
  } catch (error) {
    console.error('Error initializing challenge database:', error);
  }
};

// Call the initialization function when the module is loaded
initializeChallengeDb();

/**
 * Get a daily challenge for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getDailyChallenge = async (req, res) => {
  const { userId } = req.params;

  try {
    // Get today's date at 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the user has already completed a challenge today
    const completedToday = await Challenge.findOne({
      'completions.userId': new mongoose.Types.ObjectId(userId),
      'completions.completedAt': { $gte: today }
    });

    if (completedToday) {
      return res.json({
        challenge: {
          _id: completedToday._id,
          title: completedToday.title,
          description: completedToday.description,
          type: completedToday.type
        },
        completed: true
      });
    }

    // Get all challenges the user hasn't completed recently
    const recentlyCompletedIds = await Challenge.find({
      'completions.userId': new mongoose.Types.ObjectId(userId),
      'completions.completedAt': { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    }).distinct('_id');

    // Find an active challenge the user hasn't completed recently
    const query = {
      active: true
    };

    if (recentlyCompletedIds.length > 0) {
      query._id = { $nin: recentlyCompletedIds };
    }

    // Get a random challenge
    const count = await Challenge.countDocuments(query);
    
    if (count === 0) {
      // If all challenges have been completed recently, just get a random active one
      delete query._id;
      const randomChallenge = await Challenge.findOne({ active: true })
        .skip(Math.floor(Math.random() * await Challenge.countDocuments({ active: true })));
      
      return res.json({
        challenge: {
          _id: randomChallenge._id,
          title: randomChallenge.title,
          description: randomChallenge.description,
          type: randomChallenge.type
        },
        completed: false
      });
    }
    
    const random = Math.floor(Math.random() * count);
    const challenge = await Challenge.findOne(query).skip(random);

    res.json({
      challenge: {
        _id: challenge._id,
        title: challenge.title,
        description: challenge.description,
        type: challenge.type
      },
      completed: false
    });
  } catch (error) {
    console.error('Error getting daily challenge:', error);
    res.status(500).json({ error: 'Failed to get daily challenge' });
  }
};

/**
 * Complete a challenge
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.completeChallenge = async (req, res) => {
  const { challengeId, userId } = req.body;

  if (!challengeId || !userId) {
    return res.status(400).json({ error: 'challengeId and userId are required' });
  }

  try {
    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    // Check if the user has already completed this challenge today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyCompletedToday = challenge.completions.some(
      completion => 
        completion.userId.toString() === userId && 
        new Date(completion.completedAt) >= today
    );

    if (alreadyCompletedToday) {
      return res.json({ message: 'Challenge already completed today' });
    }

    // Add the user to completions
    challenge.completions.push({
      userId,
      completedAt: new Date()
    });

    await challenge.save();

    res.json({ message: 'Challenge completed successfully' });
  } catch (error) {
    console.error('Error completing challenge:', error);
    res.status(500).json({ error: 'Failed to complete challenge' });
  }
};

/**
 * Get all challenges
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({ active: true })
      .select('-completions');

    res.json(challenges);
  } catch (error) {
    console.error('Error getting challenges:', error);
    res.status(500).json({ error: 'Failed to get challenges' });
  }
};
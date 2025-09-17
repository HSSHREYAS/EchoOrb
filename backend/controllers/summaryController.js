const Journal = require('../models/Journal');
const StudySession = require('../models/StudySession');
const apiClient = require('../utils/apiClient');

/**
 * Generate weekly summary for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getWeeklySummary = async (req, res) => {
  const { userId } = req.params;

  try {
    // Get date from 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get journal entries from the past week
    const journals = await Journal.find({
      userId,
      createdAt: { $gte: sevenDaysAgo }
    }).select('mood keywords createdAt');

    // Get study sessions from the past week
    const studySessions = await StudySession.find({
      userId,
      createdAt: { $gte: sevenDaysAgo }
    }).select('title subject focusSessions createdAt');

    // Calculate mood statistics
    const moodStats = {
      happy: 0,
      sad: 0,
      frustrated: 0,
      neutral: 0,
      focused: 0
    };

    // Array of moods over time for trend analysis
    const moodTrend = [];

    journals.forEach(journal => {
      if (journal.mood && moodStats.hasOwnProperty(journal.mood)) {
        moodStats[journal.mood]++;
      }

      // Add to mood trend in chronological order
      moodTrend.push({
        date: journal.createdAt,
        mood: journal.mood || 'neutral'
      });
    });

    // Sort mood trend by date
    moodTrend.sort((a, b) => a.date - b.date);

    // Extract only the mood names for the response
    const moodTrendNames = moodTrend.map(item => item.mood);

    // Generate word cloud data
    const allKeywords = journals.reduce((acc, journal) => {
      return acc.concat(journal.keywords || []);
    }, []);

    const wordCloudData = {};
    allKeywords.forEach(keyword => {
      wordCloudData[keyword] = (wordCloudData[keyword] || 0) + 1;
    });

    // Calculate study statistics
    const studyStats = {
      totalSessions: 0,
      totalStudyMinutes: 0,
      totalBreakMinutes: 0,
      subjectBreakdown: {}
    };

    studySessions.forEach(session => {
      // Count sessions and minutes by type
      session.focusSessions.forEach(focusSession => {
        studyStats.totalSessions++;
        
        if (focusSession.type === 'study') {
          studyStats.totalStudyMinutes += focusSession.duration;
        } else {
          studyStats.totalBreakMinutes += focusSession.duration;
        }
      });

      // Track study time by subject
      if (session.subject) {
        if (!studyStats.subjectBreakdown[session.subject]) {
          studyStats.subjectBreakdown[session.subject] = 0;
        }
        
        // Add up study time (not breaks) for this subject
        const studyTimeForSubject = session.focusSessions
          .filter(fs => fs.type === 'study')
          .reduce((total, fs) => total + fs.duration, 0);
          
        studyStats.subjectBreakdown[session.subject] += studyTimeForSubject;
      }
    });

    // Get motivational message
    let motivationalMessage;
    try {
      const quoteData = await apiClient.getRandomQuote();
      motivationalMessage = quoteData.q + ' - ' + quoteData.a;
    } catch (error) {
      console.error('Error fetching motivational quote:', error);
      motivationalMessage = "Keep up the good work! Consistency is key to success.";
    }

    // Create dynamic achievement message based on stats
    let achievementMessage = "";
    
    if (studyStats.totalStudyMinutes > 300) { // More than 5 hours studied
      achievementMessage = "Great study dedication this week!";
    } else if (journals.length >= 5) { // Journaled at least 5 times
      achievementMessage = "You're building a great journaling habit!";
    } else if (moodStats.happy > moodStats.sad && moodStats.happy > moodStats.frustrated) {
      achievementMessage = "You've maintained a positive outlook this week!";
    } else {
      achievementMessage = "Keep going, every step counts!";
    }

    res.json({
      moodStats,
      moodTrend: moodTrendNames,
      wordCloud: wordCloudData,
      studyStats,
      journalCount: journals.length,
      message: motivationalMessage,
      achievement: achievementMessage
    });
  } catch (error) {
    console.error('Error generating weekly summary:', error);
    res.status(500).json({ error: 'Failed to generate weekly summary' });
  }
};
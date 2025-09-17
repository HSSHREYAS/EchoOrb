const apiClient = require('../utils/apiClient');

/**
 * Object containing mood-specific FAQs
 */
const moodFAQs = {
  happy: [
    "How can I sustain this positive feeling?",
    "What activities can boost my happiness further?",
    "How can I share my positive energy with others?",
    "Can journaling help maintain my positive mood?",
    "What are some gratitude practices I can try?"
  ],
  sad: [
    "What are some healthy ways to process sadness?",
    "How can I practice self-care when feeling down?",
    "When should I consider seeking professional help?",
    "What small steps can I take to feel better?",
    "How can I express my feelings constructively?"
  ],
  frustrated: [
    "How can I reduce stress quickly?",
    "What techniques help manage overwhelming feelings?",
    "How can I improve my focus when frustrated?",
    "What's a good way to reset my mindset?",
    "How can I communicate when I'm feeling frustrated?"
  ],
  study: [
    "What's the most effective study technique?",
    "How can I retain information better?",
    "What's the ideal study session length?",
    "How do I create an effective study schedule?",
    "What foods help with concentration and focus?"
  ]
};

/**
 * Handle chat requests based on mood
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.moodChat = async (req, res) => {
  const { mood } = req.params;
  const { message, userId } = req.body;

  // Validate inputs
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!['happy', 'sad', 'frustrated', 'study'].includes(mood)) {
    return res.status(400).json({ error: 'Invalid mood type' });
  }

  try {
    // Get chatbot response from Hugging Face
    const botMessage = await apiClient.getChatResponse(mood, message);

    // Get a random quote
    const quoteData = await apiClient.getRandomQuote();
    const quote = quoteData.q + ' - ' + quoteData.a;

    // Return response with FAQs for the specific mood
    res.json({
      botMessage,
      quote,
      faq: moodFAQs[mood] || []
    });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Failed to get chatbot response' });
  }
};

/**
 * Get all mood FAQs
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getMoodFAQs = async (req, res) => {
  try {
    res.json({ moodFAQs });
  } catch (error) {
    console.error('Failed to get mood FAQs:', error);
    res.status(500).json({ error: 'Failed to get mood FAQs' });
  }
};
const axios = require('axios');

/**
 * Client for Hugging Face Inference API
 */
class ApiClient {
  constructor() {
    this.huggingFaceUrl = 'https://api-inference.huggingface.co/models/';
    this.zenQuotesUrl = 'https://zenquotes.io/api/';
  }

  /**
   * Call the Hugging Face Inference API
   * @param {string} model - Model ID
   * @param {Object} payload - Request payload
   * @returns {Promise<Object>} - API response
   */
  async callHuggingFaceAPI(model, payload) {
    try {
      const response = await axios.post(
        `${this.huggingFaceUrl}${model}`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${process.env.HF_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Hugging Face API error:', error.response?.data || error.message);
      throw new Error(`Hugging Face API error: ${error.message}`);
    }
  }

  /**
   * Get a random quote from ZenQuotes API
   * @returns {Promise<Object>} - Quote object
   */
  async getRandomQuote() {
    try {
      const response = await axios.get(`${this.zenQuotesUrl}random`);
      return response.data[0];
    } catch (error) {
      console.error('ZenQuotes API error:', error.response?.data || error.message);
      throw new Error(`ZenQuotes API error: ${error.message}`);
    }
  }

  /**
   * Get chat completion based on mood
   * @param {string} mood - User's mood
   * @param {string} message - User's message
   * @returns {Promise<string>} - Bot response
   */
  async getChatResponse(mood, message) {
    // Define system prompts for different moods
    const systemPrompts = {
      happy: "You are an enthusiastic chatbot that celebrates achievements and amplifies positive emotions. Be cheerful, congratulatory, and help users maintain their positive state.",
      sad: "You are an empathetic chatbot specializing in supporting people through sadness or depression. Respond with warmth, validation, and gentle encouragement. Never be dismissive of feelings.",
      frustrated: "You are a calm, patient chatbot that helps users manage frustration and stress. Provide practical strategies for regaining focus and perspective.",
      study: "You are a focused study assistant chatbot. Help users understand complex topics, plan study sessions, and provide clear explanations. Be concise and educational."
    };

    const systemPrompt = systemPrompts[mood] || systemPrompts.neutral;
    const prompt = `<|system|>${systemPrompt}<|user|>${message}<|assistant|>`;

    // Using Mistral model as an example
    const response = await this.callHuggingFaceAPI('mistralai/Mistral-7B-Instruct-v0.1', {
      inputs: prompt,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
        top_p: 0.95
      }
    });

    return response.generated_text || "I'm not sure how to respond to that.";
  }

  /**
   * Analyze sentiment of text
   * @param {string} text - Text to analyze
   * @returns {Promise<Object>} - Sentiment analysis result
   */
  async analyzeSentiment(text) {
    const response = await this.callHuggingFaceAPI(
      'distilbert-base-uncased-finetuned-sst-2-english',
      { inputs: text }
    );

    // Extract sentiment from response
    if (Array.isArray(response) && response.length > 0) {
      return response[0].sort((a, b) => b.score - a.score)[0];
    }
    
    throw new Error('Invalid sentiment analysis response');
  }

  /**
   * Generate text summary
   * @param {string} text - Text to summarize
   * @returns {Promise<string>} - Generated summary
   */
  async generateSummary(text) {
    // Truncate text if it's too long
    const truncatedText = text.length > 10000 ? text.substring(0, 10000) : text;
    
    const response = await this.callHuggingFaceAPI(
      'facebook/bart-large-cnn',
      { 
        inputs: truncatedText,
        parameters: {
          max_length: 400,
          min_length: 100
        }
      }
    );

    return response[0]?.summary_text || 'Summary could not be generated.';
  }

  /**
   * Generate quiz questions from text
   * @param {string} text - Source text
   * @param {number} numQuestions - Number of questions to generate
   * @returns {Promise<Array>} - Array of quiz questions
   */
  async generateQuizQuestions(text, numQuestions = 3) {
    const prompt = `Generate ${numQuestions} multiple-choice questions with 4 options each based on this text. Include the correct answer index (0-3).\n\nText: ${text.substring(0, 5000)}`;

    const response = await this.callHuggingFaceAPI(
      'mistralai/Mistral-7B-Instruct-v0.1',
      { 
        inputs: prompt,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.7,
          top_p: 0.9
        }
      }
    );

    // Parse the response and convert to structured quiz questions
    // This is a simple example; you'll need more robust parsing in production
    const rawQuestions = response.generated_text || '';
    const questions = [];

    try {
      // Simple parsing logic - in a real app you'd want more robust parsing
      const questionMatches = rawQuestions.match(/\d+\.\s.+?\?[\s\S]+?(?=\d+\.\s|\Z)/g) || [];
      
      for (const match of questionMatches) {
        const lines = match.split('\n').filter(line => line.trim());
        if (lines.length >= 5) {
          const question = lines[0].replace(/^\d+\.\s*/, '').trim();
          const options = [
            lines[1].replace(/^[a-d][\.)]\s*/, '').trim(),
            lines[2].replace(/^[a-d][\.)]\s*/, '').trim(),
            lines[3].replace(/^[a-d][\.)]\s*/, '').trim(),
            lines[4].replace(/^[a-d][\.)]\s*/, '').trim(),
          ];
          
          // Find correct answer (simple implementation)
          let correctAnswer = 0; // Default to first option
          const answerMatch = match.match(/(?:correct answer|answer)[:\s]+([a-d])/i);
          if (answerMatch) {
            correctAnswer = answerMatch[1].toLowerCase().charCodeAt(0) - 97; // 'a' -> 0, 'b' -> 1, etc.
          }
          
          questions.push({
            question,
            options,
            correctAnswer: Math.max(0, Math.min(3, correctAnswer)) // Ensure index is 0-3
          });
        }
      }
    } catch (error) {
      console.error('Error parsing quiz questions:', error);
    }

    return questions;
  }
}

module.exports = new ApiClient();
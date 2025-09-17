const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'docx', 'txt', 'none'],
    default: 'none'
  },
  originalText: {
    type: String
  },
  summary: {
    type: String
  },
  quizQuestions: [{
    question: String,
    options: [String],
    correctAnswer: Number
  }],
  focusSessions: [{
    startTime: Date,
    endTime: Date,
    duration: Number, // in minutes
    type: {
      type: String,
      enum: ['study', 'short-break', 'long-break'],
      default: 'study'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StudySession', studySessionSchema);
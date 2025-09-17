const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const StudySession = require('../models/StudySession');
const { extractTextFromFile } = require('../utils/fileParser');
const apiClient = require('../utils/apiClient');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Configure file upload middleware
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed.'));
    }
  }
});

/**
 * Upload study material
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.uploadFile = [
  // Use multer middleware for file upload
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { userId, title, subject } = req.body;

    if (!userId || !title || !subject) {
      return res.status(400).json({ error: 'userId, title, and subject are required' });
    }

    try {
      // Get file type
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      let fileType = 'txt';
      if (fileExtension === '.pdf') {
        fileType = 'pdf';
      } else if (fileExtension === '.docx') {
        fileType = 'docx';
      }

      // Read the uploaded file
      const fileBuffer = fs.readFileSync(req.file.path);
      
      // Extract text from the file
      const extractedText = await extractTextFromFile(fileBuffer, fileType);

      // Create a new study session
      const studySession = new StudySession({
        userId,
        title,
        subject,
        fileType,
        originalText: extractedText.substring(0, 10000) // Limit text length
      });

      // Save the study session
      await studySession.save();

      // Delete the uploaded file after extraction
      fs.unlinkSync(req.file.path);

      res.status(201).json({
        message: 'File uploaded and processed successfully',
        studySessionId: studySession._id,
        textPreview: extractedText.substring(0, 200) + '...' // Return preview
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      
      // Clean up the uploaded file if there was an error
      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      
      res.status(500).json({ error: `Failed to process uploaded file: ${error.message}` });
    }
  }
];

/**
 * Summarize study material
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.summarizeText = async (req, res) => {
  const { studySessionId, text } = req.body;

  if (!studySessionId && !text) {
    return res.status(400).json({ error: 'Either studySessionId or text is required' });
  }

  try {
    let textToSummarize;
    let studySession;

    if (studySessionId) {
      // Get the study session from the database
      studySession = await StudySession.findById(studySessionId);

      if (!studySession) {
        return res.status(404).json({ error: 'Study session not found' });
      }

      textToSummarize = studySession.originalText;
    } else {
      textToSummarize = text;
    }

    // Summarize the text
    const summary = await apiClient.generateSummary(textToSummarize);

    // Update the study session if studySessionId is provided
    if (studySessionId && studySession) {
      studySession.summary = summary;
      await studySession.save();
    }

    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
};

/**
 * Generate quiz from study material
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.generateQuiz = async (req, res) => {
  const { studySessionId, text, numQuestions = 5 } = req.body;

  if (!studySessionId && !text) {
    return res.status(400).json({ error: 'Either studySessionId or text is required' });
  }

  try {
    let textForQuiz;
    let studySession;

    if (studySessionId) {
      // Get the study session from the database
      studySession = await StudySession.findById(studySessionId);

      if (!studySession) {
        return res.status(404).json({ error: 'Study session not found' });
      }

      // Use summary if available, otherwise use original text
      textForQuiz = studySession.summary || studySession.originalText;
    } else {
      textForQuiz = text;
    }

    // Generate quiz questions
    const questions = await apiClient.generateQuizQuestions(textForQuiz, numQuestions);

    // Update the study session if studySessionId is provided
    if (studySessionId && studySession) {
      studySession.quizQuestions = questions;
      await studySession.save();
    }

    res.json({ questions });
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
};

/**
 * Record study timer session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.recordTimerSession = async (req, res) => {
  const { studySessionId, userId, startTime, endTime, duration, type } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  if (!startTime || !endTime || !duration || !type) {
    return res.status(400).json({ error: 'startTime, endTime, duration, and type are required' });
  }

  if (!['study', 'short-break', 'long-break'].includes(type)) {
    return res.status(400).json({ error: 'Invalid session type' });
  }

  try {
    // If studySessionId is provided, add timer session to existing study session
    if (studySessionId) {
      const studySession = await StudySession.findById(studySessionId);

      if (!studySession) {
        return res.status(404).json({ error: 'Study session not found' });
      }

      studySession.focusSessions.push({
        startTime,
        endTime,
        duration,
        type
      });

      await studySession.save();

      res.json({
        message: 'Timer session recorded successfully',
        sessionId: studySession.focusSessions[studySession.focusSessions.length - 1]._id
      });
    } else {
      // Create a new study session for the timer
      const newStudySession = new StudySession({
        userId,
        title: 'Focus Session',
        subject: 'General Study',
        fileType: 'none',
        focusSessions: [{
          startTime,
          endTime,
          duration,
          type
        }]
      });

      await newStudySession.save();

      res.status(201).json({
        message: 'Timer session recorded successfully',
        studySessionId: newStudySession._id,
        sessionId: newStudySession.focusSessions[0]._id
      });
    }
  } catch (error) {
    console.error('Error recording timer session:', error);
    res.status(500).json({ error: 'Failed to record timer session' });
  }
};

/**
 * Get study sessions for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getStudySessions = async (req, res) => {
  const { userId } = req.params;

  try {
    const studySessions = await StudySession.find({ userId })
      .sort({ createdAt: -1 })
      .select('-originalText'); // Don't send the full original text

    res.json(studySessions);
  } catch (error) {
    console.error('Error fetching study sessions:', error);
    res.status(500).json({ error: 'Failed to fetch study sessions' });
  }
};
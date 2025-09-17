import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Clock, Play, Pause, RotateCcw, Brain, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Study = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [keyTopics, setKeyTopics] = useState<string[]>([]);
  const [studyTime, setStudyTime] = useState(25); // minutes
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Array<{
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }>>([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate file processing and AI analysis
    setTimeout(() => {
      const mockSummary = `This document covers key concepts in ${file.name.includes('psychology') ? 'psychology' : 'your subject area'}. 

Key learning objectives:
• Understanding fundamental principles and theories
• Applying concepts to real-world scenarios  
• Developing critical thinking skills
• Preparing for assessments and exams

The material includes comprehensive examples, case studies, and practice exercises to reinforce learning. Focus areas include theoretical foundations, practical applications, and contemporary research findings.`;

      const mockTopics = [
        "Fundamental Principles",
        "Theoretical Framework", 
        "Practical Applications",
        "Case Studies",
        "Assessment Strategies"
      ];

      const mockQuestions = [
        {
          question: "What is the primary focus of this study material?",
          options: [
            "Historical overview only",
            "Fundamental principles and practical applications",
            "Statistical analysis",
            "Research methodology"
          ],
          correct: 1,
          explanation: "The material focuses on both fundamental principles and their practical applications in real-world scenarios."
        },
        {
          question: "Which learning approach is emphasized in this content?",
          options: [
            "Memorization only",
            "Critical thinking and analysis",
            "Mathematical calculations",
            "Historical chronology"
          ],
          correct: 1,
          explanation: "The content emphasizes developing critical thinking skills alongside theoretical understanding."
        }
      ];

      setSummary(mockSummary);
      setKeyTopics(mockTopics);
      setQuizQuestions(mockQuestions);
      setIsProcessing(false);
    }, 3000);
  };

  const startTimer = () => {
    setTimeLeft(studyTime * 60);
    setIsTimerRunning(true);
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      if (answerIndex === quizQuestions[currentQuiz].correct) {
        setQuizScore(prev => prev + 1);
      }
      
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setQuizScore(0);
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Study Mode</h1>
          <p className="text-lg text-foreground-muted">AI-powered study sessions with smart summaries and adaptive quizzes</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* File Upload and Processing */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-primary-bright" />
                    Upload Study Material
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="border-2 border-dashed border-glass-border/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary-bright/50 transition-colors"
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file) {
                        setUploadedFile(file);
                        processFile(file);
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="w-12 h-12 text-primary-bright mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Drop your files here or click to upload
                    </h3>
                    <p className="text-foreground-muted mb-4">
                      Supports PDF, DOCX, TXT files up to 20MB
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="outline" className="border-primary-bright/30">PDF</Badge>
                      <Badge variant="outline" className="border-primary-bright/30">DOCX</Badge>
                      <Badge variant="outline" className="border-primary-bright/30">TXT</Badge>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  {uploadedFile && (
                    <div className="mt-4 p-4 bg-background-secondary/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{uploadedFile.name}</p>
                          <p className="text-sm text-foreground-muted">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        {isProcessing && (
                          <div className="flex items-center text-primary-bright">
                            <Brain className="w-4 h-4 mr-2 animate-pulse" />
                            Processing...
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Summary */}
            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-secondary" />
                      AI Summary & Key Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-background-secondary/50 rounded-lg">
                        <p className="text-foreground-muted whitespace-pre-line">{summary}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Key Topics to Focus On:</h4>
                        <div className="flex flex-wrap gap-2">
                          {keyTopics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Quiz Section */}
            {quizQuestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-accent" />
                        Knowledge Check Quiz
                      </div>
                      {!showResults && (
                        <Badge variant="outline" className="border-accent text-accent">
                          {currentQuiz + 1} of {quizQuestions.length}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!showResults ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-foreground">
                          {quizQuestions[currentQuiz].question}
                        </h3>
                        
                        <div className="space-y-2">
                          {quizQuestions[currentQuiz].options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className={`w-full text-left p-4 h-auto justify-start ${
                                selectedAnswer === index
                                  ? index === quizQuestions[currentQuiz].correct
                                    ? "border-success bg-success/20 text-success"
                                    : "border-destructive bg-destructive/20 text-destructive"
                                  : selectedAnswer !== null && index === quizQuestions[currentQuiz].correct
                                  ? "border-success bg-success/20 text-success"
                                  : ""
                              }`}
                              onClick={() => selectedAnswer === null && handleQuizAnswer(index)}
                              disabled={selectedAnswer !== null}
                            >
                              <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                              {option}
                            </Button>
                          ))}
                        </div>
                        
                        {selectedAnswer !== null && (
                          <div className="p-4 bg-background-secondary/50 rounded-lg">
                            <p className="text-foreground-muted">
                              {quizQuestions[currentQuiz].explanation}
                            </p>
                          </div>
                        )}
                        
                        <Progress 
                          value={((currentQuiz + 1) / quizQuestions.length) * 100} 
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="text-6xl mb-4">
                          {quizScore / quizQuestions.length >= 0.8 ? "🎉" : quizScore / quizQuestions.length >= 0.6 ? "👍" : "📚"}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">
                          Quiz Complete!
                        </h3>
                        <p className="text-lg text-foreground-muted">
                          You scored {quizScore} out of {quizQuestions.length}
                        </p>
                        <div className="text-accent font-semibold text-xl">
                          {Math.round((quizScore / quizQuestions.length) * 100)}%
                        </div>
                        <Button 
                          onClick={resetQuiz}
                          className="bg-gradient-primary hover:shadow-glow-primary"
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Study Timer Sidebar */}
          <div className="space-y-6">
            {/* Study Timer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-accent" />
                    Study Timer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    {/* Timer Display */}
                    <div className="text-4xl font-mono font-bold text-primary-bright">
                      {formatTime(timeLeft)}
                    </div>
                    
                    {/* Progress Ring */}
                    {timeLeft > 0 && (
                      <Progress 
                        value={((studyTime * 60 - timeLeft) / (studyTime * 60)) * 100}
                        className="w-full"
                      />
                    )}
                    
                    {/* Duration Selection */}
                    {!isTimerRunning && timeLeft === 0 && (
                      <div className="space-y-3">
                        <p className="text-sm text-foreground-muted">Choose session length:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {[15, 25, 45].map((minutes) => (
                            <Button
                              key={minutes}
                              variant={studyTime === minutes ? "default" : "outline"}
                              size="sm"
                              onClick={() => setStudyTime(minutes)}
                              className={studyTime === minutes ? "bg-gradient-primary" : ""}
                            >
                              {minutes}m
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Timer Controls */}
                    <div className="flex justify-center space-x-2">
                      {!isTimerRunning && timeLeft === 0 ? (
                        <Button 
                          onClick={startTimer}
                          className="bg-gradient-primary hover:shadow-glow-primary"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Session
                        </Button>
                      ) : isTimerRunning ? (
                        <Button 
                          onClick={pauseTimer}
                          variant="outline"
                          className="border-warning text-warning hover:bg-warning hover:text-black"
                        >
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </Button>
                      ) : (
                        <>
                          <Button 
                            onClick={startTimer}
                            className="bg-gradient-primary hover:shadow-glow-primary"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </Button>
                          <Button 
                            onClick={resetTimer}
                            variant="outline"
                            className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                    
                    {timeLeft === 0 && studyTime > 0 && !isTimerRunning && (
                      <div className="text-accent font-medium">
                        🎉 Session Complete! Take a break.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Study Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground">Study Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-foreground-muted">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary-bright rounded-full mt-2 flex-shrink-0" />
                      <p>Take regular breaks every 25-30 minutes</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                      <p>Review the AI summary before deep diving</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <p>Test yourself with the generated quiz</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                      <p>Focus on key topics highlighted by AI</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
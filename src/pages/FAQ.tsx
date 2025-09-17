import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  Shield, 
  Brain, 
  Heart, 
  Search, 
  ChevronDown,
  Lock,
  Smartphone,
  Clock,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Smartphone,
      color: "primary-bright",
      questions: [
        {
          id: "what-is-mindful-mentor",
          question: "What is The Mindful Mentor?",
          answer: "The Mindful Mentor is an AI-powered mental health companion designed specifically for students. It provides private journaling, mood analysis, study tools, and micro-exercises to support your mental wellness journey through academic life."
        },
        {
          id: "how-to-start",
          question: "How do I get started?",
          answer: "Simply start by exploring your current mood on the homepage. Choose how you're feeling, chat with our AI, try a micro-exercise, or jump straight into journaling. There's no wrong way to begin your mental health journey."
        },
        {
          id: "daily-routine",
          question: "How should I use this daily?",
          answer: "We recommend starting with 5-10 minutes daily: journal your thoughts, try 1-2 micro-exercises, and review your insights. Build consistency first, then explore study mode and deeper analysis features."
        }
      ]
    },
    {
      id: "privacy-security",
      title: "Privacy & Security",
      icon: Shield,
      color: "success",
      questions: [
        {
          id: "data-privacy",
          question: "How is my data protected?",
          answer: "All your journal entries and personal data are stored locally on your device using encrypted browser storage. We use end-to-end encryption, and your data never leaves your device unless you explicitly choose to export it."
        },
        {
          id: "who-can-see",
          question: "Who can see my journal entries?",
          answer: "Nobody. Your journal entries are completely private and stored only on your device. Even our AI analysis happens locally when possible. We have no servers storing your personal thoughts or mental health data."
        },
        {
          id: "data-deletion",
          question: "Can I delete all my data?",
          answer: "Yes, absolutely. You can clear all your data at any time from the settings. This will permanently remove all journal entries, mood data, and analysis from your device. This action cannot be undone."
        },
        {
          id: "account-required",
          question: "Do I need to create an account?",
          answer: "No account required! The app works entirely in your browser with local storage. This means maximum privacy - no email, no passwords, no personal information stored on our servers."
        }
      ]
    },
    {
      id: "mood-journal",
      title: "Mood & Journaling",
      icon: Heart,
      color: "secondary",
      questions: [
        {
          id: "mood-accuracy",
          question: "How accurate is the mood detection?",
          answer: "Our AI mood analysis uses advanced sentiment analysis and is about 80-85% accurate for general emotional states. It's designed to identify patterns and trends rather than provide clinical diagnoses. Your self-awareness is always the most important factor."
        },
        {
          id: "journaling-benefits",
          question: "Why should I journal regularly?",
          answer: "Regular journaling helps you process emotions, identify patterns, reduce stress, and improve self-awareness. Research shows that expressive writing can boost mood, improve immune function, and help with academic performance."
        },
        {
          id: "what-to-write",
          question: "What should I write about?",
          answer: "Write about anything on your mind: daily experiences, academic stress, relationships, goals, or random thoughts. There's no right or wrong way to journal. The AI will help identify themes and provide insights regardless of your writing style."
        },
        {
          id: "mood-tracking-benefits",
          question: "How does mood tracking help?",
          answer: "Tracking your mood helps you identify patterns, triggers, and what activities or situations improve your mental state. Over time, you'll gain insights that help you make better decisions for your wellbeing."
        }
      ]
    },
    {
      id: "ai-features",
      title: "AI Features",
      icon: Brain,
      color: "accent",
      questions: [
        {
          id: "how-ai-works",
          question: "How does the AI analysis work?",
          answer: "Our AI analyzes your journal text for emotional content, themes, and patterns using natural language processing. It identifies mood trends, suggests relevant exercises, and provides personalized insights while maintaining your privacy."
        },
        {
          id: "ai-limitations",
          question: "What can't the AI do?",
          answer: "The AI cannot provide medical advice, diagnose mental health conditions, or replace professional counseling. It's designed for general wellness support and pattern recognition, not clinical assessment or crisis intervention."
        },
        {
          id: "improving-ai",
          question: "How can I get better AI insights?",
          answer: "The more you journal, the better insights you'll receive. Write authentically about your experiences, emotions, and thoughts. The AI learns from your patterns over time to provide more personalized recommendations."
        }
      ]
    },
    {
      id: "study-mode",
      title: "Study Mode",
      icon: Users,
      color: "warning",
      questions: [
        {
          id: "study-mode-features",
          question: "What does Study Mode include?",
          answer: "Study Mode offers file upload and AI summarization, Pomodoro-style timers, auto-generated quizzes from your content, and study session analytics. It's designed to make your study time more effective and less stressful."
        },
        {
          id: "supported-files",
          question: "What file types can I upload?",
          answer: "Currently supports PDF, DOCX, and TXT files up to 20MB. The AI will analyze your content and create summaries, key topic lists, and practice questions to help you study more effectively."
        },
        {
          id: "quiz-generation",
          question: "How are quizzes generated?",
          answer: "Our AI identifies key concepts, definitions, and important facts from your uploaded materials to create multiple choice, true/false, and short answer questions. Quiz difficulty adapts based on your performance."
        }
      ]
    },
    {
      id: "exercises",
      title: "Micro-Exercises",
      icon: Clock,
      color: "primary-bright",
      questions: [
        {
          id: "exercise-effectiveness",
          question: "Do micro-exercises really work?",
          answer: "Yes! Short, focused exercises (1-5 minutes) are scientifically proven to reduce stress, improve mood, and increase focus. They're designed to fit into busy student schedules while providing real mental health benefits."
        },
        {
          id: "which-exercises",
          question: "Which exercises should I try first?",
          answer: "Start with breathing exercises like 4-7-8 breathing or box breathing - they're universally helpful. Then try gratitude practices or the 5-4-3-2-1 grounding technique based on your current needs and mood."
        },
        {
          id: "exercise-frequency",
          question: "How often should I do exercises?",
          answer: "We recommend 2-3 micro-exercises daily, especially during stressful periods. The daily challenge encourages 3 different exercises, but even one exercise when you're feeling overwhelmed can make a difference."
        }
      ]
    },
    {
      id: "crisis-support",
      title: "Crisis & Support",
      icon: Heart,
      color: "destructive",
      questions: [
        {
          id: "crisis-help",
          question: "What if I'm having a mental health crisis?",
          answer: "If you're having thoughts of self-harm or suicide, please reach out immediately: National Suicide Prevention Lifeline (988), Crisis Text Line (text HOME to 741741), or your local emergency services (911). This app is not for crisis intervention."
        },
        {
          id: "when-seek-help",
          question: "When should I seek professional help?",
          answer: "Consider professional help if you experience persistent sadness, anxiety affecting daily life, substance use concerns, relationship problems, or academic performance issues. Many colleges offer free counseling services."
        },
        {
          id: "campus-resources",
          question: "How do I find campus mental health resources?",
          answer: "Most colleges have counseling centers, wellness programs, and peer support groups. Check your student health center, student services website, or ask at the campus information desk for available mental health resources."
        }
      ]
    }
  ];

  const getMoodSpecificFAQs = (mood: string) => {
    const moodFAQs = {
      sad: [
        {
          question: "Why do I feel sad even when things are going well?",
          answer: "Sadness can occur even during good times due to hormonal changes, seasonal factors, stress, comparison with others, or processing past experiences. It's completely normal and doesn't diminish your achievements."
        },
        {
          question: "How long is normal to feel down?",
          answer: "Occasional sadness lasting a few hours to a few days is normal. If persistent sadness lasts more than two weeks and affects daily activities, consider speaking with a counselor or mental health professional."
        },
        {
          question: "What's the difference between sadness and depression?",
          answer: "Sadness is a normal emotion that comes and goes. Depression involves persistent low mood, loss of interest in activities, changes in sleep/appetite, and impacts daily functioning for weeks or months."
        }
      ],
      happy: [
        {
          question: "How can I maintain this good feeling?",
          answer: "Maintain happiness by practicing gratitude, engaging in activities you enjoy, connecting with supportive people, exercising regularly, and being mindful of positive moments throughout the day."
        },
        {
          question: "Is it okay to feel happy when others are struggling?",
          answer: "Yes, absolutely. Your happiness doesn't take away from others' struggles. In fact, your positive energy can be a source of support and inspiration for friends who are going through difficult times."
        }
      ],
      frustrated: [
        {
          question: "Why do I get so angry over small things?",
          answer: "Small triggers can feel big when you're stressed, tired, hungry, or dealing with underlying pressures. Academic stress, lack of sleep, and accumulated daily frustrations can lower your tolerance threshold."
        },
        {
          question: "What are healthy ways to express frustration?",
          answer: "Try physical exercise, deep breathing, journaling, talking to a friend, creative activities, or using our micro-exercises. Avoid bottling up emotions, but also avoid taking frustration out on others."
        }
      ]
    };
    return moodFAQs[mood] || [];
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      searchQuery === "" ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-foreground-muted">
            Find answers to common questions about your mental health journey
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQ..."
              className="pl-10 bg-input border-border text-foreground"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? "bg-gradient-primary" : ""}
          >
            All Topics
          </Button>
          {faqCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? `bg-gradient-primary` : ""}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.title}
              </Button>
            );
          })}
        </motion.div>

        {/* FAQ Content */}
        <div className="space-y-6">
          {filteredCategories
            .filter(category => selectedCategory === null || category.id === selectedCategory)
            .map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center">
                        <Icon className={`w-5 h-5 mr-2 text-${category.color}`} />
                        {category.title}
                        <Badge variant="outline" className="ml-auto">
                          {category.questions.length} questions
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.questions.map((faq) => (
                          <div key={faq.id} className="border-b border-border/50 pb-4 last:border-b-0 last:pb-0">
                            <button
                              onClick={() => toggleExpanded(faq.id)}
                              className="w-full text-left flex items-center justify-between p-3 hover:bg-background-secondary/50 rounded-lg transition-colors"
                            >
                              <span className="font-medium text-foreground">{faq.question}</span>
                              <ChevronDown 
                                className={`w-4 h-4 text-foreground-muted transition-transform ${
                                  expandedItems.has(faq.id) ? "rotate-180" : ""
                                }`} 
                              />
                            </button>
                            {expandedItems.has(faq.id) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="px-3 pb-3"
                              >
                                <p className="text-foreground-muted leading-relaxed">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </div>

        {/* Crisis Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="glass border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Crisis Resources - Get Help Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">National Crisis Lines</h4>
                    <ul className="space-y-1 text-foreground-muted">
                      <li>• Suicide Prevention Lifeline: <strong className="text-destructive">988</strong></li>
                      <li>• Crisis Text Line: Text <strong className="text-destructive">HOME</strong> to <strong className="text-destructive">741741</strong></li>
                      <li>• Emergency Services: <strong className="text-destructive">911</strong></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Student Resources</h4>
                    <ul className="space-y-1 text-foreground-muted">
                      <li>• Campus Counseling Center</li>
                      <li>• Student Health Services</li>
                      <li>• Academic Advisor</li>
                      <li>• Resident Advisor (if on campus)</li>
                    </ul>
                  </div>
                </div>
                <div className="pt-3 border-t border-destructive/20">
                  <p className="text-foreground-muted">
                    <strong>Remember:</strong> This app is for general wellness support only. 
                    If you're experiencing a mental health crisis, please reach out to professional help immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Card className="glass border-glass-border/30">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Still have questions?
              </h3>
              <p className="text-foreground-muted mb-4">
                Can't find the answer you're looking for? We're here to help you on your mental health journey.
              </p>
              <Button 
                variant="outline"
                className="border-primary-bright text-primary-bright hover:bg-primary-bright hover:text-white"
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Lock, Brain, Lightbulb, Clock, Heart, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MoodOrb from "@/components/MoodOrb";

const Index = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<"sad" | "happy" | "frustrated" | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'ai'}>>([]);
  const [currentInput, setCurrentInput] = useState("");

  const moodResponses = {
    sad: {
      greeting: "I notice you're feeling sad. That's completely okay - sadness is a natural part of life. Let's talk about what's on your mind.",
      suggestions: [
        "It's okay to feel this way - your emotions are valid",
        "Sometimes sadness helps us process important experiences",
        "Would you like to explore what's behind this feeling?",
        "Remember, this feeling won't last forever"
      ],
      faqs: [
        "Why do I feel this way?",
        "How to cope with sadness",
        "When to seek help",
        "Supporting myself through difficult times"
      ]
    },
    happy: {
      greeting: "I can sense your positive energy! It's wonderful that you're feeling happy. Let's celebrate this moment and explore what's bringing you joy.",
      suggestions: [
        "What's making you feel so positive today?",
        "How can we build on this wonderful feeling?",
        "Your happiness can be a source of strength",
        "Let's capture this moment in your journal"
      ],
      faqs: [
        "How to maintain good mood",
        "Sharing happiness with others",
        "Building on positive moments",
        "Creating lasting joy"
      ]
    },
    frustrated: {
      greeting: "I understand you're feeling frustrated right now. That energy you're feeling is valid, and we can work together to channel it constructively.",
      suggestions: [
        "Let's break down what's bothering you",
        "Your frustration shows you care deeply about something",
        "We can find healthy ways to express these feelings",
        "Sometimes frustration is a sign we need to make changes"
      ],
      faqs: [
        "Managing anger and frustration",
        "Study stress relief techniques",
        "Healthy expression of emotions",
        "Quick stress release methods"
      ]
    }
  };

  const microExercises = [
    {
      title: "5 Deep Breaths",
      description: "Guided breathing to center yourself",
      duration: "2 min",
      icon: Wind,
      action: () => navigate("/exercises")
    },
    {
      title: "3 Gratitudes",
      description: "Quick gratitude practice",
      duration: "3 min", 
      icon: Heart,
      action: () => navigate("/exercises")
    },
    {
      title: "1-Minute Stretch",
      description: "Release physical tension",
      duration: "1 min",
      icon: Sparkles,
      action: () => navigate("/exercises")
    }
  ];

  const handleMoodSelect = (mood: "sad" | "happy" | "frustrated") => {
    setSelectedMood(mood);
    const response = moodResponses[mood];
    setChatMessages([
      { id: 1, text: response.greeting, sender: 'ai' }
    ]);
  };

  const handleSendMessage = () => {
    if (!currentInput.trim() || !selectedMood) return;
    
    const newMessage = { 
      id: chatMessages.length + 1, 
      text: currentInput, 
      sender: 'user' as const 
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = moodResponses[selectedMood].suggestions;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        text: randomResponse,
        sender: 'ai'
      }]);
    }, 1000);
    
    setCurrentInput("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Mood Orb */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12"
          >
            <MoodOrb mood={selectedMood || "neutral"} />
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Your Safe Space for Mental Wellness
            </h1>
            <p className="text-xl md:text-2xl text-foreground-muted mb-8 max-w-3xl mx-auto">
              Private journaling with AI insights, designed specifically for students navigating academic and personal challenges
            </p>
            <Button 
              size="lg"
              className="bg-gradient-primary hover:shadow-glow-primary text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
              onClick={() => navigate("/journal")}
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mood-Based Chatbox Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              How are you feeling right now?
            </h2>
            <p className="text-lg text-foreground-muted mb-8">
              Choose your current mood to start a personalized conversation
            </p>
          </motion.div>

          {/* Mood Selection Buttons */}
          {!selectedMood && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 mb-8"
            >
              <Button
                onClick={() => handleMoodSelect("sad")}
                className="h-32 bg-mood-sad/20 hover:bg-mood-sad/30 border-2 border-mood-sad/40 hover:border-mood-sad/60 text-white backdrop-blur-sm transition-all duration-300 hover:shadow-glow-secondary"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">😢</div>
                  <div className="text-lg font-semibold">Feeling Sad</div>
                  <div className="text-sm opacity-80">Let's talk about it</div>
                </div>
              </Button>

              <Button
                onClick={() => handleMoodSelect("happy")}
                className="h-32 bg-accent/20 hover:bg-accent/30 border-2 border-accent/40 hover:border-accent/60 text-white backdrop-blur-sm transition-all duration-300 hover:shadow-glow-accent"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">😊</div>
                  <div className="text-lg font-semibold">Feeling Happy</div>
                  <div className="text-sm opacity-80">Share your joy</div>
                </div>
              </Button>

              <Button
                onClick={() => handleMoodSelect("frustrated")}
                className="h-32 bg-mood-frustrated/20 hover:bg-mood-frustrated/30 border-2 border-mood-frustrated/40 hover:border-mood-frustrated/60 text-white backdrop-blur-sm transition-all duration-300 hover:shadow-glow-secondary"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">😤</div>
                  <div className="text-lg font-semibold">Feeling Frustrated</div> 
                  <div className="text-sm opacity-80">Let's work through it</div>
                </div>
              </Button>
            </motion.div>
          )}

          {/* Chat Interface */}
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 mb-8"
            >
              <div className="mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedMood(null);
                    setChatMessages([]);
                  }}
                  className="text-foreground-muted hover:text-foreground"
                >
                  ← Choose Different Mood
                </Button>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary-bright text-white'
                          : 'bg-card text-card-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Share what's on your mind..."
                  className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-bright"
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>

              {/* Quick FAQ Access */}
              {selectedMood && (
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-foreground-muted mb-3">Quick help topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {moodResponses[selectedMood].faqs.map((faq, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/faq")}
                        className="text-xs"
                      >
                        {faq}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Your Mental Health, Protected & Enhanced
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass border-glass-border/30 hover:shadow-glow-primary transition-all duration-300 float">
              <CardContent className="p-8 text-center">
                <Lock className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Private & Encrypted</h3>
                <p className="text-foreground-muted">Your data never leaves your device. End-to-end encryption ensures complete privacy.</p>
              </CardContent>
            </Card>

            <Card className="glass border-glass-border/30 hover:shadow-glow-secondary transition-all duration-300 float" style={{ animationDelay: '1s' }}>
              <CardContent className="p-8 text-center">
                <Brain className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">AI Mood Analysis</h3>
                <p className="text-foreground-muted">Advanced sentiment analysis provides insights into your emotional patterns and growth.</p>
              </CardContent>
            </Card>

            <Card className="glass border-glass-border/30 hover:shadow-glow-accent transition-all duration-300 float" style={{ animationDelay: '2s' }}>
              <CardContent className="p-8 text-center">
                <Lightbulb className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Personalized Insights</h3>
                <p className="text-foreground-muted">Get tailored recommendations and resources based on your unique emotional journey.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Micro-Exercises Section */}
      <section className="py-16 px-6 bg-background-secondary/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-accent mr-3" />
              Quick Mental Health Boosts
            </h2>
            <p className="text-lg text-foreground-muted">
              Simple exercises you can do right now to feel better
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {microExercises.map((exercise, index) => {
              const Icon = exercise.icon;
              return (
                <motion.div
                  key={exercise.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass border-glass-border/30 hover:shadow-glow-primary transition-all duration-300 hover:scale-105 cursor-pointer"
                        onClick={exercise.action}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="w-8 h-8 text-primary-bright" />
                        <span className="text-sm text-accent font-medium flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {exercise.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{exercise.title}</h3>
                      <p className="text-foreground-muted text-sm mb-4">{exercise.description}</p>
                      <Button size="sm" className="w-full bg-gradient-primary hover:shadow-glow-primary">
                        Start Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/exercises")}
              className="border-primary-bright text-primary-bright hover:bg-primary-bright hover:text-white"
            >
              View All Exercises
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-lg p-6 border-success/30">
              <Lock className="w-8 h-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">100% Private</h3>
              <p className="text-sm text-foreground-muted">Your data never leaves your device</p>
            </div>
            <div className="glass rounded-lg p-6 border-primary-bright/30">
              <Brain className="w-8 h-8 text-primary-bright mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">AI-Powered</h3>
              <p className="text-sm text-foreground-muted">Advanced emotional intelligence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Calendar, 
  Brain, 
  Heart, 
  Target, 
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Insights = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "3months">("week");

  // Mock data - in real app this would come from stored journal entries and analytics
  const moodData = {
    week: {
      averageMood: 7.2,
      moodTrend: "improving",
      entries: 5,
      consistencyScore: 71,
      topEmotions: ["optimistic", "focused", "grateful"],
      patterns: [
        "You tend to feel more positive on Tuesday and Thursday",
        "Evening journal entries show higher stress levels",
        "Academic topics correlate with anxiety themes"
      ]
    },
    month: {
      averageMood: 6.8,
      moodTrend: "stable",
      entries: 18,
      consistencyScore: 60,
      topEmotions: ["motivated", "stressed", "hopeful"],
      patterns: [
        "Mood improves significantly after exercise sessions",
        "Weekends show more positive emotional range",
        "Mid-month tends to be your most challenging period"
      ]
    },
    "3months": {
      averageMood: 6.5,
      moodTrend: "improving",
      entries: 45,
      consistencyScore: 65,
      topEmotions: ["resilient", "determined", "anxious"],
      patterns: [
        "Overall upward trend in emotional well-being",
        "Stress management skills have improved significantly",
        "Social connections positively impact your mood"
      ]
    }
  };

  const currentData = moodData[selectedTimeframe];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <ArrowUp className="w-4 h-4 text-success" />;
      case "declining": return <ArrowDown className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-accent" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving": return "text-success";
      case "declining": return "text-destructive";
      default: return "text-accent";
    }
  };

  const recommendations = [
    {
      type: "immediate",
      title: "Take 5 Deep Breaths",
      description: "Your recent entries suggest some stress. A quick breathing exercise can help.",
      action: "Try Now",
      icon: Heart,
      color: "primary-bright"
    },
    {
      type: "self-care",
      title: "Schedule Social Time",
      description: "You mentioned feeling isolated. Consider reaching out to a friend today.",
      action: "Plan Activity",
      icon: Heart,
      color: "secondary"
    },
    {
      type: "resources",
      title: "Guided Meditation",
      description: "Based on your anxiety patterns, this 10-minute session could help.",
      action: "Listen Now", 
      icon: Brain,
      color: "accent"
    },
    {
      type: "growth",
      title: "Gratitude Practice",
      description: "Your positive entries mention gratitude. Let's build on this strength.",
      action: "Start Practice",
      icon: Lightbulb,
      color: "success"
    }
  ];

  const weeklyGoals = [
    { goal: "Journal 5 times this week", progress: 71, completed: false },
    { goal: "Try 3 micro-exercises", progress: 67, completed: false },
    { goal: "Practice gratitude daily", progress: 86, completed: false },
    { goal: "Complete study sessions", progress: 100, completed: true }
  ];

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Your Insights & Growth
          </h1>
          <p className="text-lg text-foreground-muted">
            AI-powered analysis of your mental health journey and personalized recommendations
          </p>
        </motion.div>

        {/* Timeframe Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="glass rounded-lg p-2 border border-glass-border/30">
            {[
              { key: "week", label: "This Week" },
              { key: "month", label: "This Month" },
              { key: "3months", label: "3 Months" }
            ].map((option) => (
              <Button
                key={option.key}
                variant={selectedTimeframe === option.key ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTimeframe(option.key as any)}
                className={selectedTimeframe === option.key ? "bg-gradient-primary" : ""}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary-bright" />
                    Mood Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Average Mood */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-bright mb-2">
                        {currentData.averageMood}/10
                      </div>
                      <p className="text-sm text-foreground-muted">Average Mood</p>
                      <div className="mt-2 flex items-center justify-center">
                        {getTrendIcon(currentData.moodTrend)}
                        <span className={`text-sm ml-1 ${getTrendColor(currentData.moodTrend)}`}>
                          {currentData.moodTrend}
                        </span>
                      </div>
                    </div>

                    {/* Journal Consistency */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">
                        {currentData.entries}
                      </div>
                      <p className="text-sm text-foreground-muted">Journal Entries</p>
                      <div className="mt-2">
                        <Progress value={currentData.consistencyScore} className="h-2" />
                        <span className="text-xs text-foreground-muted">
                          {currentData.consistencyScore}% consistency
                        </span>
                      </div>
                    </div>

                    {/* Streak Counter */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">7</div>
                      <p className="text-sm text-foreground-muted">Day Streak</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="border-success text-success">
                          Keep it up! 🔥
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emotional Patterns */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-secondary" />
                    Emotional Patterns & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Top Emotions */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Most Common Emotions</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentData.topEmotions.map((emotion, index) => (
                          <Badge 
                            key={emotion} 
                            variant="secondary" 
                            className={`
                              ${index === 0 ? "bg-primary-bright/20 text-primary-bright" : ""}
                              ${index === 1 ? "bg-secondary/20 text-secondary" : ""}
                              ${index === 2 ? "bg-accent/20 text-accent" : ""}
                            `}
                          >
                            {emotion}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Patterns */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Key Patterns Discovered</h4>
                      <div className="space-y-3">
                        {currentData.patterns.map((pattern, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-background-secondary/50 rounded-lg">
                            <div className="w-2 h-2 bg-primary-bright rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-foreground-muted">{pattern}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Goals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Target className="w-5 h-5 mr-2 text-accent" />
                    Weekly Goals Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyGoals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${goal.completed ? "text-success" : "text-foreground"}`}>
                            {goal.goal}
                          </span>
                          <span className="text-sm font-medium text-accent">
                            {goal.progress}%
                          </span>
                        </div>
                        <Progress 
                          value={goal.progress} 
                          className={`h-2 ${goal.completed ? "bg-success/20" : ""}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recommendations Sidebar */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-accent" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => {
                      const Icon = rec.icon;
                      return (
                        <div key={index} className="space-y-3">
                          <Card className="bg-background-secondary/50 border-border/50 hover:border-primary-bright/30 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <Icon className={`w-5 h-5 mt-0.5 text-${rec.color}`} />
                                <div className="flex-1 space-y-2">
                                  <h4 className="font-medium text-foreground text-sm">
                                    {rec.title}
                                  </h4>
                                  <p className="text-xs text-foreground-muted">
                                    {rec.description}
                                  </p>
                                  <Button 
                                    size="sm" 
                                    className={`w-full text-xs bg-${rec.color}/20 hover:bg-${rec.color}/30 text-${rec.color} border border-${rec.color}/30`}
                                  >
                                    {rec.action}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Safety & Wellbeing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground">Safety Notice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-foreground-muted">
                    <p>
                      These insights are for educational purposes only and not medical advice.
                    </p>
                    <p>
                      If you're experiencing persistent negative thoughts or mental health concerns, 
                      please consider speaking with a mental health professional.
                    </p>
                    <div className="pt-3 border-t border-border">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-success text-success hover:bg-success hover:text-white"
                      >
                        Campus Resources
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary-bright" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Total journal entries</span>
                      <span className="font-medium text-foreground">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Exercises completed</span>
                      <span className="font-medium text-foreground">43</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Study sessions</span>
                      <span className="font-medium text-foreground">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Longest streak</span>
                      <span className="font-medium text-accent">12 days</span>
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

export default Insights;
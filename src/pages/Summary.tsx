import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  TrendingUp, 
  Award, 
  Target,
  BookOpen,
  Heart,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Summary = () => {
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week, -1 = last week, etc.

  // Mock data for different weeks
  const weeklyData = {
    0: { // Current week
      dates: "Sep 15 - Sep 21, 2024",
      journalEntries: 5,
      moodAverage: 7.2,
      exercisesCompleted: 8,
      studySessions: 3,
      streak: 7,
      achievements: ["Consistency Champion", "Mood Improver"],
      moodPattern: [6, 7, 8, 7, 8, 7, 8], // Daily mood scores
      topEmotions: ["grateful", "focused", "optimistic"],
      insights: [
        "Your mood improved significantly mid-week",
        "Exercise sessions correlated with better mood",
        "Tuesday was your most productive study day"
      ]
    },
    [-1]: { // Last week
      dates: "Sep 8 - Sep 14, 2024", 
      journalEntries: 4,
      moodAverage: 6.8,
      exercisesCompleted: 6,
      studySessions: 2,
      streak: 5,
      achievements: ["Early Bird"],
      moodPattern: [6, 6, 7, 8, 7, 6, 7],
      topEmotions: ["motivated", "stressed", "hopeful"],
      insights: [
        "Stress levels were higher early in the week",
        "Weekend reflection improved your outlook",
        "Academic pressures peaked mid-week"
      ]
    }
  };

  const currentData = weeklyData[selectedWeek] || weeklyData[0];

  const achievements = [
    {
      id: "streak-7",
      title: "Week Warrior",
      description: "Journaled for 7 consecutive days",
      icon: "🔥",
      earned: true,
      date: "Sep 21, 2024"
    },
    {
      id: "mood-improver",
      title: "Mood Improver",
      description: "Increased average mood by 15% this week",
      icon: "📈",
      earned: true,
      date: "Sep 21, 2024"
    },
    {
      id: "exercise-enthusiast",
      title: "Exercise Enthusiast",
      description: "Completed 8+ micro-exercises in one week",
      icon: "💪",
      earned: true,
      date: "Sep 20, 2024"
    },
    {
      id: "study-master",
      title: "Study Master",
      description: "Complete 5 study sessions with quiz scores >80%",
      icon: "🎓",
      earned: false,
      progress: 60
    },
    {
      id: "gratitude-guru",
      title: "Gratitude Guru",
      description: "Practice gratitude exercises for 10 days",
      icon: "🙏",
      earned: false,
      progress: 40
    },
    {
      id: "mindful-month",
      title: "Mindful Month", 
      description: "Maintain journaling streak for 30 days",
      icon: "🧘",
      earned: false,
      progress: 23
    }
  ];

  const getDayName = (index: number) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days[index];
  };

  const getMoodEmoji = (score: number) => {
    if (score >= 8) return "😊";
    if (score >= 6) return "🙂";
    if (score >= 4) return "😐";
    return "😔";
  };

  const getMoodColor = (score: number) => {
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-accent";
    if (score >= 4) return "text-warning";
    return "text-mood-sad";
  };

  const navigateWeek = (direction: number) => {
    setSelectedWeek(prev => Math.max(prev + direction, -4)); // Limit to 4 weeks back
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Weekly Summary
          </h1>
          <p className="text-lg text-foreground-muted">
            Track your progress and celebrate your mental health journey
          </p>
        </motion.div>

        {/* Week Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center mb-8"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek(-1)}
            disabled={selectedWeek <= -4}
            className="mr-4"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">
              {selectedWeek === 0 ? "This Week" : `${Math.abs(selectedWeek)} Week${Math.abs(selectedWeek) > 1 ? 's' : ''} Ago`}
            </h2>
            <p className="text-sm text-foreground-muted">{currentData.dates}</p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek(1)}
            disabled={selectedWeek >= 0}
            className="ml-4"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary-bright" />
                    Week at a Glance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-bright mb-2">
                        {currentData.journalEntries}
                      </div>
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="w-4 h-4 mr-1 text-primary-bright" />
                        <span className="text-sm text-foreground-muted">Journal Entries</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">
                        {currentData.moodAverage}
                      </div>
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="w-4 h-4 mr-1 text-secondary" />
                        <span className="text-sm text-foreground-muted">Avg Mood</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">
                        {currentData.exercisesCompleted}
                      </div>
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="w-4 h-4 mr-1 text-accent" />
                        <span className="text-sm text-foreground-muted">Exercises</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-success mb-2">
                        {currentData.studySessions}
                      </div>
                      <div className="flex items-center justify-center mb-1">
                        <GraduationCap className="w-4 h-4 mr-1 text-success" />
                        <span className="text-sm text-foreground-muted">Study Sessions</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Daily Mood Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-secondary" />
                    Daily Mood Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mood Chart */}
                    <div className="grid grid-cols-7 gap-2">
                      {currentData.moodPattern.map((mood, index) => (
                        <div key={index} className="text-center">
                          <div className="text-xs text-foreground-muted mb-2">
                            {getDayName(index)}
                          </div>
                          <div className="relative">
                            <div 
                              className="w-full bg-background-secondary rounded-lg flex items-end justify-center"
                              style={{ height: '80px' }}
                            >
                              <div 
                                className="w-6 bg-gradient-primary rounded-t-sm transition-all duration-1000"
                                style={{ height: `${(mood / 10) * 80}px` }}
                              />
                            </div>
                            <div className={`text-sm font-medium mt-2 ${getMoodColor(mood)}`}>
                              {mood}/10
                            </div>
                            <div className="text-lg mt-1">
                              {getMoodEmoji(mood)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Top Emotions */}
                    <div className="pt-4 border-t border-border">
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
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Insights */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Target className="w-5 h-5 mr-2 text-accent" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentData.insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-background-secondary/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary-bright rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-foreground-muted">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Achievements & Progress */}
          <div className="space-y-6">
            {/* Current Streak */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-glass-border/30 bg-gradient-primary/10">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">🔥</div>
                  <div className="text-3xl font-bold text-primary-bright mb-2">
                    {currentData.streak}
                  </div>
                  <p className="text-foreground-muted">Day Streak</p>
                  <p className="text-xs text-accent mt-2">Keep the momentum going!</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Award className="w-5 h-5 mr-2 text-accent" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`p-3 rounded-lg border ${
                          achievement.earned 
                            ? "bg-success/10 border-success/30" 
                            : "bg-background-secondary/50 border-border/50"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className={`font-medium text-sm ${
                              achievement.earned ? "text-success" : "text-foreground"
                            }`}>
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-foreground-muted mb-2">
                              {achievement.description}
                            </p>
                            
                            {achievement.earned ? (
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-success mr-1" />
                                <span className="text-xs text-success">
                                  Earned {achievement.date}
                                </span>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <Progress value={achievement.progress} className="h-1" />
                                <span className="text-xs text-accent">
                                  {achievement.progress}% complete
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-foreground">Next Week Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-foreground-muted">Journal 6 times</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-foreground-muted">Try 10 micro-exercises</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-foreground-muted">Complete 4 study sessions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-foreground-muted">Maintain 8+ day streak</span>
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

export default Summary;
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wind, 
  Heart, 
  Sparkles, 
  Eye, 
  Brain, 
  Zap, 
  Clock,
  Play,
  CheckCircle,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Exercises = () => {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);

  const exerciseCategories = [
    {
      title: "Breathing Exercises",
      description: "Calm your mind and regulate your nervous system",
      exercises: [
        {
          id: "4-7-8-breathing",
          title: "4-7-8 Breathing",
          description: "Inhale for 4, hold for 7, exhale for 8 seconds",
          duration: "3 min",
          icon: Wind,
          instructions: [
            "Sit comfortably with your back straight",
            "Place tongue tip behind upper front teeth",
            "Exhale completely through your mouth",
            "Inhale through nose for 4 counts",
            "Hold breath for 7 counts", 
            "Exhale through mouth for 8 counts",
            "Repeat 3-4 cycles"
          ],
          benefits: ["Reduces anxiety", "Improves sleep", "Lowers stress"]
        },
        {
          id: "box-breathing",
          title: "Box Breathing",
          description: "Equal count breathing pattern for focus and calm",
          duration: "4 min",
          icon: Wind,
          instructions: [
            "Sit upright in a comfortable position",
            "Inhale slowly through nose for 4 counts",
            "Hold breath for 4 counts",
            "Exhale slowly through mouth for 4 counts",
            "Hold empty for 4 counts",
            "Repeat for 8-10 cycles"
          ],
          benefits: ["Improves focus", "Reduces stress", "Balances nervous system"]
        }
      ]
    },
    {
      title: "Gratitude Practices",
      description: "Shift your mindset towards positivity and appreciation",
      exercises: [
        {
          id: "three-good-things",
          title: "Three Good Things",
          description: "Reflect on positive moments from your day",
          duration: "5 min",
          icon: Heart,
          instructions: [
            "Find a quiet, comfortable space",
            "Think about your day",
            "Identify three things that went well",
            "Write them down or say them aloud",
            "For each, explain why it was meaningful",
            "Notice how this makes you feel"
          ],
          benefits: ["Increases happiness", "Improves mood", "Builds resilience"]
        },
        {
          id: "gratitude-letter",
          title: "Gratitude Letter",
          description: "Write appreciation to someone important to you",
          duration: "10 min",
          icon: Heart,
          instructions: [
            "Think of someone who helped you",
            "Reflect on their specific impact",
            "Write a heartfelt letter to them",
            "Be specific about what they did",
            "Describe how it affected you",
            "Consider sharing it with them"
          ],
          benefits: ["Strengthens relationships", "Increases joy", "Builds connection"]
        }
      ]
    },
    {
      title: "Physical Wellness",
      description: "Release tension and energize your body",
      exercises: [
        {
          id: "desk-stretches",
          title: "Desk Stretches",
          description: "Simple stretches you can do anywhere",
          duration: "3 min",
          icon: Sparkles,
          instructions: [
            "Neck rolls: 5 slow circles each direction",
            "Shoulder shrugs: 10 up and down movements",
            "Arm circles: 10 forward, 10 backward",
            "Wrist rotations: 10 each direction",
            "Seated spinal twist: Hold 30 seconds each side",
            "Ankle rolls: 10 each direction"
          ],
          benefits: ["Reduces muscle tension", "Improves circulation", "Increases energy"]
        },
        {
          id: "energy-boost",
          title: "Quick Energy Boost",
          description: "Gentle movements to wake up your body",
          duration: "2 min",
          icon: Zap,
          instructions: [
            "Stand up and shake out your hands",
            "Do 10 jumping jacks or march in place",
            "Take 5 deep breaths with arms overhead",
            "Do 10 gentle body twists",
            "Stretch arms up, then touch toes",
            "End with 3 energizing breaths"
          ],
          benefits: ["Increases alertness", "Boosts energy", "Improves mood"]
        }
      ]
    },
    {
      title: "Mental Clarity",
      description: "Sharpen your focus and clear mental fog",
      exercises: [
        {
          id: "5-4-3-2-1-grounding",
          title: "5-4-3-2-1 Grounding",
          description: "Use your senses to stay present",
          duration: "3 min",
          icon: Eye,
          instructions: [
            "Take a deep breath and look around",
            "Name 5 things you can see",
            "Name 4 things you can touch",
            "Name 3 things you can hear",
            "Name 2 things you can smell",
            "Name 1 thing you can taste",
            "Take another deep breath"
          ],
          benefits: ["Reduces anxiety", "Increases presence", "Grounds in reality"]
        },
        {
          id: "mind-declutter",
          title: "Mind Declutter",
          description: "Clear mental space by organizing thoughts",
          duration: "5 min",
          icon: Brain,
          instructions: [
            "Sit quietly and close your eyes",
            "Notice what thoughts are present",
            "Mentally sort them into categories",
            "Decide which need attention now",
            "Set aside non-urgent thoughts",
            "Focus on your breathing",
            "Open eyes feeling clearer"
          ],
          benefits: ["Improves focus", "Reduces overwhelm", "Increases clarity"]
        }
      ]
    }
  ];

  const startExercise = (exerciseId: string, duration: number) => {
    setActiveExercise(exerciseId);
    setExerciseTimer(duration * 60); // Convert minutes to seconds
    setIsExerciseRunning(true);
    
    const timer = setInterval(() => {
      setExerciseTimer((prev) => {
        if (prev <= 1) {
          setIsExerciseRunning(false);
          setCompletedExercises(prev => new Set(prev).add(exerciseId));
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopExercise = () => {
    setIsExerciseRunning(false);
    setActiveExercise(null);
    setExerciseTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalExercises = () => {
    return exerciseCategories.reduce((total, category) => total + category.exercises.length, 0);
  };

  const getCompletionPercentage = () => {
    return Math.round((completedExercises.size / getTotalExercises()) * 100);
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
            Micro-Exercises Hub
          </h1>
          <p className="text-lg text-foreground-muted mb-6">
            Quick, effective exercises to boost your mental health in just minutes
          </p>
          
          {/* Progress Overview */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground-muted">Daily Progress</span>
              <span className="text-sm font-medium text-accent">
                {completedExercises.size} of {getTotalExercises()} completed
              </span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-2" />
            <p className="text-xs text-foreground-muted mt-2">
              Complete 3 exercises daily for optimal mental wellness
            </p>
          </div>
        </motion.div>

        {/* Active Exercise Timer */}
        {activeExercise && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Card className="glass border-glass-border/30 bg-gradient-primary/10">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Exercise in Progress</h3>
                  <div className="text-4xl font-mono font-bold text-primary-bright">
                    {formatTime(exerciseTimer)}
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={stopExercise}
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      Stop Exercise
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Exercise Categories */}
        <div className="space-y-12">
          {exerciseCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {category.title}
                </h2>
                <p className="text-foreground-muted">{category.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {category.exercises.map((exercise, exerciseIndex) => {
                  const Icon = exercise.icon;
                  const isCompleted = completedExercises.has(exercise.id);
                  const isActive = activeExercise === exercise.id;
                  
                  return (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: exerciseIndex * 0.1 }}
                    >
                      <Card className={`glass border-glass-border/30 transition-all duration-300 ${
                        isActive 
                          ? "shadow-glow-primary border-primary-bright/50" 
                          : "hover:shadow-glow-primary/50 hover:scale-105"
                      }`}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center text-foreground">
                              <Icon className="w-6 h-6 mr-3 text-primary-bright" />
                              {exercise.title}
                              {isCompleted && (
                                <CheckCircle className="w-5 h-5 ml-2 text-success" />
                              )}
                            </CardTitle>
                            <Badge 
                              variant="outline" 
                              className="border-accent text-accent flex items-center"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {exercise.duration}
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-foreground-muted">{exercise.description}</p>
                            
                            {/* Benefits */}
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2">Benefits:</h4>
                              <div className="flex flex-wrap gap-1">
                                {exercise.benefits.map((benefit, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="secondary" 
                                    className="bg-secondary/20 text-secondary text-xs"
                                  >
                                    {benefit}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            {/* Instructions */}
                            <details className="group">
                              <summary className="cursor-pointer text-sm font-medium text-primary-bright hover:text-primary-bright/80 list-none">
                                <span className="flex items-center">
                                  View Instructions
                                  <span className="ml-1 transform group-open:rotate-90 transition-transform">▶</span>
                                </span>
                              </summary>
                              <div className="mt-3 p-3 bg-background-secondary/50 rounded-lg">
                                <ol className="text-sm text-foreground-muted space-y-1">
                                  {exercise.instructions.map((instruction, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="text-accent font-medium mr-2">{index + 1}.</span>
                                      {instruction}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </details>
                            
                            {/* Action Button */}
                            <Button
                              onClick={() => startExercise(exercise.id, parseInt(exercise.duration))}
                              disabled={isExerciseRunning}
                              className={`w-full ${
                                isCompleted 
                                  ? "bg-success hover:bg-success/80" 
                                  : "bg-gradient-primary hover:shadow-glow-primary"
                              }`}
                            >
                              {isCompleted ? (
                                <>
                                  <RotateCcw className="w-4 h-4 mr-2" />
                                  Do Again
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  Start Exercise
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Daily Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass border-glass-border/30 bg-gradient-secondary/10">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Daily Challenge</h2>
              <p className="text-foreground-muted mb-6">
                Complete 3 different micro-exercises today to boost your mental wellness streak!
              </p>
              <div className="max-w-md mx-auto">
                <Progress 
                  value={Math.min((completedExercises.size / 3) * 100, 100)} 
                  className="h-3 mb-4" 
                />
                <p className="text-sm text-accent font-medium">
                  {Math.min(completedExercises.size, 3)} / 3 exercises completed today
                </p>
              </div>
              {completedExercises.size >= 3 && (
                <div className="mt-4 text-success font-semibold">
                  🎉 Daily challenge complete! Amazing work!
                </div>
              )}
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Exercises;
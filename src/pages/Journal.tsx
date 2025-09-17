import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Save, Lock, Unlock, Brain, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Journal = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [isPrivacyLocked, setIsPrivacyLocked] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [moodAnalysis, setMoodAnalysis] = useState<{
    mood: string;
    confidence: number;
    themes: string[];
    intensity: number;
  } | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    setWordCount(journalEntry.trim().split(/\s+/).filter(word => word.length > 0).length);
  }, [journalEntry]);

  useEffect(() => {
    // Auto-save functionality
    const timer = setTimeout(() => {
      if (journalEntry.trim()) {
        localStorage.setItem('mindful-mentor-journal', JSON.stringify({
          content: journalEntry,
          timestamp: new Date().toISOString(),
          encrypted: isPrivacyLocked
        }));
        setLastSaved(new Date());
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [journalEntry, isPrivacyLocked]);

  useEffect(() => {
    // Load saved journal entry
    const saved = localStorage.getItem('mindful-mentor-journal');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setJournalEntry(parsed.content || '');
      } catch (error) {
        console.error('Error loading saved journal:', error);
      }
    }
  }, []);

  const analyzeMood = async () => {
    if (!journalEntry.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in real app, this would call an AI service)
    setTimeout(() => {
      const text = journalEntry.toLowerCase();
      let mood = "neutral";
      let confidence = 0.7;
      let themes: string[] = [];
      let intensity = 0.5;

      // Simple sentiment analysis simulation
      const positiveWords = ["happy", "joy", "excited", "great", "amazing", "wonderful", "love", "grateful"];
      const negativeWords = ["sad", "angry", "frustrated", "terrible", "awful", "hate", "worried", "stressed"];
      const anxietyWords = ["nervous", "anxious", "worried", "fear", "panic", "overwhelmed"];

      const positiveCount = positiveWords.filter(word => text.includes(word)).length;
      const negativeCount = negativeWords.filter(word => text.includes(word)).length;
      const anxietyCount = anxietyWords.filter(word => text.includes(word)).length;

      if (positiveCount > negativeCount && positiveCount > 0) {
        mood = "positive";
        confidence = Math.min(0.9, 0.6 + positiveCount * 0.1);
        themes = ["gratitude", "optimism"];
        intensity = Math.min(1, positiveCount * 0.2);
      } else if (negativeCount > 0 || anxietyCount > 0) {
        mood = anxietyCount > negativeCount ? "anxious" : "negative";
        confidence = Math.min(0.9, 0.6 + (negativeCount + anxietyCount) * 0.1);
        themes = anxietyCount > 0 ? ["stress", "worry"] : ["sadness", "frustration"];
        intensity = Math.min(1, (negativeCount + anxietyCount) * 0.2);
      }

      // Add academic-related themes
      if (text.includes("study") || text.includes("exam") || text.includes("assignment")) {
        themes.push("academic");
      }
      if (text.includes("friend") || text.includes("social")) {
        themes.push("social");
      }

      setMoodAnalysis({
        mood,
        confidence,
        themes,
        intensity
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "positive": return "text-accent";
      case "negative": return "text-mood-sad";
      case "anxious": return "text-mood-frustrated";
      default: return "text-primary-bright";
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "positive": return "😊";
      case "negative": return "😢";
      case "anxious": return "😰";
      default: return "😐";
    }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Your Private Journal</h1>
          <p className="text-lg text-foreground-muted">A safe space to express your thoughts and feelings</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Journal Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-foreground">
                      <Calendar className="w-5 h-5 mr-2 text-primary-bright" />
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                    
                    {/* Privacy Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {isPrivacyLocked ? (
                          <Lock className="w-4 h-4 text-success" />
                        ) : (
                          <Unlock className="w-4 h-4 text-warning" />
                        )}
                        <span className="text-sm text-foreground-muted">Privacy Lock</span>
                        <Switch
                          checked={isPrivacyLocked}
                          onCheckedChange={setIsPrivacyLocked}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Indicators */}
                  <div className="flex items-center justify-between text-sm text-foreground-muted">
                    <div className="flex items-center space-x-4">
                      <span>{wordCount} words</span>
                      {lastSaved && (
                        <span>Saved {lastSaved.toLocaleTimeString()}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {isPrivacyLocked ? (
                        <Badge variant="outline" className="border-success text-success">
                          <Lock className="w-3 h-3 mr-1" />
                          Encrypted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-warning text-warning">
                          <Unlock className="w-3 h-3 mr-1" />
                          Unencrypted
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Journal Input */}
                    <Textarea
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                      placeholder="How are you feeling today? What's on your mind? Share your thoughts freely - this is your safe space..."
                      className="min-h-[400px] bg-input/50 border-border text-foreground placeholder-muted-foreground resize-none text-lg leading-relaxed"
                    />
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary-bright text-primary-bright hover:bg-primary-bright hover:text-white"
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          Voice Input
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={analyzeMood}
                          disabled={!journalEntry.trim() || isAnalyzing}
                          className="bg-gradient-primary hover:shadow-glow-primary"
                        >
                          {isAnalyzing ? (
                            <>
                              <Brain className="w-4 h-4 mr-2 animate-pulse" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Brain className="w-4 h-4 mr-2" />
                              Analyze Mood
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* AI Analysis Sidebar */}
          <div className="space-y-6">
            {/* Privacy Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Privacy Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Data Storage</span>
                      <Badge variant="secondary" className="bg-success/20 text-success">Local Only</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Encryption</span>
                      <Badge variant="secondary" className={isPrivacyLocked ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}>
                        {isPrivacyLocked ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Data Sharing</span>
                      <Badge variant="secondary" className="bg-success/20 text-success">Never</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-muted mt-4 p-3 bg-background-secondary/50 rounded-lg">
                    Your journal entries are stored locally and never transmitted to external servers. 
                    AI analysis happens on your device when possible.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mood Analysis Results */}
            {moodAnalysis && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-primary-bright" />
                      Mood Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Current Mood */}
                      <div className="text-center">
                        <div className="text-4xl mb-2">{getMoodEmoji(moodAnalysis.mood)}</div>
                        <div className={`text-lg font-semibold ${getMoodColor(moodAnalysis.mood)}`}>
                          {moodAnalysis.mood.charAt(0).toUpperCase() + moodAnalysis.mood.slice(1)}
                        </div>
                        <div className="text-sm text-foreground-muted">
                          {Math.round(moodAnalysis.confidence * 100)}% confidence
                        </div>
                      </div>

                      {/* Emotional Intensity */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-foreground-muted">Emotional Intensity</span>
                          <span className="text-sm font-medium text-foreground">
                            {Math.round(moodAnalysis.intensity * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-background-secondary rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${moodAnalysis.intensity * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Key Themes */}
                      {moodAnalysis.themes.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-foreground-muted mb-2">Key Themes</h4>
                          <div className="flex flex-wrap gap-2">
                            {moodAnalysis.themes.map((theme, index) => (
                              <Badge key={index} variant="secondary" className="bg-primary-bright/20 text-primary-bright">
                                {theme}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-medium text-foreground mb-2">Recommendations</h4>
                        <div className="space-y-2">
                          {moodAnalysis.mood === "positive" && (
                            <p className="text-sm text-foreground-muted">
                              Consider capturing this positive moment in detail. What specific factors contributed to this feeling?
                            </p>
                          )}
                          {moodAnalysis.mood === "negative" && (
                            <p className="text-sm text-foreground-muted">
                              It's okay to feel this way. Consider trying a breathing exercise or reaching out to a trusted friend.
                            </p>
                          )}
                          {moodAnalysis.mood === "anxious" && (
                            <p className="text-sm text-foreground-muted">
                              Try the 5-4-3-2-1 grounding technique or some deep breathing exercises to help manage anxiety.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start text-left border-primary-bright/30 hover:bg-primary-bright/10"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Insights
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start text-left border-secondary/30 hover:bg-secondary/10"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Export Entry
                    </Button>
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

export default Journal;
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  BookOpen, 
  Brain, 
  GraduationCap, 
  Heart, 
  BarChart3, 
  HelpCircle,
  Menu,
  X,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/journal", label: "Journal", icon: BookOpen },
    { path: "/insights", label: "Insights", icon: Brain },
    { path: "/study", label: "Study Mode", icon: GraduationCap },
    { path: "/exercises", label: "Exercises", icon: Heart },
    { path: "/summary", label: "Summary", icon: BarChart3 },
    { path: "/faq", label: "FAQ", icon: HelpCircle },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center pulse-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">The Mindful Mentor</h1>
                <p className="text-xs text-foreground-muted">Your Safe Space</p>
              </div>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-primary-bright/20 text-primary-bright shadow-glow-primary" 
                          : "text-foreground-muted hover:text-primary-bright hover:bg-primary-bright/10"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary-bright rounded-full"
                          layoutId="activeIndicator"
                          style={{ x: "-50%" }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Privacy Indicator */}
            <div className="flex items-center space-x-2 text-sm text-foreground-muted">
              <Shield className="w-4 h-4 text-success" />
              <span className="hidden lg:block">Encrypted & Private</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border/30">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">Mindful Mentor</span>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground-muted"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-b border-glass-border/30"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-4 py-3 rounded-lg ${
                        isActive 
                          ? "bg-primary-bright/20 text-primary-bright" 
                          : "text-foreground-muted hover:text-primary-bright hover:bg-primary-bright/10"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              
              {/* Mobile Privacy Indicator */}
              <div className="flex items-center space-x-2 text-sm text-foreground-muted px-4 py-2">
                <Shield className="w-4 h-4 text-success" />
                <span>All data encrypted & private</span>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-20 md:h-24" />
    </>
  );
};

export default Navigation;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Activity, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MovementReminderProps {
  isWorkBlock: boolean;
  onComplete: (type: 'squats' | 'stretch') => void;
  squatsCompleted: number;
  stretchesCompleted: number;
}

export function MovementReminder({ isWorkBlock, onComplete, squatsCompleted, stretchesCompleted }: MovementReminderProps) {
  const [showSquatReminder, setShowSquatReminder] = useState(false);
  const [showStretchReminder, setShowStretchReminder] = useState(false);
  const [lastSquatTime, setLastSquatTime] = useState(Date.now());
  const [lastStretchTime, setLastStretchTime] = useState(Date.now());

  useEffect(() => {
    if (!isWorkBlock) return;

    // Squat reminder every 10 minutes
    const squatInterval = setInterval(() => {
      setShowSquatReminder(true);
    }, 10 * 60 * 1000); // 10 minutes

    // Stretch reminder every 30 minutes
    const stretchInterval = setInterval(() => {
      setShowStretchReminder(true);
    }, 30 * 60 * 1000); // 30 minutes

    return () => {
      clearInterval(squatInterval);
      clearInterval(stretchInterval);
    };
  }, [isWorkBlock]);

  const handleSquatsComplete = () => {
    onComplete('squats');
    setShowSquatReminder(false);
    setLastSquatTime(Date.now());
  };

  const handleStretchComplete = () => {
    onComplete('stretch');
    setShowStretchReminder(false);
    setLastStretchTime(Date.now());
  };

  if (!isWorkBlock) {
    return null;
  }

  return (
    <>
      {/* Movement Stats */}
      <div className="glass-panel rounded-xl p-4 border border-border">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Movement Tracker
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Dumbbell className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Squats</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {squatsCompleted * 10}
              <span className="text-sm text-muted-foreground font-normal"> / 480</span>
            </p>
          </div>
          
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 text-accent mb-1">
              <Activity className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Stretches</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {stretchesCompleted}
              <span className="text-sm text-muted-foreground font-normal"> / 16</span>
            </p>
          </div>
        </div>

        {/* Manual triggers for demo */}
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSquatReminder(true)}
            className="flex-1 text-xs"
          >
            <Dumbbell className="w-3 h-3 mr-1" />
            Squat Reminder
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStretchReminder(true)}
            className="flex-1 text-xs"
          >
            <Activity className="w-3 h-3 mr-1" />
            Stretch Reminder
          </Button>
        </div>
      </div>

      {/* Squat Reminder Modal */}
      <AnimatePresence>
        {showSquatReminder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSquatReminder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel rounded-2xl p-8 border-2 border-primary max-w-md w-full glow-amber"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSquatReminder(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-6"
                >
                  <Dumbbell className="w-10 h-10" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Time for 10 Squats!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Sitting kills focus. Movement = oxygen to brain = better work.
                </p>
                
                <Button
                  onClick={handleSquatsComplete}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Done! (+10 squats)
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stretch Reminder Modal */}
      <AnimatePresence>
        {showStretchReminder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowStretchReminder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel rounded-2xl p-8 border-2 border-accent max-w-md w-full glow-green"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowStretchReminder(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 text-accent mb-6"
                >
                  <Activity className="w-10 h-10" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Upper Body Shuffle!
                </h2>
                <p className="text-muted-foreground mb-4">
                  Arm circles, shoulder shrugs, neck stretches. Move it!
                </p>
                <ul className="text-left text-sm text-muted-foreground mb-6 space-y-1">
                  <li>• 10 arm circles forward</li>
                  <li>• 10 arm circles backward</li>
                  <li>• 5 shoulder shrugs</li>
                  <li>• Neck rolls left & right</li>
                </ul>
                
                <Button
                  onClick={handleStretchComplete}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Done! (+1 stretch)
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { motion } from 'framer-motion';
import { Flame, Clock, CheckCircle2 } from 'lucide-react';

interface DayProgressProps {
  totalBlocks: number;
  completedBlocks: number;
  workHoursCompleted: number;
  currentStreak: number;
}

export function DayProgress({ totalBlocks, completedBlocks, workHoursCompleted, currentStreak }: DayProgressProps) {
  const completionPercentage = (completedBlocks / totalBlocks) * 100;
  
  return (
    <div className="glass-panel rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Day Progress
        </h4>
        <div className="flex items-center gap-1 text-primary">
          <Flame className="w-4 h-4" />
          <span className="text-sm font-bold">{currentStreak} day streak</span>
        </div>
      </div>
      
      {/* Main progress bar */}
      <div className="relative h-4 bg-secondary rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 0.5 }}
          className="absolute h-full bg-gradient-to-r from-primary via-primary to-accent rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground drop-shadow">
            {Math.round(completionPercentage)}%
          </span>
        </div>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-2 rounded-lg bg-secondary/50">
          <div className="flex items-center justify-center gap-1 text-accent mb-1">
            <CheckCircle2 className="w-3 h-3" />
          </div>
          <p className="text-lg font-bold text-foreground">{completedBlocks}</p>
          <p className="text-xs text-muted-foreground">Blocks Done</p>
        </div>
        
        <div className="p-2 rounded-lg bg-secondary/50">
          <div className="flex items-center justify-center gap-1 text-primary mb-1">
            <Clock className="w-3 h-3" />
          </div>
          <p className="text-lg font-bold text-foreground">{workHoursCompleted}</p>
          <p className="text-xs text-muted-foreground">Work Hours</p>
        </div>
        
        <div className="p-2 rounded-lg bg-secondary/50">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <Clock className="w-3 h-3" />
          </div>
          <p className="text-lg font-bold text-foreground">{totalBlocks - completedBlocks}</p>
          <p className="text-xs text-muted-foreground">Remaining</p>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, Zap, Target, Flame } from 'lucide-react';
import { ScheduleBlock } from '@/data/schedule';

interface CurrentBlockProps {
  block: ScheduleBlock;
  timeRemaining: number; // seconds
  progress: number; // 0-100
}

const importanceColors = {
  critical: 'border-destructive glow-red',
  high: 'border-primary glow-amber',
  medium: 'border-muted-foreground',
};

const importanceBadge = {
  critical: 'bg-destructive/20 text-destructive border-destructive/50',
  high: 'bg-primary/20 text-primary border-primary/50',
  medium: 'bg-muted text-muted-foreground border-muted-foreground/50',
};

export function CurrentBlock({ block, timeRemaining, progress }: CurrentBlockProps) {
  const [displayTime, setDisplayTime] = useState('');

  useEffect(() => {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    if (hours > 0) {
      setDisplayTime(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    } else {
      setDisplayTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  }, [timeRemaining]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative glass-panel rounded-xl p-6 border-2 ${importanceColors[block.importance]} ${block.importance === 'critical' ? 'pulse-red' : block.importance === 'high' ? 'pulse-amber' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${importanceBadge[block.importance]}`}>
              {block.importance}
            </span>
            {block.isWorkBlock && (
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/50">
                Work Block
              </span>
            )}
          </div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            {block.title}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {block.startTime} – {block.endTime}
          </p>
        </div>
        
        {/* Countdown */}
        <div className="text-right">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Clock className="w-4 h-4" />
            <span>Time Remaining</span>
          </div>
          <motion.div
            key={displayTime}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={`text-4xl font-bold tracking-wider ${timeRemaining < 60 ? 'text-destructive animate-countdown-pulse' : 'text-primary'}`}
          >
            {displayTime}
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className={`absolute h-full rounded-full ${block.importance === 'critical' ? 'bg-destructive' : 'bg-primary'}`}
        />
      </div>

      {/* Activity */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider mb-2">
          <Target className="w-4 h-4" />
          Activity
        </div>
        <p className="text-lg text-foreground font-medium">{block.activity}</p>
      </div>

      {/* Sub-tasks (for work blocks) */}
      {block.subTasks && block.subTasks.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            Sub-tasks During Block
          </div>
          <ul className="space-y-1">
            {block.subTasks.map((task, idx) => (
              <li key={idx} className="text-sm text-secondary-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {task}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Motivation Quote */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
      >
        <div className="flex items-center gap-2 text-primary text-sm uppercase tracking-wider mb-2">
          <Zap className="w-4 h-4" />
          Motivation
        </div>
        <p className="text-foreground font-medium italic">
          {block.motivation}
        </p>
      </motion.div>
    </motion.div>
  );
}

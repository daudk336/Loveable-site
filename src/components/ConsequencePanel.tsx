import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb, Brain } from 'lucide-react';
import { ScheduleBlock } from '@/data/schedule';

interface ConsequencePanelProps {
  block: ScheduleBlock;
}

export function ConsequencePanel({ block }: ConsequencePanelProps) {
  return (
    <div className="space-y-4">
      {/* Why It Matters */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel rounded-xl p-5 border border-border"
      >
        <div className="flex items-center gap-2 text-accent text-sm uppercase tracking-wider mb-3">
          <Brain className="w-4 h-4" />
          Why This Matters
        </div>
        <p className="text-foreground leading-relaxed">
          {block.whyItMatters}
        </p>
      </motion.div>

      {/* Consequence */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-xl p-5 border border-destructive/30 bg-destructive/5"
      >
        <div className="flex items-center gap-2 text-destructive text-sm uppercase tracking-wider mb-3">
          <AlertTriangle className="w-4 h-4" />
          Skip This & Face Reality
        </div>
        <p className="text-foreground leading-relaxed font-medium">
          {block.consequence}
        </p>
      </motion.div>

      {/* Trick */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-xl p-5 border border-primary/30 bg-primary/5"
      >
        <div className="flex items-center gap-2 text-primary text-sm uppercase tracking-wider mb-3">
          <Lightbulb className="w-4 h-4" />
          Pro Trick
        </div>
        <p className="text-foreground leading-relaxed">
          {block.trick}
        </p>
      </motion.div>

      {/* Focus Priorities (for work blocks) */}
      {block.focusPriorities && block.focusPriorities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-xl p-5 border border-accent/30 bg-accent/5"
        >
          <div className="text-accent text-sm uppercase tracking-wider mb-3">
            Focus Priorities (In Order)
          </div>
          <ol className="space-y-2">
            {block.focusPriorities.map((priority, idx) => (
              <li key={idx} className="flex items-start gap-3 text-foreground">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-sm font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-sm leading-relaxed">{priority}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </div>
  );
}

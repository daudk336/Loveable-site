import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { ScheduleBlock } from '@/data/schedule';
import { cn } from '@/lib/utils';

interface ScheduleListProps {
  schedule: ScheduleBlock[];
  currentBlockId: string;
  completedBlocks: Set<string>;
  onSelectBlock: (block: ScheduleBlock) => void;
}

const importanceIndicator = {
  critical: 'bg-destructive',
  high: 'bg-primary',
  medium: 'bg-muted-foreground/50',
};

export function ScheduleList({ schedule, currentBlockId, completedBlocks, onSelectBlock }: ScheduleListProps) {
  return (
    <div className="glass-panel rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-secondary/30">
        <h3 className="text-lg font-bold text-foreground tracking-tight">
          Daily Schedule
        </h3>
        <p className="text-sm text-muted-foreground">
          {completedBlocks.size} / {schedule.length} blocks completed
        </p>
      </div>
      
      <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
        {schedule.map((block, idx) => {
          const isCurrent = block.id === currentBlockId;
          const isCompleted = completedBlocks.has(block.id);
          
          return (
            <motion.button
              key={block.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => onSelectBlock(block)}
              className={cn(
                "w-full flex items-center gap-3 p-4 text-left transition-all border-l-4",
                isCurrent && "bg-primary/10 border-l-primary",
                isCompleted && !isCurrent && "bg-accent/5 border-l-accent opacity-60",
                !isCurrent && !isCompleted && "border-l-transparent hover:bg-secondary/50",
              )}
            >
              {/* Importance indicator */}
              <div className={cn(
                "w-2 h-2 rounded-full flex-shrink-0",
                importanceIndicator[block.importance]
              )} />
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    {block.startTime}
                  </span>
                  {block.isWorkBlock && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/20 text-accent font-semibold">
                      Work
                    </span>
                  )}
                </div>
                <p className={cn(
                  "font-semibold truncate",
                  isCurrent && "text-primary",
                  isCompleted && "text-accent line-through",
                  !isCurrent && !isCompleted && "text-foreground"
                )}>
                  {block.title}
                </p>
              </div>
              
              {/* Status indicator */}
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
              ) : isCurrent ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-3 h-3 rounded-full bg-primary flex-shrink-0"
                />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

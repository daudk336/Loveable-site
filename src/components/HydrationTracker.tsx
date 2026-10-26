import { motion } from 'framer-motion';
import { Droplets, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HydrationTrackerProps {
  currentMl: number;
  targetMl: number;
  onAddWater: (ml: number) => void;
}

export function HydrationTracker({ currentMl, targetMl, onAddWater }: HydrationTrackerProps) {
  const percentage = Math.min((currentMl / targetMl) * 100, 100);
  
  const quickAddOptions = [200, 300, 500];

  return (
    <div className="glass-panel rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-400" />
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Hydration
          </h4>
        </div>
        <span className="text-xs text-muted-foreground">
          {currentMl}ml / {targetMl}ml
        </span>
      </div>
      
      {/* Water tank visualization */}
      <div className="relative h-32 bg-secondary/50 rounded-lg overflow-hidden border border-border mb-4">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400"
          style={{ originY: 1 }}
        >
          {/* Water wave effect */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-blue-300/50 rounded-full" />
        </motion.div>
        
        {/* Percentage display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-foreground drop-shadow-lg">
            {Math.round(percentage)}%
          </span>
        </div>
        
        {/* Target markers */}
        <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-between py-2 text-xs text-muted-foreground">
          <span>2.5L</span>
          <span>1.25L</span>
          <span>0</span>
        </div>
      </div>
      
      {/* Quick add buttons */}
      <div className="flex gap-2">
        {quickAddOptions.map((ml) => (
          <Button
            key={ml}
            variant="outline"
            size="sm"
            onClick={() => onAddWater(ml)}
            className="flex-1 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            {ml}ml
          </Button>
        ))}
      </div>
      
      {/* Status message */}
      <p className="text-xs text-center text-muted-foreground mt-3">
        {percentage < 30 && "⚠️ Drink more water! Brain fog incoming."}
        {percentage >= 30 && percentage < 60 && "Keep hydrating. You're getting there."}
        {percentage >= 60 && percentage < 90 && "Good progress! Almost at target."}
        {percentage >= 90 && "💧 Excellent! You're fully hydrated."}
      </p>
    </div>
  );
}

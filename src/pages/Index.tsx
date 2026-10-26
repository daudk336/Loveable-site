import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { CurrentBlock } from '@/components/CurrentBlock';
import { ConsequencePanel } from '@/components/ConsequencePanel';
import { ScheduleList } from '@/components/ScheduleList';
import { MovementReminder } from '@/components/MovementReminder';
import { HydrationTracker } from '@/components/HydrationTracker';
import { DayProgress } from '@/components/DayProgress';
import { useScheduleTracker } from '@/hooks/useScheduleTracker';

const Index = () => {
  const {
    schedule,
    currentBlock,
    selectedBlock,
    setSelectedBlock,
    timeRemaining,
    progress,
    completedBlocks,
  } = useScheduleTracker();

  const [hydration, setHydration] = useState(500); // Start with morning water
  const [squatsCompleted, setSquatsCompleted] = useState(0);
  const [stretchesCompleted, setStretchesCompleted] = useState(0);

  const handleAddWater = (ml: number) => {
    setHydration(prev => Math.min(prev + ml, 3000));
  };

  const handleMovementComplete = (type: 'squats' | 'stretch') => {
    if (type === 'squats') {
      setSquatsCompleted(prev => prev + 1);
    } else {
      setStretchesCompleted(prev => prev + 1);
    }
  };

  // Calculate work hours completed
  const workHoursCompleted = Array.from(completedBlocks).filter(id => {
    const block = schedule.find(b => b.id === id);
    return block?.isWorkBlock;
  }).length * 2; // Each work block is 2 hours

  const displayBlock = selectedBlock || currentBlock;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Schedule List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-4"
          >
            <ScheduleList
              schedule={schedule}
              currentBlockId={currentBlock?.id || ''}
              completedBlocks={completedBlocks}
              onSelectBlock={setSelectedBlock}
            />
          </motion.div>

          {/* Center Column - Current Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            {displayBlock && (
              <>
                <CurrentBlock
                  block={displayBlock}
                  timeRemaining={displayBlock.id === currentBlock?.id ? timeRemaining : 0}
                  progress={displayBlock.id === currentBlock?.id ? progress : 0}
                />
                <ConsequencePanel block={displayBlock} />
              </>
            )}
          </motion.div>

          {/* Right Column - Trackers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-4"
          >
            <DayProgress
              totalBlocks={schedule.length}
              completedBlocks={completedBlocks.size}
              workHoursCompleted={workHoursCompleted}
              currentStreak={7} // Demo value
            />
            
            <HydrationTracker
              currentMl={hydration}
              targetMl={2500}
              onAddWater={handleAddWater}
            />
            
            <MovementReminder
              isWorkBlock={currentBlock?.isWorkBlock || false}
              onComplete={handleMovementComplete}
              squatsCompleted={squatsCompleted}
              stretchesCompleted={stretchesCompleted}
            />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-border px-6 py-3">
        <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>MAGE COMMAND v1.0</span>
          <span>Discipline is the bridge between goals and accomplishment.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;

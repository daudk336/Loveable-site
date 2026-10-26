import { useState, useEffect, useCallback } from 'react';
import { dailySchedule, ScheduleBlock } from '@/data/schedule';

function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function getCurrentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function getSecondsIntoMinute(): number {
  return new Date().getSeconds();
}

export function useScheduleTracker() {
  const [currentBlock, setCurrentBlock] = useState<ScheduleBlock | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<ScheduleBlock | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedBlocks, setCompletedBlocks] = useState<Set<string>>(new Set());

  // Find current block based on time
  const findCurrentBlock = useCallback(() => {
    const currentMinutes = getCurrentMinutes();
    
    for (const block of dailySchedule) {
      const startMinutes = parseTime(block.startTime);
      let endMinutes = parseTime(block.endTime);
      
      // Handle overnight blocks (e.g., 22:15 - 06:00)
      if (endMinutes < startMinutes) {
        if (currentMinutes >= startMinutes || currentMinutes < endMinutes) {
          return block;
        }
      } else {
        if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
          return block;
        }
      }
    }
    
    // Default to first block if no match (for demo purposes)
    return dailySchedule[0];
  }, []);

  // Calculate time remaining and progress
  const updateTimeAndProgress = useCallback((block: ScheduleBlock) => {
    const currentMinutes = getCurrentMinutes();
    const currentSeconds = getSecondsIntoMinute();
    const startMinutes = parseTime(block.startTime);
    let endMinutes = parseTime(block.endTime);
    
    // Handle overnight blocks
    if (endMinutes < startMinutes) {
      if (currentMinutes >= startMinutes) {
        endMinutes += 24 * 60;
      } else {
        endMinutes += 24 * 60;
      }
    }
    
    const totalDuration = (endMinutes - startMinutes) * 60; // in seconds
    const elapsed = (currentMinutes - startMinutes) * 60 + currentSeconds;
    const remaining = Math.max(0, totalDuration - elapsed);
    
    setTimeRemaining(remaining);
    setProgress(Math.min(100, (elapsed / totalDuration) * 100));
  }, []);

  // Mark block as complete
  const markBlockComplete = useCallback((blockId: string) => {
    setCompletedBlocks(prev => {
      const newSet = new Set(prev);
      newSet.add(blockId);
      return newSet;
    });
  }, []);

  // Update every second
  useEffect(() => {
    const updateSchedule = () => {
      const block = findCurrentBlock();
      setCurrentBlock(block);
      
      // Auto-select current block if nothing selected
      if (!selectedBlock) {
        setSelectedBlock(block);
      }
      
      if (block) {
        updateTimeAndProgress(block);
      }
    };

    updateSchedule();
    const interval = setInterval(updateSchedule, 1000);

    return () => clearInterval(interval);
  }, [findCurrentBlock, updateTimeAndProgress, selectedBlock]);

  // Auto-complete previous blocks
  useEffect(() => {
    if (currentBlock) {
      const currentIndex = dailySchedule.findIndex(b => b.id === currentBlock.id);
      const newCompleted = new Set(completedBlocks);
      
      for (let i = 0; i < currentIndex; i++) {
        newCompleted.add(dailySchedule[i].id);
      }
      
      setCompletedBlocks(newCompleted);
    }
  }, [currentBlock]);

  return {
    schedule: dailySchedule,
    currentBlock,
    selectedBlock,
    setSelectedBlock,
    timeRemaining,
    progress,
    completedBlocks,
    markBlockComplete,
  };
}

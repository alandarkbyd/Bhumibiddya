import { useState, useEffect } from 'react';

export interface ProgressState {
  completedDays: number[];
  completedQuizzes: Record<number, boolean>; // day -> true/false
  completedChecklists: string[]; // checklist item ids
  examScore: number | null;
  examPassed: boolean;
}

const STORAGE_KEY = 'bhumibiddya_progress_v1';

const defaultState: ProgressState = {
  completedDays: [],
  completedQuizzes: {},
  completedChecklists: [],
  examScore: null,
  examPassed: false,
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  const toggleDayComplete = (day: number) => {
    setProgress(prev => {
      const exists = prev.completedDays.includes(day);
      const newDays = exists 
        ? prev.completedDays.filter(d => d !== day)
        : [...prev.completedDays, day];
      return { ...prev, completedDays: newDays };
    });
  };

  const markQuizComplete = (day: number) => {
    setProgress(prev => ({
      ...prev,
      completedQuizzes: { ...prev.completedQuizzes, [day]: true }
    }));
  };

  const toggleChecklist = (id: string) => {
    setProgress(prev => {
      const exists = prev.completedChecklists.includes(id);
      const newChecklists = exists
        ? prev.completedChecklists.filter(item => item !== id)
        : [...prev.completedChecklists, id];
      return { ...prev, completedChecklists: newChecklists };
    });
  };

  const setExamResult = (score: number, passed: boolean) => {
    setProgress(prev => ({
      ...prev,
      examScore: score,
      examPassed: passed
    }));
  };

  const resetProgress = () => {
    setProgress(defaultState);
  };

  const calculateOverallProgress = () => {
    const daysCount = 7;
    const completedDaysWeight = (progress.completedDays.length / daysCount) * 50;
    const completedQuizzesCount = Object.keys(progress.completedQuizzes).length;
    const completedQuizzesWeight = (completedQuizzesCount / daysCount) * 30;
    const examWeight = progress.examPassed ? 20 : 0;

    return Math.min(100, Math.round(completedDaysWeight + completedQuizzesWeight + examWeight));
  };

  return {
    progress,
    toggleDayComplete,
    markQuizComplete,
    toggleChecklist,
    setExamResult,
    resetProgress,
    overallProgressPercentage: calculateOverallProgress(),
  };
}

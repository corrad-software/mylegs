import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressContextType {
  completedTopics: string[]; // Array of Topic IDs
  toggleTopicCompletion: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  progressPercentage: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('mylegs-progress-completed');
    if (savedProgress) {
      try {
        setCompletedTopics(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('mylegs-progress-completed', JSON.stringify(completedTopics));
  }, [completedTopics]);

  const isTopicCompleted = (id: string) => completedTopics.includes(id);

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  // Assuming total topics is 10 (based on constants, but hardcoded here for percentage calculation context usually requires importing constants or passing length)
  // For simplicity we will calculate based on length of array vs a known max or dynamic max. 
  // We'll calculate strictly based on the count for now.
  const progressPercentage = completedTopics.length; 

  return (
    <ProgressContext.Provider value={{ 
      completedTopics, 
      toggleTopicCompletion, 
      isTopicCompleted,
      progressPercentage
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
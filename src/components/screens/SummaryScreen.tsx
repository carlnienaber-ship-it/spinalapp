import React from 'react';
import Header from '../ui/Header';
import Button from '../ui/Button';

interface SummaryScreenProps {
  clockOutTime: Date | null;
  onStartNewShift: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ clockOutTime, onStartNewShift }) => {
  const formattedTime = clockOutTime 
    ? clockOutTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'N/A';
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      <Header 
        title="Shift Complete!" 
        subtitle={`You clocked out at ${formattedTime}.`} 
      />
      <p className="mt-4 text-gray-400">All data has been successfully recorded. Have a great day!</p>
      <div className="w-full max-w-sm mt-10">
        <Button onClick={onStartNewShift}>Start New Shift</Button>
      </div>
    </div>
  );
};

export default SummaryScreen;

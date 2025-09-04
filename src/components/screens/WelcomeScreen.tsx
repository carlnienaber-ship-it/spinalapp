import React from 'react';
import Button from '../ui/Button';
import Header from '../ui/Header';
import { User } from '../../types';

interface WelcomeScreenProps {
  user: User | null;
  onClockIn: () => void;
  onSignOut: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ user, onClockIn, onSignOut }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header title="Bartender's Daily Tasks" subtitle={`Welcome, ${user?.name || 'Bartender'}! Ready to start your shift?`} />
      <div className="w-full max-w-sm mt-10 space-y-4">
        <Button onClick={onClockIn}>Clock In</Button>
        <button 
          onClick={onSignOut}
          className="w-full text-gray-400 hover:text-white text-sm transition-colors"
        >
          Not you? Sign Out
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

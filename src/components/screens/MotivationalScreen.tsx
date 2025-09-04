import React from 'react';
import Button from '../ui/Button';
import Header from '../ui/Header';
import { CORE_VALUES } from '../../constants';

interface MotivationalScreenProps {
  onBeginClosing: () => void;
  onNewStock: () => void;
}

const MotivationalScreen: React.FC<MotivationalScreenProps> = ({ onBeginClosing, onNewStock }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center animate-fade-in">
      <Header title="Have a great shift!" />
      <div className="my-8 p-6 bg-gray-900 border border-gray-800 rounded-lg">
        <h3 className="text-xl font-bold text-blue-400 mb-4" style={{ fontFamily: '"Avenir Next Bold", sans-serif' }}>Our Core Values</h3>
        <ul className="space-y-2 text-gray-300">
          {CORE_VALUES.map(value => <li key={value}>{value}</li>)}
        </ul>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <button 
          onClick={onNewStock} 
          className="w-full text-blue-400 font-bold py-4 px-4 rounded-lg text-xl transition-all duration-300 ease-in-out bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500"
        >
          New Stock Delivery
        </button>
        <Button onClick={onBeginClosing}>Begin Closing Up</Button>
      </div>
    </div>
  );
};

export default MotivationalScreen;

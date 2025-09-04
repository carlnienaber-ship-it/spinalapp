import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${
        checked ? 'bg-blue-600 focus:ring-blue-500' : 'bg-gray-600 focus:ring-gray-500'
      }`}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
          checked ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default Toggle;

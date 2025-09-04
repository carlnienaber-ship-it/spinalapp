import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, ...props }) => {
  const baseClasses = "w-full text-white font-bold py-4 px-4 rounded-lg text-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  const enabledClasses = "bg-green-600 hover:bg-green-700 focus:ring-green-500";
  const disabledClasses = "bg-gray-700 cursor-not-allowed text-gray-400";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

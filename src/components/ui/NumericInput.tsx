import React from 'react';

interface NumericInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  placeholder: string;
  integerOnly?: boolean;
}

const NumericInput: React.FC<NumericInputProps> = ({ value, onChange, placeholder, integerOnly = true }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (rawValue === '') {
        onChange(undefined);
        return;
    }

    const parsedValue = integerOnly ? parseInt(rawValue, 10) : parseFloat(rawValue);
    if (!isNaN(parsedValue)) {
      onChange(parsedValue);
    }
  };

  return (
    <input
      type="number"
      value={value === undefined ? '' : value}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      onWheel={(e) => (e.target as HTMLElement).blur()}
      step={integerOnly ? "1" : "any"}
    />
  );
};

export default NumericInput;

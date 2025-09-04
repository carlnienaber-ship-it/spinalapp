import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight" style={{ fontFamily: '"Avenir Next Bold", sans-serif' }}>
        {title}
      </h1>
      {subtitle && <p className="mt-2 text-lg text-gray-300" style={{ fontFamily: '"Avenir Next", sans-serif' }}>{subtitle}</p>}
    </div>
  );
};

export default Header;


import React from 'react';
import { CubeIcon } from './icons';

interface HeaderProps {
  onReset: () => void;
  showReset: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, showReset }) => {
  return (
    <header className="bg-brand-dark shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <CubeIcon className="w-8 h-8 text-brand-secondary" />
          <h1 className="text-xl md:text-2xl font-bold text-white">
            AI Architectural Synthesis System
          </h1>
        </div>
        {showReset && (
          <button
            onClick={onReset}
            className="bg-brand-secondary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
          >
            Start Over
          </button>
        )}
      </div>
    </header>
  );
};

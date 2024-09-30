import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
        <svg 
          className="w-8 h-8 inline-block mr-2 text-white" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        CodeWarrior
      </div>
    </div>
  );
}

export default Logo;

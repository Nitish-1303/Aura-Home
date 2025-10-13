
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center pb-4 border-b border-gray-700">
      <div>
        <h1 className="text-3xl font-bold text-white">Aura Home</h1>
        <p className="text-gray-400">Your smart home, simplified.</p>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';

interface BottomNavProps {
  theme: string;
  onThemeChange: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const BottomNav = ({
  theme,
  onThemeChange,
  className = '',
  children
}: BottomNavProps) => {
  return (
    <nav className={`
      w-[500px] h-[60px] fixed bottom-0 m-3.5 rounded-2xl p-4
      flex flex-col items-center content-between
      border-[1px] border-gray-500
      ${theme === 'black' ? 'bg-white' : 'bg-zinc-950'}
      ${className}
    `}>
      <button
        onClick={onThemeChange}
        className="px-4 py-2 rounded-lg hover:bg-opacity-20 transition-colors
        ${theme === 'black' ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-black'}"
      >
        {theme === 'black' ? '☀️ Tema Claro' : '🌙 Tema Escuro'}
      </button>
      {children}
    </nav>
  );
};
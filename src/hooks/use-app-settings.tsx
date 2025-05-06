import { useState, useEffect } from 'react';
import { FontSize, Theme } from '../types/app.d';

export const useAppSettings = () => {
  const [fontSize, setFontSize] = useState<FontSize>('text-sm');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const savedFontSize = localStorage.getItem('fontSize') as FontSize | null;

      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      }

      if (savedFontSize) {
        setFontSize(savedFontSize);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const increaseFontSize = () => {
    setFontSize('text-lg');
    localStorage.setItem('fontSize', 'text-lg');
  };

  const decreaseFontSize = () => {
    setFontSize('text-sm');
    localStorage.setItem('fontSize', 'text-sm');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  return {
    fontSize,
    theme,
    increaseFontSize,
    decreaseFontSize,
    toggleTheme,
  };
};
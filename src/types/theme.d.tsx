export type Theme = 'dark' | 'light';

export interface ThemeButtonProps {
    toggleTheme: () => void;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
    fontSize: 'text-sm' | 'text-lg';
}
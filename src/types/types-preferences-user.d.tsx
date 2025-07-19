export type Theme = 'dark' | 'light';

export type FontSize = 'text-sm' | 'text-lg';

export type ThemeButtonProps = {
    toggleTheme: () => void;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
    fontSize: FontSize;
    byStore?: boolean; 
}
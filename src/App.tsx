import { useState } from 'react';
import { ToggleThemeAndFont } from './components/toggle-theme-and-font';
import { LoginPage } from './pages/login-page'

function App() {

    type FontSize = 'text-sm' | 'text-lg';

    const [fontSize, setFontSize] = useState<FontSize>('text-sm');

    const increaseFontSize = () => {
        setFontSize('text-lg')
    };

    const decreaseFontSize = () => {
        setFontSize('text-sm')
    }

    const toggleTheme = () => {
        const html = document.documentElement;

        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
        } else {
            html.classList.add('dark')
        }
    }


    return (
        <div className={`${fontSize} w-screen h-screen`}>
            <LoginPage />
            <ToggleThemeAndFont
                toggleTheme={toggleTheme}
                fontSize={fontSize}
                increaseFontSize={increaseFontSize}
                decreaseFontSize={decreaseFontSize}

            />
        </div>
    )
}

export default App

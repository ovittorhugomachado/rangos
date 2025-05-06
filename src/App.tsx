import { ToggleThemeAndFont } from './components/toggle-theme-and-font';
import { LoginPage } from './pages/login-page';
import { useAppSettings } from './hooks/use-app-settings';

function App() {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    toggleTheme,
  } = useAppSettings();

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
  );
}

export default App;
import { ToggleThemeAndFont } from './components/toggle-theme-and-font';
import { useAppSettings } from './hooks/use-app-settings';
import { RegisterPage } from './pages/register';

function App() {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    toggleTheme,
  } = useAppSettings();

  return (
    <div className={`${fontSize} w-screen h-screen`}>
      <RegisterPage />
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
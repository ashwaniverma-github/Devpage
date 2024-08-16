import { useEffect, useState } from 'react';
import { Switch } from '../ui/switch';

const ThemeController = () => {
  const [theme, setTheme] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('theme')) || 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">Light</span>
      <Switch
        checked={theme === 'dark'}
        onChange={handleThemeChange}
        className="theme-switch"
      />
      <span className="ml-2">Dark</span>
    </div>
  );
};

export default ThemeController;

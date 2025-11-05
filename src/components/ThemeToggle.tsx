import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className={`w-4 h-4 transition-all ${theme === 'light' ? 'text-accent scale-100' : 'text-muted-foreground scale-75'}`} />
      <div className="relative w-10 h-5 bg-border rounded-full transition-colors">
        <div 
          className={`absolute top-0.5 w-4 h-4 bg-accent rounded-full transition-transform duration-300 ${
            theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </div>
      <Moon className={`w-4 h-4 transition-all ${theme === 'dark' ? 'text-accent scale-100' : 'text-muted-foreground scale-75'}`} />
    </button>
  );
};

export default ThemeToggle;

import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Donkere modus"
      aria-pressed={dark}
    >
      <Sun className={`w-4 h-4 transition-all ${!dark ? "text-accent scale-100" : "text-muted-foreground scale-75"}`} aria-hidden="true" />
      <span className="relative w-10 h-5 bg-border rounded-full" aria-hidden="true">
        <span className={`absolute top-0.5 w-4 h-4 bg-accent rounded-full transition-transform duration-300 ${dark ? "translate-x-5" : "translate-x-0.5"}`} />
      </span>
      <Moon className={`w-4 h-4 transition-all ${dark ? "text-accent scale-100" : "text-muted-foreground scale-75"}`} aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;

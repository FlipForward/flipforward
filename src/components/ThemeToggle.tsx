import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

/** Eén ronde knop: toont het icoon van de modus waar je naartoe schakelt. */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={dark ? "Schakel naar lichte modus" : "Schakel naar donkere modus"}
      title={dark ? "Lichte modus" : "Donkere modus"}
    >
      {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;

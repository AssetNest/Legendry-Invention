import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle between 'light' and 'dark' theme
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button variant="ghost" size="icon" className="relative h-[100%] w-32 px-2 group hover:bg-transparent glow-bottom-border" onClick={toggleTheme}>
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-full transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-full transition-all" />
      )}
      <p className="mx-2 group-hover:text-primary group-hover:text-shadow-primary-glow">{theme} mode</p>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
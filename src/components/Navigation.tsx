import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-auto text-foreground" />
            <span className="text-xl font-bold text-foreground">FlipForward</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("about")} className="text-foreground">
              {t("nav.about")}
            </button>
            <button onClick={() => scrollToSection("services")} className="text-foreground">
              {t("nav.services")}
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-foreground">
              {t("nav.portfolio")}
            </button>
            <ThemeToggle />
            <LanguageSwitcher />
            <Button variant="hero" size="default" onClick={() => scrollToSection("contact")}>
              {t("nav.getStarted")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("about")} className="text-foreground text-left">
                {t("nav.about")}
              </button>
              <button onClick={() => scrollToSection("services")} className="text-foreground text-left">
                {t("nav.services")}
              </button>
              <button onClick={() => scrollToSection("portfolio")} className="text-foreground text-left">
                {t("nav.portfolio")}
              </button>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <Button variant="hero" size="default" onClick={() => scrollToSection("contact")} className="w-full">
                {t("nav.getStarted")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

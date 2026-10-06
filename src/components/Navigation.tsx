import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { id: "over", label: "Over" },
  { id: "diensten", label: "Diensten" },
  { id: "pakketten", label: "Pakketten" },
  { id: "werkwijze", label: "Werkwijze" },
  { id: "portfolio", label: "Portfolio" },
  { id: "faq", label: "FAQ" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  // Op subpagina's linken de ankers terug naar de homepage.
  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);
  const close = () => setIsOpen(false);

  const linkClass =
    "text-sm text-muted-foreground hover:text-foreground transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Naar de inhoud
      </a>
      <nav aria-label="Hoofdmenu" className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="FlipForward – naar de homepage">
            <Logo className="h-8 w-auto text-foreground" />
            <span className="text-xl font-bold text-foreground">FlipForward</span>
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            <ul className="flex items-center gap-5">
              {links.map((l) => (
                <li key={l.id}>
                  <a href={href(l.id)} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="sm">
              <a href={href("contact")}>Contact</a>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden text-foreground p-2 -mr-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setIsOpen((o) => !o)}
            aria-expanded={isOpen}
            aria-controls="mobiel-menu"
            aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <div id="mobiel-menu" className="lg:hidden mt-4 pb-4 animate-fade-in">
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.id}>
                  <a href={href(l.id)} onClick={close} className="block text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" className="mt-4 w-full">
              <a href={href("contact")} onClick={close}>
                Contact
              </a>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;

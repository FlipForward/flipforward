import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Magnetic from "./motion/Magnetic";

const links = [
  { id: "portfolio", label: "Werk" },
  { id: "pakketten", label: "Prijzen" },
  { id: "werkwijze", label: "Werkwijze" },
  { id: "faq", label: "Vragen" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  // Op subpagina's linken de ankers terug naar de homepage.
  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);
  const close = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Naar de inhoud
      </a>
      <nav aria-label="Hoofdmenu" className="wrap">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="flex items-center gap-2.5 rounded" aria-label="FlipForward, naar de homepage">
            <Logo className="h-6 w-auto text-primary" />
            <span className="text-lg font-medium tracking-[-0.01em] text-foreground">FlipForward</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-8">
              {links.map((l) => (
                <li key={l.id}>
                  <Magnetic strength={0.25}>
                    <a href={href(l.id)} className="ff-link rounded py-1 text-[15px] text-foreground">
                      {l.label}
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
            <Magnetic>
              <a href={href("contact")} className="ff-btn ff-btn-ink h-11 px-5 text-[15px]">
                Contact
              </a>
            </Magnetic>
          </div>

          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
            onClick={() => setIsOpen((o) => !o)}
            aria-expanded={isOpen}
            aria-controls="mobiel-menu"
            aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <div id="mobiel-menu" className="animate-fade-only pb-6 lg:hidden">
            <ul className="border-t border-border">
              {links.map((l) => (
                <li key={l.id} className="border-b border-border">
                  <a href={href(l.id)} onClick={close} className="block py-4 text-2xl tracking-[-0.02em] text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href={href("contact")} onClick={close} className="ff-btn ff-btn-primary mt-6 w-full">
              Contact
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;

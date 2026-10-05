import { useState, useEffect } from "react";
import { LucideIcon, Store, Building2, Coffee, Scissors, Wrench, Briefcase, Users } from "lucide-react";

interface Idea {
  text: string;
  icon: LucideIcon;
}

const ideas: Idea[] = [
  { text: "Website voor je zaak", icon: Store },
  { text: "B2B-catalogus", icon: Building2 },
  { text: "Horecazaak", icon: Coffee },
  { text: "Kapsalon", icon: Scissors },
  { text: "Vakman of aannemer", icon: Wrench },
  { text: "Dienstverlener", icon: Briefcase },
  { text: "Vacaturepagina", icon: Users },
];

/** Decoratief: verborgen voor schermlezers, stilstaand bij 'reduced motion'. */
const TypingAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const CurrentIcon = ideas[currentIndex].icon;
  const fullText = ideas[currentIndex].text;

  useEffect(() => {
    if (reduced) {
      setDisplayedText(fullText);
      const t = setTimeout(() => setCurrentIndex((p) => (p + 1) % ideas.length), 3000);
      return () => clearTimeout(t);
    }

    if (!isDeleting && displayedText === fullText) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentIndex((p) => (p + 1) % ideas.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplayedText(
        isDeleting ? fullText.substring(0, displayedText.length - 1) : fullText.substring(0, displayedText.length + 1),
      );
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(t);
  }, [displayedText, isDeleting, fullText, reduced]);

  return (
    <div
      aria-hidden="true"
      className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8 min-h-[2.25rem]"
    >
      <div className="relative w-4 h-4 flex-shrink-0">
        <CurrentIcon key={currentIndex} className="w-4 h-4 text-accent absolute inset-0 animate-fade-only" />
      </div>
      <span className="text-sm text-accent font-medium whitespace-nowrap">
        {displayedText}
        {!reduced && <span className="animate-pulse">|</span>}
      </span>
    </div>
  );
};

export default TypingAnimation;

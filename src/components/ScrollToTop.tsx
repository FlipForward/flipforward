import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Scrolt naar boven; zacht, behalve als de bezoeker "minder beweging" vraagt. Ook gebruikt door het logo in de nav. */
export const scrollToTop = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
};

/**
 * Knop rechtsonder die pas verschijnt na een schermhoogte scrollen. Onzichtbaar = ook niet bereikbaar met Tab.
 * Staat boven de veilige zone van de gsm (home-balk) en verdwijnt zolang een formulier in beeld is, zodat hij geen velden afdekt.
 */
const ScrollToTop = () => {
  const [scrolled, setScrolled] = useState(false);
  const [overForm, setOverForm] = useState(false);
  const visible = scrolled && !overForm;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const form = document.querySelector("main form");
    const io = form ? new IntersectionObserver(([e]) => setOverForm(e.isIntersecting)) : null;
    if (form && io) io.observe(form);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Terug naar boven"
      tabIndex={visible ? 0 : -1}
      className={`ff-btn ff-btn-primary fixed right-4 z-40 h-12 w-12 px-0 shadow-[0_1px_2px_hsl(240_6%_10%/0.2)] transition-[opacity,transform] duration-300 [transition-timing-function:var(--ease-out)] sm:right-8 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;

import { useEffect, useRef, useState, type ReactNode } from "react";
import { OldSite, NewSite } from "./FlipShowcase";

/**
 * Hero-variant: gecentreerde titel, daaronder een brede browser die omdraait terwijl je scrolt.
 * De sectie is hoger dan het scherm; de inhoud blijft "sticky" en de scrollvoortgang stuurt de rotatie.
 */
const ScrollFlipHero = ({ text }: { text: ReactNode }) => {
  const section = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [gap, setGap] = useState(0);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = section.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        setP(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, total))));
      });
    };
    // hoeveel de inhoud omhoog moet zodat de browser verticaal gecentreerd eindigt
    const measure = () => {
      const th = textRef.current?.offsetHeight ?? 0;
      const ch = cardRef.current?.offsetHeight ?? 0;
      setGap(th + 32 - Math.max(0, (window.innerHeight - 112 - ch) / 2));
      onScroll();
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // rotatie gebeurt tussen 15% en 75% van de scroll
  const f = Math.min(1, Math.max(0, (p - 0.15) / 0.6));
  const eased = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
  const angle = eased * 180;
  const scale = 0.86 + 0.14 * Math.min(1, p / 0.5);
  const flipped = angle > 90;
  // tekst schuift weg zodat de browser naar het midden van het scherm komt
  const t = Math.min(1, p / 0.3);
  const shift = t * gap;

  return (
    <section id="hero" ref={section} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden px-4 pt-28 sm:px-6">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-96 w-full -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl pointer-events-none opacity-0 dark:opacity-100" />
        <div className="relative z-10 w-full flex flex-col items-center" style={{ transform: `translateY(${-shift}px)` }}>
        <div ref={textRef} className="max-w-3xl text-center" style={{ opacity: 1 - t, pointerEvents: t > 0.8 ? "none" : undefined }}>
          {text}
        </div>


        <div ref={cardRef} className="relative z-10 mt-8 w-full max-w-4xl [perspective:2000px]">
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-[3rem] blur-3xl bg-[radial-gradient(ellipse_at_center,hsl(10_89%_50%/0.35),transparent_70%)] transition-opacity duration-500"
            style={{ opacity: 0.25 + eased * 0.75 }}
          />
          <div className="relative mx-auto aspect-[16/8] w-full [container-type:inline-size]" style={{ transform: `scale(${scale})` }}>
            {reduced ? (
              <>
                <div className={`absolute inset-0 transition-opacity duration-500 ${flipped ? "opacity-0" : "opacity-100"}`}>
                  <OldSite plain />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-500 ${flipped ? "opacity-100" : "opacity-0"}`}>
                  <NewSite plain />
                </div>
              </>
            ) : (
              <div className="relative h-full w-full [transform-style:preserve-3d]" style={{ transform: `rotateY(${angle}deg)` }}>
                <OldSite />
                <NewSite />
              </div>
            )}
          </div>
          <p className="relative mt-4 text-center text-sm text-muted-foreground transition-opacity" style={{ opacity: 1 - eased }}>
            Scroll om je site te flippen ↓
          </p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollFlipHero;

import { useEffect, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { OldSite, NewSite } from "./FlipShowcase";

/**
 * Voor/na-slider: de oude site ligt over de nieuwe en je sleept de scheidingslijn.
 * Een (onzichtbare) range-input doet het slepen en maakt het toetsenbordbedienbaar.
 * Bij het in beeld komen schuift de lijn eenmalig van rechts naar het midden.
 */
const BeforeAfter = () => {
  const [pos, setPos] = useState(88);
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) return setPos(50);
        // eenvoudige ease-out animatie van 88% naar 42%
        const start = performance.now();
        const from = 88,
          to = 42,
          dur = 1400;
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.min(1, (now - start - 500) / dur);
          if (t > 0) setPos(from + (to - from) * (1 - Math.pow(1 - t, 3)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className="w-full max-w-[640px] mx-auto">
      <div className="relative">
        <div aria-hidden="true" className="absolute -inset-8 rounded-[2rem] blur-3xl bg-[radial-gradient(ellipse_at_center,hsl(10_89%_50%/0.3),transparent_70%)]" />
        <div className="relative aspect-[16/11] select-none [container-type:inline-size]">
          <NewSite plain />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <OldSite plain />
          </div>

          {/* labels */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white transition-opacity ${pos < 18 ? "opacity-0" : "opacity-100"}`}
          >
            Vroeger
          </span>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white transition-opacity ${pos > 82 ? "opacity-0" : "opacity-100"}`}
          >
            Met FlipForward
          </span>

          {/* scheidingslijn + knop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -translate-x-1/2 w-[3px] bg-white shadow-[0_0_20px_hsl(10_89%_55%/0.9)]" />
            <div
              className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-gradient-accent text-white shadow-glow ring-4 ring-white/90 transition-transform ${
                dragging ? "scale-110" : ""
              }`}
            >
              <ChevronsLeftRight className="h-5 w-5" />
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={pos}
            aria-label="Vergelijk de verouderde en de moderne website"
            aria-valuetext={`${Math.round(pos)}% verouderde website zichtbaar`}
            onChange={(e) => {
              touched.current = true;
              setPos(Number(e.target.value));
            }}
            onPointerDown={() => {
              touched.current = true;
              setDragging(true);
            }}
            onPointerUp={() => setDragging(false)}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-0 peer"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-ring ring-offset-4 ring-offset-background opacity-0 peer-focus-visible:opacity-100" />
        </div>
      </div>
      <p className="mt-5 text-center text-sm text-muted-foreground">Sleep de lijn om te vergelijken</p>
    </div>
  );
};

export default BeforeAfter;

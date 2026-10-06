import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
  /** Tailwind-klasse voor de verhouding van het venster, bv. "aspect-[16/10]". */
  aspect?: string;
  /** Extern gestuurd (bv. hover op de hele case); anders reageert de screenshot op zijn eigen hover. */
  active?: boolean;
}

/**
 * Toont de bovenkant van een volledige-paginascreenshot en scrolt bij hover vloeiend naar onder.
 * Enkel `transform` wordt geanimeerd (GPU), met een afstand in pixels die we meten,
 * zodat er geen layout-herberekening per frame is (dat gaf het "glitchen" met `top`).
 */
const ScrollShot = ({ src, alt, aspect = "aspect-[16/10]", active }: Props) => {
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [dist, setDist] = useState(0);
  const [hover, setHover] = useState(false);

  const measure = useCallback(() => {
    const f = frame.current;
    const i = img.current;
    if (!f || !i || !i.naturalWidth) return;
    const shown = f.clientWidth * (i.naturalHeight / i.naturalWidth);
    setDist(Math.max(0, Math.round(shown - f.clientHeight)));
  }, []);

  useEffect(() => {
    const f = frame.current;
    if (!f) return;
    const ro = new ResizeObserver(measure);
    ro.observe(f);
    if (img.current?.complete) measure();
    return () => ro.disconnect();
  }, [measure]);

  const on = (active ?? hover) && dist > 0;
  // ± 220 px per seconde naar onder, snel terug naar boven
  const duration = on ? Math.min(9000, Math.max(1200, (dist / 220) * 1000)) : 700;

  return (
    <div
      ref={frame}
      className={`relative overflow-hidden ${aspect}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <img
        ref={img}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={measure}
        className="absolute inset-x-0 top-0 w-full select-none [backface-visibility:hidden] motion-reduce:!transition-none"
        style={{
          transform: `translate3d(0, ${on ? -dist : 0}px, 0)`,
          transition: `transform ${duration}ms cubic-bezier(.45,.05,.4,1)`,
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default ScrollShot;

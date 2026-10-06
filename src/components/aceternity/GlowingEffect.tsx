/**
 * Gebaseerd op "Glowing Effect" van Aceternity UI (ui.aceternity.com/components/glowing-effect).
 * Aangepast: oranje/amber verloop in huisstijl, uit bij reduced motion en touch.
 * Gebruik: in een element met `relative` en een border-radius; de rand licht op richting de muis.
 */
import { memo, useCallback, useEffect, useRef } from "react";
import { animate } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  className?: string;
  movementDuration?: number;
  borderWidth?: number;
}

const GRADIENT = `radial-gradient(circle, #ff6a3d 10%, #ff6a3d00 20%),
  radial-gradient(circle at 40% 40%, #ffb347 5%, #ffb34700 15%),
  radial-gradient(circle at 60% 60%, #e8401c 10%, #e8401c00 20%),
  radial-gradient(circle at 40% 60%, #ffd29a 10%, #ffd29a00 20%),
  repeating-conic-gradient(from 236.84deg at 50% 50%, #ff6a3d 0%, #ffb347 5%, #e8401c 10%, #ffd29a 15%, #ff6a3d 20%)`;

export const GlowingEffect = memo(
  ({ blur = 0, inactiveZone = 0.6, proximity = 64, spread = 40, className, movementDuration = 2, borderWidth = 2 }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const last = useRef({ x: 0, y: 0 });
    const frame = useRef(0);

    const handleMove = useCallback(
      (e?: { x: number; y: number }) => {
        if (!ref.current) return;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          const el = ref.current;
          if (!el) return;
          const { left, top, width, height } = el.getBoundingClientRect();
          const mx = e?.x ?? last.current.x;
          const my = e?.y ?? last.current.y;
          if (e) last.current = { x: mx, y: my };
          const cx = left + width / 2;
          const cy = top + height / 2;
          if (Math.hypot(mx - cx, my - cy) < 0.5 * Math.min(width, height) * inactiveZone) {
            el.style.setProperty("--active", "0");
            return;
          }
          const active = mx > left - proximity && mx < left + width + proximity && my > top - proximity && my < top + height + proximity;
          el.style.setProperty("--active", active ? "1" : "0");
          if (!active) return;
          const current = parseFloat(el.style.getPropertyValue("--start")) || 0;
          const target = (180 * Math.atan2(my - cy, mx - cx)) / Math.PI + 90;
          const diff = ((target - current + 180) % 360) - 180;
          animate(current, current + diff, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => el.style.setProperty("--start", String(v)),
          });
        });
      },
      [inactiveZone, proximity, movementDuration],
    );

    useEffect(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
      const onScroll = () => handleMove();
      const onPointer = (e: PointerEvent) => handleMove(e);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.body.addEventListener("pointermove", onPointer, { passive: true });
      return () => {
        cancelAnimationFrame(frame.current);
        window.removeEventListener("scroll", onScroll);
        document.body.removeEventListener("pointermove", onPointer);
      };
    }, [handleMove]);

    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--gradient": GRADIENT,
          } as React.CSSProperties
        }
        className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", blur > 0 && "blur-[var(--blur)]", className)}
      >
        <div
          className={cn(
            "rounded-[inherit]",
            'after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:rounded-[inherit] after:content-[""]',
            "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
            "after:[background:var(--gradient)] after:[background-attachment:fixed]",
            "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
            "after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect]",
            "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]",
          )}
        />
      </div>
    );
  },
);
GlowingEffect.displayName = "GlowingEffect";

/** Kaart met een gloeiende rand rond de inhoud (dubbele rand zoals in de Aceternity-demo). */
export const GlowCard = ({ className, innerClassName, children }: { className?: string; innerClassName?: string; children: React.ReactNode }) => (
  <div className={cn("relative h-full rounded-2xl border border-border p-1.5", className)}>
    <GlowingEffect />
    <div className={cn("relative h-full overflow-hidden rounded-xl border border-border/60 bg-gradient-card", innerClassName)}>{children}</div>
  </div>
);

/**
 * Gebaseerd op "Parallax Hero Images" van Aceternity UI (ui.aceternity.com/components/parallax-hero-images).
 * Aangepast: mini-browserkaders, projectnaam bij hover, klik naar de case of de live site,
 * geen muisvolging bij reduced motion. Op touch-schermen puur decoratief.
 */
import { memo, useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingItem {
  src: string;
  title: string;
  /** "#project-…" (scrollt naar de case) of een externe URL. */
  href?: string;
}

type Pos = "top-left" | "top-right" | "mid-left" | "mid-right" | "bottom-left" | "bottom-right" | "far-left" | "far-right";

const positionStyles: Record<Pos, { top: string; left?: string; right?: string }> = {
  "top-left": { top: "12%", left: "3%" },
  "top-right": { top: "10%", right: "3%" },
  "mid-left": { top: "40%", left: "-2%" },
  "mid-right": { top: "38%", right: "-2%" },
  "bottom-left": { top: "70%", left: "5%" },
  "bottom-right": { top: "70%", right: "5%" },
  "far-left": { top: "85%", left: "24%" },
  "far-right": { top: "-2%", right: "26%" },
};
const order: Pos[] = ["top-left", "top-right", "mid-left", "mid-right", "bottom-left", "bottom-right", "far-left", "far-right"];
const depths = [0.35, 0.4, 0.9, 0.85, 0.45, 0.5, 0.25, 0.2];
const SPRING = { damping: 25, stiffness: 120 };

export const ParallaxHeroImages = ({ items, className }: { items: FloatingItem[]; className?: string }) => {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);

  const placed = useMemo(() => items.slice(0, 8).map((it, i) => ({ ...it, pos: order[i], depth: depths[i], delay: i * 0.12 })), [items]);

  useEffect(() => {
    if (reduced) return;
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, reduced]);

  // Decoratief voor schermlezers: dezelfde projecten staan in het portfolio.
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {placed.map((it, i) => (
        <Img key={it.src + i} {...it} sx={sx} sy={sy} />
      ))}
    </div>
  );
};

const Img = memo(function Img({
  src,
  title,
  href,
  pos,
  depth,
  delay,
  sx,
  sy,
}: FloatingItem & { pos: Pos; depth: number; delay: number; sx: MotionValue<number>; sy: MotionValue<number> }) {
  const [hover, setHover] = useState(false);
  const max = 60;
  const x = useTransform(sx, [-1, 1], [-max * depth, max * depth]);
  const y = useTransform(sy, [-1, 1], [-max * depth, max * depth]);
  const s = positionStyles[pos];
  const internal = href?.startsWith("#");
  const Tag = href ? "a" : "div";

  return (
    <motion.div
      className="absolute"
      style={{ top: s.top, left: s.left, right: s.right, x, y, zIndex: hover ? 30 : Math.round(depth * 10) }}
      initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
      animate={{
        opacity: hover ? 1 : 0.35 + depth * 0.6,
        filter: `blur(${depth < 0.3 && !hover ? 2 : 0}px)`,
        scale: hover ? 1.08 : 1,
      }}
      transition={{ duration: hover ? 0.25 : 0.8, delay: hover ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Tag
        {...(href ? { href, tabIndex: -1, ...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" }) } : {})}
        onPointerEnter={(e: React.PointerEvent) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="block md:pointer-events-auto"
      >
        <div
          className={cn(
            "overflow-hidden rounded-lg border bg-[hsl(222_40%_9%)] shadow-2xl transition-[border-color,box-shadow] duration-300",
            hover ? "border-accent/70 shadow-[0_0_40px_hsl(10_89%_55%/0.35)]" : "border-white/10",
          )}
          style={{ width: `calc(${8 + depth * 12}rem)` }}
        >
          <div className="flex gap-1 border-b border-white/10 px-2 py-1">
            <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
          </div>
          <img src={src} alt="" className="aspect-[16/10] w-full object-cover object-top" />
        </div>
        <span
          className={cn(
            "absolute left-1/2 top-full mt-2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-lg backdrop-blur transition-all duration-200",
            hover ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
          )}
        >
          {title}
          {href && (internal ? <ArrowDown className="h-3 w-3 text-accent" /> : <ArrowUpRight className="h-3 w-3 text-accent" />)}
        </span>
      </Tag>
    </motion.div>
  );
});

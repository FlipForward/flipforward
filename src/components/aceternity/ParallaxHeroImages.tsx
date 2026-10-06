/**
 * Gebaseerd op "Parallax Hero Images" van Aceternity UI (ui.aceternity.com/components/parallax-hero-images).
 * Aangepast: mini-browserkaders, geen muisvolging bij reduced motion.
 */
import { memo, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

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

export const ParallaxHeroImages = ({ images, className }: { images: string[]; className?: string }) => {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);

  const items = useMemo(() => images.slice(0, 8).map((src, i) => ({ src, pos: order[i], depth: depths[i], delay: i * 0.12 })), [images]);

  useEffect(() => {
    if (reduced) return;
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, reduced]);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {items.map((it, i) => (
        <Img key={it.src + i} {...it} sx={sx} sy={sy} />
      ))}
    </div>
  );
};

const Img = memo(function Img({
  src,
  pos,
  depth,
  delay,
  sx,
  sy,
}: {
  src: string;
  pos: Pos;
  depth: number;
  delay: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const max = 60;
  const x = useTransform(sx, [-1, 1], [-max * depth, max * depth]);
  const y = useTransform(sy, [-1, 1], [-max * depth, max * depth]);
  const s = positionStyles[pos];
  return (
    <motion.div
      className="absolute"
      style={{ top: s.top, left: s.left, right: s.right, x, y, zIndex: Math.round(depth * 10) }}
      initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
      animate={{ opacity: 0.35 + depth * 0.6, filter: `blur(${depth < 0.3 ? 2 : 0}px)`, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[hsl(222_40%_9%)] shadow-2xl" style={{ width: `calc(${8 + depth * 12}rem)` }}>
        <div className="flex gap-1 border-b border-white/10 px-2 py-1">
          <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
        </div>
        <img src={src} alt="" className="aspect-[16/10] w-full object-cover object-top" />
      </div>
    </motion.div>
  );
});

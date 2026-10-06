/**
 * Gebaseerd op "Comet Card" van Aceternity UI (ui.aceternity.com/components/comet-card).
 * Aangepast: zachtere glans, geen tilt bij reduced motion of touch.
 */
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x);
  const sy = useSpring(y);

  const rotateX = useTransform(sy, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
  const translateX = useTransform(sx, [-0.5, 0.5], [`-${translateDepth}px`, `${translateDepth}px`]);
  const translateY = useTransform(sy, [-0.5, 0.5], [`${translateDepth}px`, `-${translateDepth}px`]);
  const glareX = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 10%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0) 70%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className={cn("[perspective:1200px] [transform-style:preserve-3d]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX, rotateY, translateX, translateY }}
        whileHover={reduced ? undefined : { scale: 1.015, transition: { duration: 0.2 } }}
        className="group/case relative h-full rounded-2xl shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]"
      >
        {children}
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-50 rounded-2xl opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover/case:opacity-100" style={{ background: glare }} />
      </motion.div>
    </div>
  );
};

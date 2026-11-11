import { useRef, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Rollende tekstband. Loopt vanzelf, versnelt mee met het scrollen en keert om als je terug omhoog scrolt.
 * Decoratief: de inhoud staat er twee keer in en is verborgen voor schermlezers (zet de tekst er apart bij als sr-only).
 */
const Marquee = ({ children, speed = 3, className }: { children: ReactNode; speed?: number; className?: string }) => {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) dir.current = 1;
    else if (f > 0) dir.current = -1;
    const step = dir.current * speed * (Math.min(delta, 64) / 1000);
    baseX.set(baseX.get() + step + step * Math.abs(f));
  });

  return (
    <div aria-hidden="true" className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  );
};

export default Marquee;

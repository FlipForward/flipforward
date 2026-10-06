/**
 * Gebaseerd op "Spotlight New" van Aceternity UI (ui.aceternity.com/components/spotlight-new).
 * Aangepast: oranje lichtbundels in huisstijl, stil bij reduced motion.
 */
import { motion, useReducedMotion } from "motion/react";

const g1 = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(14, 95%, 70%, .10) 0, hsla(10, 89%, 55%, .03) 50%, hsla(10, 89%, 45%, 0) 80%)";
const g2 = "radial-gradient(50% 50% at 50% 50%, hsla(14, 95%, 70%, .07) 0, hsla(10, 89%, 55%, .02) 80%, transparent 100%)";
const g3 = "radial-gradient(50% 50% at 50% 50%, hsla(14, 95%, 70%, .05) 0, hsla(10, 89%, 45%, .02) 80%, transparent 100%)";

const Beam = ({ side, reduced }: { side: "left" | "right"; reduced: boolean | null }) => {
  const s = side === "left" ? 1 : -1;
  const pos = side === "left" ? "left-0" : "right-0";
  const origin = side === "left" ? "origin-top-left" : "origin-top-right";
  return (
    <motion.div
      animate={reduced ? undefined : { x: [0, 100 * s, 0] }}
      transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className={`pointer-events-none absolute top-0 ${pos} h-screen w-screen`}
    >
      <div style={{ transform: `translateY(-350px) rotate(${-45 * s}deg)`, background: g1, width: 560, height: 1380 }} className={`absolute top-0 ${pos}`} />
      <div style={{ transform: `rotate(${-45 * s}deg) translate(${5 * s}%, -50%)`, background: g2, width: 240, height: 1380 }} className={`absolute top-0 ${pos} ${origin}`} />
      <div style={{ transform: `rotate(${-45 * s}deg) translate(${-180 * s}%, -70%)`, background: g3, width: 240, height: 1380 }} className={`absolute top-0 ${pos} ${origin}`} />
    </motion.div>
  );
};

export const Spotlight = () => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
    >
      <Beam side="left" reduced={reduced} />
      <Beam side="right" reduced={reduced} />
    </motion.div>
  );
};

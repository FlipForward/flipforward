/**
 * Gebaseerd op "Container Scroll Animation" van Aceternity UI (ui.aceternity.com/components/container-scroll-animation).
 * Aangepast: donkere kader in huisstijl, oranje gloed, sectie als hero.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "motion/react";

export const ContainerScroll = ({ titleComponent, children }: { titleComponent: ReactNode; children: ReactNode }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="hero" ref={containerRef} className="relative flex h-[64rem] items-center justify-center p-2 pt-24 md:h-[84rem] md:p-20 md:pt-32">
      <div className="relative w-full py-10 md:py-40" style={{ perspective: "1000px" }}>
        <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
          {titleComponent}
        </motion.div>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </section>
  );
};

const Card = ({ rotate, scale, children }: { rotate: MotionValue<number>; scale: MotionValue<number>; children: ReactNode }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 0 120px hsl(10 89% 50% / 0.25)",
    }}
    className="mx-auto mt-10 h-[26rem] w-full max-w-5xl rounded-[30px] border-4 border-white/15 bg-[hsl(222_30%_12%)] p-2 md:mt-12 md:h-[40rem] md:p-5"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-[hsl(222_40%_6%)]">{children}</div>
  </motion.div>
);

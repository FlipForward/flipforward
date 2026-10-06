/**
 * Gebaseerd op "Hero Parallax" van Aceternity UI (ui.aceternity.com/components/hero-parallax).
 * Aangepast: eigen header, projectscreenshots in een mini-browserkader, kleinere kaarten op mobiel.
 */
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import type { ShowcaseItem } from "@/lib/showcase";

export const HeroParallax = ({ products, header }: { products: ShowcaseItem[]; header: ReactNode }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.25, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-600, 300]), springConfig);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[260vh] flex-col overflow-hidden py-32 antialiased [perspective:1000px] [transform-style:preserve-3d] sm:py-40"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-x-40 -inset-y-24 bg-[radial-gradient(ellipse_at_30%_50%,hsl(var(--background))_35%,hsl(var(--background)/0.7)_55%,transparent_75%)]" />
        <div className="relative">{header}</div>
      </div>
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }} aria-hidden="true">
        <motion.div className="mb-10 flex flex-row-reverse gap-6 sm:mb-16 sm:gap-12">
          {firstRow.map((p, i) => (
            <ProductCard product={p} translate={translateX} key={p.title + i} />
          ))}
        </motion.div>
        <motion.div className="mb-10 flex flex-row gap-6 sm:mb-16 sm:gap-12">
          {secondRow.map((p, i) => (
            <ProductCard product={p} translate={translateXReverse} key={p.title + i} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse gap-6 sm:gap-12">
          {thirdRow.map((p, i) => (
            <ProductCard product={p} translate={translateX} key={p.title + i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export const ProductCard = ({ product, translate }: { product: ShowcaseItem; translate: MotionValue<number> }) => {
  const Tag = product.link ? "a" : "div";
  return (
    <motion.div style={{ x: translate }} whileHover={{ y: -20 }} className="group/product relative h-44 w-72 shrink-0 sm:h-72 sm:w-[26rem] lg:h-80 lg:w-[30rem]">
      <Tag
        {...(product.link ? { href: product.link, target: "_blank", rel: "noopener noreferrer", tabIndex: -1 } : {})}
        className="absolute inset-0 block overflow-hidden rounded-xl border border-white/10 bg-[hsl(222_40%_9%)] shadow-2xl"
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2">
          <i className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <i className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <i className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <img src={product.thumbnail} alt="" loading="eager" decoding="async" className="h-full w-full object-cover object-top" />
      </Tag>
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-black opacity-0 transition-opacity group-hover/product:opacity-70" />
      <h2 className="pointer-events-none absolute bottom-4 left-4 text-lg font-semibold text-white opacity-0 transition-opacity group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
};

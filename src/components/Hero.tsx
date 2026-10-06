import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lock } from "lucide-react";
import HeroCopy from "./hero/HeroCopy";
import { ParallaxHeroImages } from "./aceternity/ParallaxHeroImages";
import { ThreeDMarquee } from "./aceternity/ThreeDMarquee";
import { ContainerScroll } from "./aceternity/ContainerScroll";
import { Spotlight } from "./aceternity/Spotlight";
import { showcase, repeatTo } from "@/lib/showcase";
import { useVariant } from "@/lib/variants";

/** Variant "marquee": tekst links, schuin raster van projecten dat traag beweegt rechts. */
const MarqueeHero = () => (
  <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
    <Spotlight />
    <div className="absolute inset-y-0 right-0 w-full lg:w-[62%] [mask-image:linear-gradient(to_right,transparent,black_35%)] max-lg:opacity-30 max-lg:[mask-image:none]">
      <ThreeDMarquee images={repeatTo(showcase, 24).map((s) => s.thumbnail)} className="h-full w-full" />
    </div>
    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent lg:via-background/40" />
    <div className="container relative z-10 mx-auto px-4 pt-28 pb-20 sm:px-6">
      <HeroCopy />
    </div>
  </section>
);

/** Inhoud van de tablet: projecten die elkaar afwisselen. */
const ProjectSlideshow = () => {
  const items = showcase.slice(0, 3);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % items.length), 3200);
    return () => window.clearInterval(t);
  }, [items.length]);
  const p = items[i];
  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={p.title}
          src={p.thumbnail}
          alt=""
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-sm text-white backdrop-blur">
        <Lock className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
        {p.title}
      </div>
      <div className="absolute bottom-5 right-5 flex gap-1.5" aria-hidden="true">
        {items.map((it, n) => (
          <span key={it.title} className={`h-1.5 rounded-full transition-all duration-500 ${n === i ? "w-6 bg-accent" : "w-1.5 bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
};

/** Variant "zweven": gecentreerde tekst, projecten zweven eromheen en volgen de muis. */
const FloatingHero = () => (
  <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
    <Spotlight />
    <ParallaxHeroImages images={showcase.slice(0, 8).map((s) => s.thumbnail)} className="max-md:opacity-40" />
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--background))_25%,hsl(var(--background)/0.6)_50%,transparent_75%)]" />
    <div className="container relative z-20 mx-auto px-4 pt-28 pb-20 sm:px-6">
      <HeroCopy align="center" />
    </div>
  </section>
);

const Hero = () => {
  const variant = useVariant("hero");

  if (variant === "marquee") return <MarqueeHero />;

  if (variant === "tablet")
    return (
      <div className="relative overflow-hidden">
        <Spotlight />
        <ContainerScroll titleComponent={<HeroCopy align="center" />}>
          <ProjectSlideshow />
        </ContainerScroll>
      </div>
    );

  return <FloatingHero />;
};

export default Hero;

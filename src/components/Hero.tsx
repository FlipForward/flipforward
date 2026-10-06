import HeroCopy from "./hero/HeroCopy";
import { ParallaxHeroImages } from "./aceternity/ParallaxHeroImages";
import { Spotlight } from "./aceternity/Spotlight";
import { showcase } from "@/lib/showcase";

/** Gecentreerde tekst; projectscreenshots zweven eromheen en volgen de muis. */
const Hero = () => (
  <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
    <Spotlight />
    <ParallaxHeroImages images={showcase.slice(0, 8).map((s) => s.thumbnail)} className="max-md:opacity-25" />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--background))_25%,hsl(var(--background)/0.6)_50%,transparent_75%)]"
    />
    <div className="container relative z-20 mx-auto px-4 pb-20 pt-28 sm:px-6">
      <HeroCopy align="center" />
    </div>
  </section>
);

export default Hero;

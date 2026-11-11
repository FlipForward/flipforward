import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Reveal from "./motion/Reveal";
import { projectAnchor } from "@/lib/showcase";
import finnThumb from "@/assets/portfolio/finn-thumb.webp";
import driverdashThumb from "@/assets/portfolio/driverdash-thumb.webp";
import bavagoThumb from "@/assets/portfolio/bavago-thumb.webp";
import groundfieldThumb from "@/assets/portfolio/groundfield-thumb.webp";

/**
 * Cases bevatten enkel feiten die op de projectsites zelf staan. Geen verzonnen cijfers.
 * Nieuwe klantcases pas toevoegen na akkoord van de klant.
 * Beelden: src/assets/portfolio/*-thumb.webp (800×600).
 */
interface Project {
  title: string;
  category: string;
  text: string;
  link: string;
  /** Bovenkant van de site, 800×600 (uit de volledige screenshot gesneden met ffmpeg). */
  thumb: string;
}

const projects: Project[] = [
  {
    title: "Bavago",
    category: "Website · hydraulica en machinaal werk",
    text: "Een atelier in Herentals met zeven specialiteiten, de merken die ze herstellen, vacatures en een aanvraagformulier waar klanten een foto van het typeplaatje bij steken.",
    link: "https://bavago.be",
    thumb: bavagoThumb,
  },
  {
    title: "Ground Field",
    category: "Website · SHEQ-consultancy",
    text: "Een Engelstalige website voor een bureau in SHEQ-project- en interimmanagement, met de diensten, de sectoren en een track record in verschillende landen.",
    link: "https://groundfield.flipforward.be",
    thumb: groundfieldThumb,
  },
  {
    title: "DriverDash",
    category: "Eigen project · webapp",
    text: "Een webapp waarin chauffeurs een rit invoeren en meteen hun loon zien: uren, overuren, nachttoeslag en kilometervergoeding.",
    link: "https://driverdash.be",
    thumb: driverdashThumb,
  },
  {
    title: "finnvangronsveld.be",
    category: "Eigen project · portfolio",
    text: "Mijn eigen portfolio als ruimtereis: elke sectie is een planeet, met overgangen tussen de pagina's.",
    link: "https://finnvangronsveld.be",
    thumb: finnThumb,
  },
];

const Portfolio = () => {
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !list.current) return;
    const r = list.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="scroll-mt-20 pb-16 sm:pb-28">
      <div className="wrap">
        <Reveal className="flex items-end justify-between gap-6 pb-8 sm:pb-12">
          <h2 id="portfolio-title" className="h-section">
            Werk
          </h2>
          <p className="num pb-1 text-muted-foreground sm:pb-2 sm:text-lg">{String(projects.length).padStart(2, "0")} projecten</p>
        </Reveal>

        {/* Desktop: lijst met een voorbeeld dat de muis volgt */}
        <ul ref={list} onPointerMove={move} onPointerLeave={() => setActive(null)} className="relative hidden border-t border-border lg:block">
          {projects.map((p, i) => (
            <li key={p.title} id={projectAnchor(p.title)} className="scroll-mt-24 border-b border-border">
              <a
                href={p.link}
                target="_blank"
                rel="noopener"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(null)}
                className="group grid grid-cols-[4rem_1.1fr_1fr_auto] items-center gap-8 py-9 transition-[padding,opacity] duration-500 [transition-timing-function:var(--ease-out)] hover:px-4"
                style={{ opacity: active === null || active === i ? 1 : 0.4 }}
              >
                <span className="num text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">{p.title}</span>
                <span className="text-muted-foreground">
                  <span className="block text-foreground">{p.category}</span>
                  <span className="mt-1 block max-w-[34rem] text-[15px] leading-relaxed">{p.text}</span>
                </span>
                <ArrowUpRight className="h-6 w-6 transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                <span className="sr-only">(opent de site in een nieuw tabblad)</span>
              </a>
            </li>
          ))}

          <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            animate={{ scale: active === null ? 0 : 1, opacity: active === null ? 0 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            initial={false}
            className="pointer-events-none absolute left-0 top-0 z-10 -ml-[13rem] -mt-[9rem] h-[18rem] w-[26rem] overflow-hidden rounded-2xl bg-muted"
          >
            <div
              className="h-full w-full transition-transform duration-500 [transition-timing-function:var(--ease-out)]"
              style={{ transform: `translateY(-${(active ?? 0) * 100}%)` }}
            >
              {projects.map((p) => (
                <img key={p.title} src={p.thumb} alt="" width={800} height={600} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
              ))}
            </div>
          </motion.div>
        </ul>

        {/* Gsm en tablet: kaarten om door te swipen */}
        <ul className="snap-row -mx-4 px-4 sm:-mx-8 sm:px-8 lg:hidden">
          {projects.map((p, i) => (
            <li key={p.title} className="w-[82vw] max-w-[26rem] shrink-0 snap-center">
              <a href={p.link} target="_blank" rel="noopener" className="block">
                <img src={p.thumb} alt="" width={800} height={600} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-2xl bg-muted object-cover object-top" />
                <span className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="text-2xl tracking-[-0.02em]">{p.title}</span>
                  <span className="num text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="mt-1 block text-[15px] text-muted-foreground">{p.category}</span>
                <span className="sr-only">(opent de site in een nieuw tabblad)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Portfolio;

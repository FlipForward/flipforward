import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import ScrollShot from "./ScrollShot";
import { CometCard } from "./aceternity/CometCard";
import { projectAnchor } from "@/lib/showcase";
import finnDesktop from "@/assets/portfolio/finn-desktop.webp";
import finnMobile from "@/assets/portfolio/finn-mobile.webp";
import driverdashDesktop from "@/assets/portfolio/driverdash-desktop.webp";
import driverdashMobile from "@/assets/portfolio/driverdash-mobile.webp";
import flippyDesktop from "@/assets/portfolio/flippy-desktop.webp";
import flippyMobile from "@/assets/portfolio/flippy-mobile.webp";
import atlazDesktop from "@/assets/portfolio/atlaz-desktop.webp";
import atlazMobile from "@/assets/portfolio/atlaz-mobile.webp";
import petPhone from "@/assets/portfolio/flippy-pets/phone.png";
import petFrog from "@/assets/portfolio/flippy-pets/frog.png";
import petPancake from "@/assets/portfolio/flippy-pets/pancake.png";
import petClawd from "@/assets/portfolio/flippy-pets/clawd.png";

/**
 * Cases bevatten enkel feiten die op de projectsites zelf staan. Geen verzonnen cijfers.
 * Nieuwe klantcases pas toevoegen na akkoord van de klant.
 * Screenshots: src/assets/portfolio (1200 px breed, volledige pagina; mobiel 390×844 @2x).
 */
interface Project {
  title: string;
  category: string;
  challenge: string;
  solution: string;
  tags: string[];
  link: string;
  domain: string;
  desktop: string;
  mobile: string;
  /** Flippy: figuurtjes piepen achter de kaart uit. */
  peek?: boolean;
}

const projects: Project[] = [
  {
    title: "Flippy",
    category: "Eigen project · desktop-tool",
    challenge: "Een klein, grappig maatje voor op je Windows-bureaublad, met een landingspagina die meteen toont wat hij kan.",
    solution:
      "Een gratis pixel-maatje met vier figuurtjes om uit te kiezen, dat over je taakbalk wandelt, op vensters klimt, meetypt en met popcorn video's kijkt. Met een speelse landingspagina vol echte sprites en een download in twee stappen.",
    tags: ["Pixel art", "Animatie", "Landingspagina"],
    link: "https://flippy.flipforward.be",
    domain: "flippy.flipforward.be",
    desktop: flippyDesktop,
    mobile: flippyMobile,
    peek: true,
  },
  {
    title: "DriverDash",
    category: "Eigen project · webapp",
    challenge: "Chauffeurs wilden hun ritten, uren en verdiensten bijhouden zonder zelf te rekenen.",
    solution:
      "Een webapp waarin je een rit invoert en meteen je loon ziet: normale uren, overuren, nachttoeslag en kilometervergoeding, met statistieken per maand, klant en auto.",
    tags: ["Dashboard", "Statistieken", "Mobiel"],
    link: "https://driverdash.be",
    domain: "driverdash.be",
    desktop: driverdashDesktop,
    mobile: driverdashMobile,
  },
  {
    title: "finnvangronsveld.be",
    category: "Eigen project · portfolio",
    challenge: "Een persoonlijke plek om mijn verhaal en werk te tonen, die je niet snel vergeet.",
    solution:
      "Een interactieve portfolio als ruimtereis: elke sectie is een planeet, met warp-overgangen tussen de pagina's, een planeet-infobord en tekst die vloeiend in beeld komt.",
    tags: ["Interactief", "Animatie", "Storytelling"],
    link: "https://finnvangronsveld.be",
    domain: "finnvangronsveld.be",
    desktop: finnDesktop,
    mobile: finnMobile,
  },
  {
    title: "ATLAZ",
    category: "DJ / producer",
    challenge: "Een DJ en producer had een officiële plek nodig voor zijn muziek en boekingen.",
    solution: "Een website met mixes, aankomende shows en een presskit voor organisatoren.",
    tags: ["Muziek", "Presskit", "Boekingen"],
    link: "https://atlazmusic.be",
    domain: "atlazmusic.be",
    desktop: atlazDesktop,
    mobile: atlazMobile,
  },
];


/* ---------- Bouwstenen ---------- */

const BrowserFrame = ({ p }: { p: Project }) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[hsl(222_40%_9%)] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]">
    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2">
      <span className="flex gap-1.5" aria-hidden="true">
        <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-full bg-white/[0.06] px-3 py-0.5 text-xs text-white/60">
        <Lock className="h-3 w-3 flex-shrink-0 text-emerald-400" aria-hidden="true" />
        {p.domain}
      </span>
    </div>
    <ScrollShot src={p.desktop} alt={`Screenshot van de website ${p.title}`} />
  </div>
);

const PhoneFrame = ({ p }: { p: Project }) => (
  <div className="w-full rounded-[1.6rem] border border-white/15 bg-black p-1.5 shadow-[0_25px_60px_-10px_rgb(0_0_0/0.8)]">
    <div className="relative aspect-[390/844] overflow-hidden rounded-[1.2rem]">
      <img src={p.mobile} alt="" aria-hidden="true" width={390} height={844} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
      <span className="absolute left-1/2 top-1.5 h-3.5 w-14 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
    </div>
  </div>
);

/** Browser met telefoon er schuin naast. */
const Devices = ({ p, phoneLeft = false }: { p: Project; phoneLeft?: boolean }) => (
  <div className="relative">
    <div aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,hsl(10_89%_50%/0.16),transparent_70%)]" />
    <div className="relative">
      <BrowserFrame p={p} />
      <div
        className={`absolute -bottom-8 w-[22%] min-w-[84px] transition-transform duration-500 ease-out motion-safe:group-hover/case:-translate-y-3 motion-safe:group-hover/case:rotate-0 ${
          phoneLeft ? "-left-4 -rotate-6 sm:-left-8" : "-right-4 rotate-6 sm:-right-8"
        }`}
      >
        <PhoneFrame p={p} />
      </div>
    </div>
  </div>
);

const CaseLink = ({ p, className = "" }: { p: Project; className?: string }) => (
  <a
    href={p.link}
    target="_blank"
    rel="noopener noreferrer"
    className={`group/link inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
  >
    Bekijk live
    <span className="sr-only"> de website van {p.title} (opent in nieuw tabblad)</span>
    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
  </a>
);

const CaseText = ({ p, i }: { p: Project; i: number }) => (
  <>
    <div className="flex items-center gap-3 text-sm">
      <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
      <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{p.category}</span>
    </div>
    <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{p.title}</h3>
    <p className="mt-4 leading-relaxed text-muted-foreground">{p.challenge}</p>
    <p className="mt-3 leading-relaxed text-foreground/90">{p.solution}</p>
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Kenmerken">
      {p.tags.map((t) => (
        <li key={t} className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
          {t}
        </li>
      ))}
    </ul>
    <div className="mt-auto pt-7">
      <CaseLink p={p} />
    </div>
  </>
);

/* ---------- Flippy: de vier figuurtjes piepen achter de kaart uit ---------- */

/** 4× opgeschaalde frames van flippy.flipforward.be. Pixel art, dus image-rendering: pixelated. */
const PETS = [
  { src: petPhone, name: "Flip", w: 66, h: 66, left: "7%", rotate: "-8deg", delay: "0ms" },
  { src: petFrog, name: "Hopper", w: 84, h: 48, left: "30%", rotate: "4deg", delay: "70ms" },
  { src: petPancake, name: "Flapjack", w: 84, h: 54, left: "54%", rotate: "-4deg", delay: "140ms" },
  { src: petClawd, name: "Clawd", w: 72, h: 51, left: "78%", rotate: "7deg", delay: "210ms" },
];

/**
 * Zit achter de kaart. Bij hover of toetsenbordfocus schuiven de figuurtjes omhoog tot hun ogen boven de rand
 * uitkomen. Op toestellen zonder hover (gsm) piepen ze één keer zodra de kaart in beeld komt.
 */
const PeekingPets = ({ peek }: { peek: boolean }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0">
    {PETS.map((pet) => (
      <img
        key={pet.name}
        src={pet.src}
        alt=""
        width={pet.w}
        height={pet.h}
        decoding="async"
        style={{ left: pet.left, transitionDelay: pet.delay, ["--r" as string]: pet.rotate, imageRendering: "pixelated" }}
        className={`peek-pet absolute bottom-0 h-auto w-[13%] min-w-[48px] max-w-[72px] ${peek ? "is-peeking" : ""}`}
      />
    ))}
  </div>
);

/** true zodra de kaart op een toestel zonder hover voor het eerst goed in beeld is. */
const usePeekOnScroll = (enabled: boolean) => {
  const ref = useRef<HTMLLIElement>(null);
  const [peek, setPeek] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || window.matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPeek(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);
  return { ref, peek };
};

const ProjectItem = ({ p, i }: { p: Project; i: number }) => {
  const { ref, peek } = usePeekOnScroll(Boolean(p.peek));
  const lastOdd = i === projects.length - 1 && projects.length % 2 === 1;
  return (
    <li
      ref={ref}
      id={projectAnchor(p.title)}
      className={`peek-host relative h-full scroll-mt-28 ${lastOdd ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1rem)] lg:w-[calc(50%-1.25rem)]" : ""}`}
    >
      {p.peek && <PeekingPets peek={peek} />}
      <CometCard rotateDepth={7} translateDepth={10} className="relative z-10 h-full">
        <div className="flex h-full flex-col rounded-2xl border border-border bg-[hsl(222_40%_8%)] p-5 sm:p-7">
          <div className="pb-6">
            <Devices p={p} />
          </div>
          <div className="mt-6 flex flex-1 flex-col">
            <CaseText p={p} i={i} />
          </div>
        </div>
      </CometCard>
    </li>
  );
};

/* ---------- Variant: 3D-tiltkaarten (Aceternity Comet Card) ---------- */

const Tilt = () => (
  <ul className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:gap-10">
    {projects.map((p, i) => (
      <ProjectItem key={p.title} p={p} i={i} />
    ))}
  </ul>
);

const Portfolio = () => {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="scroll-mt-20 overflow-x-clip bg-gradient-hero py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-6xl sm:mb-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Portfolio</p>
          <h2 id="portfolio-title" className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Ons <span className="text-accent">werk</span>
          </h2>
        </div>

        <Tilt />

      </div>
    </section>
  );
};

export default Portfolio;

import { ArrowUpRight, Lock } from "lucide-react";
import ScrollShot from "./ScrollShot";
import { CometCard } from "./aceternity/CometCard";
import finnDesktop from "@/assets/portfolio/finn-desktop.webp";
import finnMobile from "@/assets/portfolio/finn-mobile.webp";
import driverdashDesktop from "@/assets/portfolio/driverdash-desktop.webp";
import driverdashMobile from "@/assets/portfolio/driverdash-mobile.webp";
import clawdDesktop from "@/assets/portfolio/clawd-desktop.webp";
import clawdMobile from "@/assets/portfolio/clawd-mobile.webp";
import atlazDesktop from "@/assets/portfolio/atlaz-desktop.webp";
import atlazMobile from "@/assets/portfolio/atlaz-mobile.webp";
import hytaleDesktop from "@/assets/portfolio/hytale-desktop.webp";
import hytaleMobile from "@/assets/portfolio/hytale-mobile.webp";
import feestDesktop from "@/assets/portfolio/feestoptafel-desktop.webp";
import spuddyDesktop from "@/assets/portfolio/spuddy-desktop.webp";
import bnbDesktop from "@/assets/portfolio/bnb-desktop.webp";
import hyperdriveDesktop from "@/assets/portfolio/hyperdrive-desktop.webp";
import wingbyteDesktop from "@/assets/portfolio/wingbyte-desktop.webp";
import essentialsDesktop from "@/assets/portfolio/essentials-desktop.webp";

/**
 * Cases bevatten enkel feiten die op de projectsites zelf staan. Geen verzonnen cijfers.
 * Nieuwe klantcases pas toevoegen na akkoord van de klant.
 * Screenshots: src/assets/portfolio (1200 px breed, volledige pagina; mobiel 390×844 @2x).
 */
const projects = [
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
    title: "DriverDash",
    category: "Webapp · ritten & loon",
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
    title: "Clawd",
    category: "Eigen project · desktop-app",
    challenge: "Een klein, grappig maatje voor op je Windows-bureaublad, met een landingspagina die meteen toont wat hij kan.",
    solution:
      "Een pixel-mascotte die over je taakbalk wandelt, op vensters klimt en meetypt, met een speelse landingspagina vol echte sprites en een download in twee stappen.",
    tags: ["Pixel art", "Animatie", "Landingspagina"],
    link: "https://clawd-desktop-pet.vercel.app",
    domain: "clawd-desktop-pet.vercel.app",
    desktop: clawdDesktop,
    mobile: clawdMobile,
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
  {
    title: "Hytale Vlaanderen",
    category: "Communityplatform",
    challenge: "Een Vlaams-Nederlandse Hytale-community wilde één plek voor spelers en content creators.",
    solution: "Een communityplatform dat toont welke streamers live zijn, met speler-statistieken en een overzicht van creators.",
    tags: ["Live streams", "Statistieken", "Community"],
    link: "https://hytalevlaanderen.be",
    domain: "hytalevlaanderen.be",
    desktop: hytaleDesktop,
    mobile: hytaleMobile,
  },
];

/** Kleinere projecten (opleiding en eigen concepten), getoond in het raster onder de cases. */
const moreProjects: { title: string; category: string; text: string; link?: string; domain?: string; image: string }[] = [
  {
    title: "Feest Op Tafel",
    category: "Bestelplatform · teamproject",
    text: "Desserts, feesttafels, workshops en overschot-deals in één platform, met winkelmand en bestelflow.",
    link: "https://feestoptafel.com",
    domain: "feestoptafel.com",
    image: feestDesktop,
  },
  {
    title: "Spuddy",
    category: "Startupconcept · opleiding",
    text: "Een matchingplatform om sportmaatjes te vinden met dezelfde interesses en fitnessdoelen.",
    link: "https://spuddy.be",
    domain: "spuddy.be",
    image: spuddyDesktop,
  },
  {
    title: "B&B Booking System",
    category: "Boekingssysteem · opleiding",
    text: "Boekingsflow voor gasten plus een beheerdashboard met kalender en filters voor kamers, fietsen en yogalessen.",
    domain: "Niet publiek online",
    image: bnbDesktop,
  },
  {
    title: "Hyperdrive Festival",
    category: "Fictief festival · opleiding",
    text: "Een meeslepende festivalsite rond tickets, merch, camping en line-up.",
    link: "https://hyperdrivefestival.netlify.app",
    domain: "hyperdrivefestival.netlify.app",
    image: hyperdriveDesktop,
  },
  {
    title: "WingByte",
    category: "Educatieve game · opleiding",
    text: "Landingspagina voor een vliegspel waarin je spelenderwijs pc-hardware leert kennen.",
    link: "https://wingbyte.netlify.app",
    domain: "wingbyte.netlify.app",
    image: wingbyteDesktop,
  },
  {
    title: "Webdesign Essentials",
    category: "Portfolio · opleiding",
    text: "Alle opdrachten van een semester webdesign gebundeld, met eigen CSS en eigen fotografie.",
    link: "https://finnvangronsveld.sinners.be",
    domain: "finnvangronsveld.sinners.be",
    image: essentialsDesktop,
  },
];

type Project = (typeof projects)[number];

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

/* ---------- Variant: 3D-tiltkaarten (Aceternity Comet Card) ---------- */

const Tilt = () => (
  <ul className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:gap-10">
    {projects.map((p, i) => (
      <li key={p.title} className={`h-full ${i === projects.length - 1 && projects.length % 2 === 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1rem)] lg:w-[calc(50%-1.25rem)]" : ""}`}>
        <CometCard rotateDepth={7} translateDepth={10} className="h-full">
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
    ))}
  </ul>
);

/* ---------- Meer projecten ---------- */

const MoreCard = ({ p }: { p: (typeof moreProjects)[number] }) => {
  const Tag = p.link ? "a" : "div";
  return (
    <li>
      <Tag
        {...(p.link ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group/more flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-card transition-all duration-300 hover:border-accent/50 hover:shadow-[0_20px_60px_-20px_hsl(10_89%_50%/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:hover:-translate-y-1"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-1.5">
          <span className="flex gap-1" aria-hidden="true">
            <i className="h-2 w-2 rounded-full bg-white/20" />
            <i className="h-2 w-2 rounded-full bg-white/20" />
            <i className="h-2 w-2 rounded-full bg-white/20" />
          </span>
          <span className="mx-auto truncate text-[11px] text-white/50">{p.domain}</span>
        </div>
        <ScrollShot src={p.image} alt={`Screenshot van ${p.title}`} />
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.category}</p>
          <h4 className="mt-1 flex items-center gap-1.5 text-lg font-bold text-foreground">
            {p.title}
            {p.link && <ArrowUpRight className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover/more:opacity-100" aria-hidden="true" />}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          {p.link && <span className="sr-only"> (opent in nieuw tabblad)</span>}
        </div>
      </Tag>
    </li>
  );
};

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

        <div className="mx-auto mt-28 max-w-6xl sm:mt-36">
          <h3 className="mb-8 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Meer <span className="text-accent">projecten</span>
          </h3>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((p) => (
              <MoreCard key={p.title} p={p} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

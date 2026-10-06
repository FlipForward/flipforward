import { ArrowUpRight, Lock, MousePointer2 } from "lucide-react";
import hytaleDesktop from "@/assets/portfolio/hytale-desktop.webp";
import hytaleMobile from "@/assets/portfolio/hytale-mobile.webp";
import atlazDesktop from "@/assets/portfolio/atlaz-desktop.webp";
import atlazMobile from "@/assets/portfolio/atlaz-mobile.webp";
import finnDesktop from "@/assets/portfolio/finn-desktop.webp";
import finnMobile from "@/assets/portfolio/finn-mobile.webp";
import essentialsDesktop from "@/assets/portfolio/essentials-desktop.webp";
import feestDesktop from "@/assets/portfolio/feestoptafel-desktop.webp";
import feestMobile from "@/assets/portfolio/feestoptafel-mobile.webp";
import spuddyDesktop from "@/assets/portfolio/spuddy-desktop.webp";
import hyperdriveDesktop from "@/assets/portfolio/hyperdrive-desktop.webp";
import wingbyteDesktop from "@/assets/portfolio/wingbyte-desktop.webp";
import bnbDesktop from "@/assets/portfolio/bnb-desktop.webp";

/**
 * Cases bevatten enkel feiten die op de projectsites zelf staan. Geen verzonnen cijfers.
 * Nieuwe klantcases pas toevoegen na akkoord van de klant.
 * Screenshots: src/assets/portfolio (1200 px breed, volledige pagina; mobiel 390×844 @2x).
 */
const projects = [
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
    title: "Persoonlijke website",
    category: "Eigen project · portfolio",
    challenge: "Een persoonlijke plek om mijn verhaal en werk te tonen.",
    solution: "Een cinematische one-page portfolio.",
    tags: ["Storytelling", "Animatie"],
    link: "https://finnvangronsveld.be",
    domain: "finnvangronsveld.be",
    desktop: finnDesktop,
    mobile: finnMobile,
  },
];

// Feest Op Tafel als derde case (vóór de persoonlijke website).
projects.splice(2, 0, {
  title: "Feest Op Tafel",
  category: "Opleiding · teamproject",
  challenge: "Een platform voor desserts en feesttafels, waar klanten zowel het aanbod ontdekken als meteen bestellen.",
  solution: "Een full-stack bestelplatform met dessertcatalogus, evenementen, workshops, overschot-deals, reviews en een winkelmand.",
  tags: ["Webshop", "Workshops", "Checkout"],
  link: "https://feestoptafel.com",
  domain: "feestoptafel.com",
  desktop: feestDesktop,
  mobile: feestMobile,
});

/** Kleinere projecten (opleiding en eigen concepten), getoond in het raster onder de cases. */
const moreProjects: { title: string; category: string; text: string; link?: string; domain?: string; image: string }[] = [
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

/** Browserkader; de screenshot scrolt door de pagina bij hover of toetsenbordfocus. */
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
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={p.desktop}
        alt={`Screenshot van de website ${p.title}`}
        width={1200}
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 top-0 w-full transition-[top,transform] duration-[4000ms] ease-in-out motion-reduce:transition-none group-hover/case:top-full group-hover/case:-translate-y-full group-focus-within/case:top-full group-focus-within/case:-translate-y-full"
      />
    </div>
  </div>
);

const PhoneFrame = ({ p }: { p: Project }) => (
  <div className="w-full rounded-[1.6rem] border border-white/15 bg-black p-1.5 shadow-[0_25px_60px_-10px_rgb(0_0_0/0.8)]">
    <div className="relative overflow-hidden rounded-[1.2rem] aspect-[390/844]">
      <img src={p.mobile} alt="" aria-hidden="true" width={390} height={844} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
      <span className="absolute left-1/2 top-1.5 h-3.5 w-14 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
    </div>
  </div>
);

const Case = ({ p, i }: { p: Project; i: number }) => {
  const flip = i % 2 === 1;
  return (
    <li className="group/case grid items-center gap-8 lg:gap-14 lg:grid-cols-12">
      {/* visual */}
      <div className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,hsl(10_89%_50%/0.18),transparent_70%)] opacity-60 blur-2xl transition-opacity duration-500 group-hover/case:opacity-100"
        />
        <div className="relative transition-transform duration-500 ease-out motion-safe:group-hover/case:-translate-y-1">
          <BrowserFrame p={p} />
          <div
            className={`absolute -bottom-8 w-[22%] min-w-[84px] transition-transform duration-500 ease-out motion-safe:group-hover/case:-translate-y-3 motion-safe:group-hover/case:rotate-0 ${
              flip ? "-left-4 sm:-left-8 -rotate-6" : "-right-4 sm:-right-8 rotate-6"
            }`}
          >
            <PhoneFrame p={p} />
          </div>
        </div>
      </div>

      {/* tekst */}
      <div className={`lg:col-span-5 pt-6 lg:pt-0 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
          <span className="uppercase tracking-wider text-muted-foreground text-xs">{p.category}</span>
        </div>
        <h3 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{p.title}</h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">{p.challenge}</p>
        <p className="mt-3 text-foreground/90 leading-relaxed">{p.solution}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Kenmerken">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-7 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Bekijk live
          <span className="sr-only"> de website van {p.title} (opent in nieuw tabblad)</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </li>
  );
};

const MoreCard = ({ p, wide }: { p: (typeof moreProjects)[number]; wide: boolean }) => {
  const Tag = p.link ? "a" : "div";
  return (
    <li className={wide ? "lg:col-span-3" : "lg:col-span-2"}>
      <Tag
        {...(p.link ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group/more flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-card transition-all duration-300 hover:border-accent/50 hover:shadow-[0_20px_60px_-20px_hsl(10_89%_50%/0.35)] motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-1.5">
          <span className="flex gap-1" aria-hidden="true">
            <i className="h-2 w-2 rounded-full bg-white/20" />
            <i className="h-2 w-2 rounded-full bg-white/20" />
            <i className="h-2 w-2 rounded-full bg-white/20" />
          </span>
          <span className="mx-auto truncate text-[11px] text-white/50">{p.domain}</span>
        </div>
        <div className={`relative overflow-hidden ${wide ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
          <img
            src={p.image}
            alt={`Screenshot van ${p.title}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-x-0 top-0 w-full transition-[top,transform] duration-[3500ms] ease-in-out motion-reduce:transition-none group-hover/more:top-full group-hover/more:-translate-y-full group-focus-visible/more:top-full group-focus-visible/more:-translate-y-full"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.category}</p>
          <h4 className="mt-1 flex items-center gap-1.5 text-lg font-bold text-foreground">
            {p.title}
            {p.link && (
              <ArrowUpRight className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover/more:opacity-100" aria-hidden="true" />
            )}
          </h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
          {p.link && <span className="sr-only"> (opent in nieuw tabblad)</span>}
        </div>
      </Tag>
    </li>
  );
};

const Portfolio = () => (
  <section id="portfolio" aria-labelledby="portfolio-title" className="py-20 sm:py-28 bg-gradient-hero scroll-mt-20 overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="mb-14 sm:mb-20 flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left max-w-6xl mx-auto gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Portfolio</p>
          <h2 id="portfolio-title" className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Ons <span className="text-accent">werk</span>
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground lg:text-right">
          Echte websites, live online.
          <span className="hidden lg:inline-flex items-center gap-1.5 ml-1">
            <MousePointer2 className="h-4 w-4 text-accent" aria-hidden="true" /> Hover om door de pagina te scrollen.
          </span>
        </p>
      </div>

      <ul className="space-y-24 sm:space-y-32 max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <Case key={p.title} p={p} i={i} />
        ))}
      </ul>

      <div className="max-w-6xl mx-auto mt-28 sm:mt-36">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Meer <span className="text-accent">projecten</span>
          </h3>
          <p className="hidden sm:block text-sm text-muted-foreground">Eigen concepten en projecten uit de opleiding.</p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {moreProjects.map((p, i) => (
            <MoreCard key={p.title} p={p} wide={i < 2} />
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Portfolio;

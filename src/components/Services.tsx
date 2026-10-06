import { Palette, Globe, Wrench, Search, Lock, Check, ShieldCheck, RefreshCw, DatabaseBackup } from "lucide-react";
import { GlowCard } from "./aceternity/GlowingEffect";
import { showcase } from "@/lib/showcase";

/* Kleine illustraties per dienst (decoratief). */

const DesignVisual = () => (
  <div aria-hidden="true" className="relative mt-6 h-40 sm:h-48">
    {showcase.slice(0, 3).map((p, i) => (
      <div
        key={p.title}
        className="absolute top-0 w-[58%] overflow-hidden rounded-lg border border-white/10 bg-[hsl(222_40%_9%)] shadow-2xl"
        style={{ left: `${i * 21}%`, top: `${i * 14}px`, zIndex: 3 - i, transform: `rotate(${(i - 1) * 3}deg)` }}
      >
        <div className="flex gap-1 border-b border-white/10 px-2 py-1">
          <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
        </div>
        <img src={p.thumbnail} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
      </div>
    ))}
  </div>
);

const DomainVisual = () => (
  <div aria-hidden="true" className="mt-6 space-y-2">
    <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm">
      <Lock className="h-4 w-4 text-emerald-400" />
      <span className="text-foreground">jouwzaak.be</span>
      <span className="ml-auto rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">SSL</span>
    </div>
    <p className="px-1 text-xs text-muted-foreground">Op jouw naam geregistreerd.</p>
  </div>
);

const MaintenanceVisual = () => (
  <ul aria-hidden="true" className="mt-6 space-y-2 text-sm">
    {[
      { icon: RefreshCw, t: "Updates" },
      { icon: DatabaseBackup, t: "Back-ups" },
      { icon: ShieldCheck, t: "Beveiliging" },
    ].map(({ icon: I, t }) => (
      <li key={t} className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2">
        <I className="h-4 w-4 text-accent" />
        <span className="text-foreground">{t}</span>
        <Check className="ml-auto h-4 w-4 text-emerald-400" />
      </li>
    ))}
  </ul>
);

const SearchVisual = () => (
  <div aria-hidden="true" className="mt-6 rounded-xl border border-border bg-background/60 p-4">
    <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground">
      <Search className="h-4 w-4" /> kapper retie
    </div>
    <div className="mt-4 space-y-1">
      <p className="text-xs text-emerald-400/90">jouwzaak.be</p>
      <p className="font-semibold text-[hsl(214_90%_70%)]">Jouw Zaak · Kapsalon in Retie</p>
      <p className="text-xs text-muted-foreground">Maak online een afspraak. Openingsuren, prijzen en contact.</p>
    </div>
  </div>
);

const services = [
  {
    icon: Palette,
    title: "Design & ontwikkeling",
    text: "Een website op maat van je zaak, mobielvriendelijk en snel. Met twee feedbackrondes, zodat het ontwerp klopt.",
    visual: <DesignVisual />,
    span: "lg:col-span-4",
  },
  {
    icon: Globe,
    title: "Domein & hosting",
    text: "We registreren je domeinnaam op jouw naam, zorgen voor een beveiligde verbinding (SSL) en snelle hosting.",
    visual: <DomainVisual />,
    span: "lg:col-span-2",
  },
  {
    icon: Wrench,
    title: "Onderhoud & support",
    text: "Updates, back-ups, beveiliging en uptime-monitoring. Aanpassingen aan je site doen we binnen je pakket.",
    visual: <MaintenanceVisual />,
    span: "lg:col-span-2",
  },
  {
    icon: Search,
    title: "Vindbaarheid",
    text: "Een technisch sterke basis voor Google, en vanaf Business ook voor AI-zoekmachines en je Google Bedrijfsprofiel.",
    visual: <SearchVisual />,
    span: "lg:col-span-4",
  },
];

const Services = () => (
  <section id="diensten" aria-labelledby="diensten-title" className="scroll-mt-20 bg-background py-20 sm:py-28">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="mx-auto mb-12 max-w-6xl sm:mb-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Diensten</p>
        <h2 id="diensten-title" className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Website as a <span className="text-accent">Service</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Geen losse factuur voor een website die daarna veroudert: wij bouwen én onderhouden, voor een vast bedrag per maand.
        </p>
      </div>

      <ul className="mx-auto grid max-w-6xl gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
        {services.map(({ icon: Icon, title, text, visual, span }) => (
          <li key={title} className={`group ${span}`}>
            <GlowCard innerClassName="p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-accent/10">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground sm:text-2xl">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
              {visual}
            </GlowCard>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Services;

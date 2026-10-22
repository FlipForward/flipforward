import { Link } from "react-router-dom";
import { ArrowRight, Check, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/aceternity/GlowingEffect";
import { business, packages, includedInAll, steps, faqs, formatEuro, yearlyPrice, PRICE_NOTE } from "@/lib/site";
import { showcase, projectAnchor, FEATURED } from "@/lib/showcase";

/**
 * Landingspagina voor "website laten maken" (+ Kempen/regio). Eén echte, inhoudelijke pagina;
 * bewust geen aparte pagina per gemeente (dat ziet Google als doorway pages).
 * Alle cijfers en teksten komen uit site.ts, zodat ze gelijk lopen met de homepage.
 */
const FAQ_KEYS = ["Wat kost een website laten maken?", "Hoe lang duurt het om een website te laten maken?", "Kan ik zelf teksten aanpassen?", "Van wie is het domein?", "Werken jullie ook buiten Retie?"];

const WebsiteLatenMaken = () => {
  const pageFaqs = faqs.filter((f) => FAQ_KEYS.includes(f.q));
  const work = showcase.filter((s) => FEATURED.includes(s.title));

  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main id="main" className="pb-20 pt-28 sm:pt-32">
        <article className="container mx-auto max-w-4xl px-4 sm:px-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-sm font-medium text-accent">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Webdesigner uit {business.city}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            Website laten maken <span className="text-accent">in de Kempen</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Een website laten maken hoeft niet ingewikkeld of onvoorspelbaar duur te zijn. FlipForward bouwt websites voor kmo's en
            zelfstandigen in de Kempen, tegen een vaste prijs, en blijft daarna je vaste aanspreekpunt voor hosting, onderhoud en
            aanpassingen. Hieronder lees je wat het kost, hoe het verloopt en wat er allemaal in zit.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg">
              <a href="/#contact">
                Vraag vrijblijvend een voorstel
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/#portfolio">Bekijk ons werk</a>
            </Button>
          </div>

          {/* Prijzen */}
          <section aria-labelledby="kost-title" className="mt-20">
            <h2 id="kost-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Wat kost een website laten maken?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Je betaalt één keer een opstartkost voor ontwerp en bouw, en daarna een vast bedrag per maand. Daarin zitten hosting,
              beveiliging, updates en een aantal uur aanpassingen. Zo veroudert je website niet en weet je altijd waar je aan toe bent.
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {packages.map((p) => (
                <li key={p.id}>
                  <GlowCard innerClassName="p-6">
                    <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.audience}</p>
                    <p className="mt-4 text-3xl font-extrabold text-foreground">
                      {p.setupFrom && <span className="mr-1 text-base font-medium text-muted-foreground">vanaf</span>}
                      {formatEuro(p.setup)}
                    </p>
                    <p className="text-sm text-muted-foreground">eenmalige opstart</p>
                    <p className="mt-2 font-semibold text-accent">+ {formatEuro(p.monthly)} / maand</p>
                    <p className="text-xs text-muted-foreground">of {formatEuro(yearlyPrice(p))} per jaar (1 maand gratis)</p>
                    <p className="mt-4 text-sm font-medium text-foreground">{p.pages}</p>
                  </GlowCard>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">{PRICE_NOTE}</p>
            <p className="mt-2 text-sm">
              <a href="/#pakketten" className="font-medium text-accent underline underline-offset-4">
                Alle pakketten vergelijken
              </a>
            </p>
          </section>

          {/* Wat zit erin */}
          <section aria-labelledby="inbegrepen-title" className="mt-20">
            <h2 id="inbegrepen-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Wat zit er altijd in?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Elke website is mobielvriendelijk, snel en in orde met de wet (privacyverklaring en wettelijke bedrijfsgegevens). Daarnaast
              regelen we in elk pakket:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {includedInAll.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3">
                  <Check className="h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Werkwijze */}
          <section aria-labelledby="verloop-title" className="mt-20">
            <h2 id="verloop-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Hoe verloopt het?
            </h2>
            <ol className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl border border-border bg-gradient-card p-5 sm:p-6">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border font-bold text-accent" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground">
                      <span className="sr-only">Stap {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Recent werk */}
          <section aria-labelledby="werk-title" className="mt-20">
            <h2 id="werk-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Websites die we maakten
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {work.map((w) => (
                <li key={w.title}>
                  <a
                    href={`/#${projectAnchor(w.title)}`}
                    className="group block overflow-hidden rounded-2xl border border-border bg-[hsl(222_40%_9%)] transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img src={w.thumbnail} alt={`Website ${w.title}`} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" />
                    <span className="flex items-center justify-between px-4 py-3 font-semibold text-foreground">
                      {w.title}
                      <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Regio */}
          <section aria-labelledby="regio-title" className="mt-20">
            <h2 id="regio-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Webdesign in heel de Kempen
            </h2>
            <p className="mt-4 text-muted-foreground">
              FlipForward is gevestigd in {business.city}. We werken vooral voor ondernemers in de buurt, zodat we makkelijk eens kunnen
              langskomen om je zaak en je klanten te leren kennen. Je kan bij ons terecht vanuit onder meer:
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {business.towns.map((t) => (
                <li key={t} className="rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-sm text-foreground">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Ook verder in de provincie Antwerpen en de rest van Vlaanderen.</p>
          </section>

          {/* FAQ */}
          <section aria-labelledby="vragen-title" className="mt-20">
            <h2 id="vragen-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Veelgestelde vragen over een website laten maken
            </h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {pageFaqs.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
                  <p className="mt-2 text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/[0.12] via-card to-card p-8 text-center sm:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Klaar om je website te laten maken?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Vertel kort over je zaak. Je krijgt een concreet voorstel met het passende pakket, zonder verplichtingen.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <a href="/#contact">
                  Neem contact op
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={business.phoneHref}>Bel {business.phone}</a>
              </Button>
            </div>
            <p className="mt-6 text-sm">
              <Link to="/" className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
                Terug naar de homepage
              </Link>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLatenMaken;

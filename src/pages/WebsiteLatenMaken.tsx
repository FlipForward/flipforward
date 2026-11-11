import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PackageComparison from "@/components/PackageComparison";
import { business, packages, includedInAll, steps, faqs, formatEuro, yearlyPrice, PRICE_NOTE } from "@/lib/site";
import { showcase, FEATURED } from "@/lib/showcase";

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
      <main id="main" className="pb-20 pt-28 sm:pb-28 sm:pt-36">
        <article className="wrap max-w-[60rem]">
          <p className="eyebrow">Webdesigner uit {business.city}</p>
          <h1 className="h-section mt-4">
            Website laten maken in de Kempen
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            FlipForward bouwt websites voor kmo's en
            zelfstandigen in de Kempen, tegen een vaste prijs, en blijft daarna je vaste aanspreekpunt voor hosting, onderhoud en
            aanpassingen. Hieronder lees je wat het kost, hoe het verloopt en wat er in zit.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/#contact" className="ff-btn ff-btn-primary">
              Vraag een gratis voorbeeld
            </a>
            <a href="/#portfolio" className="ff-btn ff-btn-line">
              Bekijk het werk
            </a>
          </div>

          {/* Prijzen */}
          <section aria-labelledby="kost-title" className="mt-20">
            <h2 id="kost-title" className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.025em]">
              Wat kost een website laten maken?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Je betaalt één keer een opstartkost voor ontwerp en bouw, en daarna een vast bedrag per maand. Daarin zitten hosting,
              beveiliging, updates en een aantal uur aanpassingen. Zo veroudert je website niet en weet je altijd waar je aan toe bent.
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {packages.map((p) => (
                <li key={p.id}>
                  <div className="h-full rounded-3xl bg-card p-6">
                    <h3 className="text-2xl tracking-[-0.02em]">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.audience}</p>
                    <p className="num mt-6 text-4xl tracking-[-0.03em]">
                      {p.setupFrom && <span className="mr-1 text-base font-medium text-muted-foreground">vanaf</span>}
                      {formatEuro(p.setup)}
                    </p>
                    <p className="text-sm text-muted-foreground">eenmalige opstart</p>
                    <p className="num mt-3 text-lg">+ {formatEuro(p.monthly)} per maand</p>
                    <p className="num text-sm text-muted-foreground">of {formatEuro(yearlyPrice(p))} per jaar, 1 maand gratis</p>
                    <p className="mt-5 border-t border-border pt-4 text-[15px]">{p.pages}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">{PRICE_NOTE}</p>
            <PackageComparison />
          </section>

          {/* Wat zit erin */}
          <section aria-labelledby="inbegrepen-title" className="mt-20">
            <h2 id="inbegrepen-title" className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.025em]">
              Wat zit er altijd in?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Elke website is mobielvriendelijk, snel en in orde met de wet (privacyverklaring en wettelijke bedrijfsgegevens). Daarnaast
              regelen we in elk pakket:
            </p>
            <ul className="mt-6 grid border-t border-border sm:grid-cols-2 sm:gap-x-10">
              {includedInAll.map((item) => (
                <li key={item} className="border-b border-border py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Werkwijze */}
          <section aria-labelledby="verloop-title" className="mt-20">
            <h2 id="verloop-title" className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.025em]">
              Hoe verloopt het?
            </h2>
            <ol className="mt-8 border-t border-border">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-6 border-b border-border py-6">
                  <span className="num w-8 shrink-0 pt-1 text-sm text-muted-foreground" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl tracking-[-0.01em]">
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
            <h2 id="werk-title" className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.025em]">
              Websites die we maakten
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {work.map((w) => (
                <li key={w.title}>
                  <a
                    href="/#portfolio"
                    className="group block"
                  >
                    <img src={w.thumbnail} alt={`Website ${w.title}`} width={w.w} height={w.h} loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-2xl bg-muted object-cover object-top" />
                    <span className="flex items-center justify-between pt-3 text-lg">
                      {w.title}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Regio */}
          <section aria-labelledby="regio-title" className="mt-20">
            <h2 id="regio-title" className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.025em]">
              Webdesign in heel de Kempen
            </h2>
            <p className="mt-4 text-muted-foreground">
              FlipForward is gevestigd in {business.city}. We werken vooral voor ondernemers in de buurt, zodat we makkelijk eens kunnen
              langskomen om je zaak en je klanten te leren kennen. Je kan bij ons terecht vanuit onder meer:
            </p>
            <p className="mt-4 text-lg">{business.towns.join(", ")}.</p>
            <p className="mt-4 text-sm text-muted-foreground">Ook verder in de provincie Antwerpen en de rest van Vlaanderen.</p>
          </section>

          {/* FAQ */}
          <section aria-labelledby="vragen-title" className="mt-20">
            <h2 id="vragen-title" className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.025em]">
              Veelgestelde vragen over een website laten maken
            </h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {pageFaqs.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="text-xl tracking-[-0.01em]">{f.q}</h3>
                  <p className="mt-2 text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="on-ink mt-20 rounded-3xl p-8 sm:p-14">
            <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.025em]">Vertel over je zaak</h2>
            <p className="soft mt-4 max-w-xl text-lg">
              Je krijgt binnen 2 werkdagen antwoord, met een voorstel voor het passende pakket.
            </p>
            <div className="mt-8">
              <a href="/#contact" className="ff-btn ff-btn-primary w-full sm:w-auto">
                Neem contact op
              </a>
            </div>
            <p className="mt-6 text-sm">
              <Link to="/" className="soft underline underline-offset-4">
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

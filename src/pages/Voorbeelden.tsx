import { ArrowRight, Check, Clock, Home, Mail, MapPin, Scissors, Truck, Wheat } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/site";
// Eén lettertype per voorbeeldstijl, self-hosted (CSP: font-src 'self'); enkel de gebruikte gewichten
import "@fontsource/oswald/latin-500.css";
import "@fontsource/oswald/latin-600.css";
import "@fontsource-variable/fraunces/index.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-600.css";

/**
 * /voorbeelden (4/11/2026): pagina voor de koude mails van de Mailcampagne (FlipForward-app). Niet in het menu, niet in de
 * sitemap, noindex. Toont wat FlipForward bouwt aan de hand van vier verzonnen bedrijven, elk in een eigen huisstijl, en
 * waarom een website voor elk soort bedrijf loont. De voorbeeldbedrijven bestaan niet: dat staat ook op de pagina.
 */

const mailto = `mailto:${business.email}?subject=${encodeURIComponent("Gratis voorbeeld voor onze website")}`;

const Voorbeelden = () => (
  <div className="relative min-h-screen">
    <Navigation />
    <main id="main" className="pb-20 pt-28 sm:pt-32">
      {/* Kop */}
      <header className="container mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.05em] text-accent">Voor bedrijven in de Kempen</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] [text-wrap:balance] sm:text-6xl">
          Zo kan de website van <span className="text-accent">uw zaak</span> eruitzien
        </h1>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-foreground [text-wrap:pretty]">
          Ik ben Finn Vangronsveld, IT-student uit de Kempen met een eigen webbureau, FlipForward. Hieronder ziet u vier voorbeelden
          in vier heel verschillende stijlen, en waarom een goede website voor elk soort bedrijf het verschil maakt. Wilt u er een
          voor uw eigen zaak zien? Dan maak ik gratis en vrijblijvend een voorbeeld met uw eigen diensten.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="hero" size="lg">
            <a href={mailto}>
              Vraag een gratis voorbeeld <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#voorbeelden">Bekijk de voorbeelden</a>
          </Button>
        </div>
      </header>

      {/* Waarom */}
      <section aria-labelledby="waarom" className="container mx-auto mt-20 max-w-5xl px-4 sm:mt-28 sm:px-6">
        <h2 id="waarom" className="text-3xl font-extrabold leading-[1.2] tracking-[-0.01em] [text-wrap:balance] sm:text-4xl">
          Waarom een website, ook als iedereen u al kent
        </h2>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground [text-wrap:pretty]">
          Mond-tot-mondreclame blijft het beste wat er is. Maar wie uw naam doorkrijgt, zoekt u daarna bijna altijd eerst even op.
          Wat hij dan vindt, beslist of hij belt.
        </p>
        <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {WAAROM.map((w) => (
            <div key={w.titel} className="border-t border-border pt-4">
              <dt className="font-semibold text-foreground">{w.titel}</dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground [text-wrap:pretty]">{w.tekst}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Voorbeelden */}
      <section id="voorbeelden" aria-labelledby="voorbeelden-titel" className="mt-20 scroll-mt-24 sm:mt-28">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <h2 id="voorbeelden-titel" className="text-3xl font-extrabold leading-[1.2] tracking-[-0.01em] [text-wrap:balance] sm:text-4xl">
            Vier bedrijven, vier stijlen
          </h2>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground [text-wrap:pretty]">
            Deze bedrijven zijn verzonnen, de stijlen niet: zo verschillend kan het eruitzien. Elke site wordt gemaakt rond wat úw klanten
            zoeken, en werkt even vlot op een gsm als op een computer.
          </p>
        </div>
        <div className="container mx-auto mt-12 max-w-6xl space-y-16 px-4 sm:space-y-24 sm:px-6">
          {VOORBEELDEN.map((v, i) => (
            <article
              key={v.sector}
              aria-labelledby={`vb-${i}`}
              className={`grid items-start gap-6 lg:gap-12 ${i % 2 ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"}`}
            >
              <div className={i % 2 ? "lg:order-2" : ""}>
                <p className="text-sm text-accent">
                  <span className="tabular-nums">0{i + 1}</span> · {v.stijl}
                </p>
                <h3 id={`vb-${i}`} className="mt-2 text-2xl font-bold leading-[1.25] tracking-[-0.01em] [text-wrap:balance]">
                  {v.sector}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground [text-wrap:pretty]">{v.uitleg}</p>
                <ul className="mt-4 space-y-2 text-[0.9375rem]">
                  {v.punten.map((p) => (
                    <li key={p} className="flex gap-2 leading-snug">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Kader adres={v.adres}>{v.site}</Kader>
            </article>
          ))}
        </div>
      </section>

      {/* Wat erbij zit + werkwijze */}
      <section aria-labelledby="erbij" className="container mx-auto mt-20 max-w-5xl px-4 sm:mt-28 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="erbij" className="text-3xl font-extrabold leading-[1.2] tracking-[-0.01em] [text-wrap:balance]">
              Wat er altijd bij zit
            </h2>
            <ul className="mt-6 space-y-3">
              {ERBIJ.map((e) => (
                <li key={e} className="flex gap-3 leading-relaxed text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Prijzen en pakketten staan op{" "}
              <a href="/website-laten-maken" className="text-accent underline decoration-from-font underline-offset-4">
                website laten maken
              </a>
              . Echte klanten ziet u in het{" "}
              <a href="/#portfolio" className="text-accent underline decoration-from-font underline-offset-4">
                portfolio
              </a>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
            <h2 className="text-2xl font-bold leading-[1.25] tracking-[-0.01em]">Een gratis voorbeeld voor uw zaak</h2>
            <ol className="mt-5 space-y-4">
              {STAPPEN.map((s, i) => (
                <li key={s.titel} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold tabular-nums text-accent">{i + 1}</span>
                  <span>
                    <span className="font-semibold">{s.titel}</span>
                    <span className="block text-[0.9375rem] leading-relaxed text-muted-foreground">{s.tekst}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Button asChild variant="hero" size="lg" className="mt-7 w-full">
              <a href={mailto}>
                <Mail className="h-4 w-4" aria-hidden="true" /> Mail {business.email}
              </a>
            </Button>
            <p className="mt-3 text-center text-sm text-muted-foreground">Of antwoord gewoon op mijn mail.</p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Voorbeelden;

/* ── Inhoud ── */

const WAAROM = [
  {
    titel: "Gevonden worden",
    tekst: "Google, Google Maps en AI-tools zoals ChatGPT halen hun antwoorden uit websites. Wie geen site heeft, komt in die antwoorden niet voor.",
  },
  {
    titel: "De eerste indruk",
    tekst: "Een site die op een gsm niet goed werkt of jaren niet veranderde, doet twijfelen of de zaak nog bestaat. Een verzorgde site toont dat u er staat.",
  },
  {
    titel: "Minder dezelfde vragen",
    tekst: "Openingsuren, werkgebied, wat u wel en niet doet en hoe een aanvraag verloopt: wie dat al online leest, belt met een concrete vraag.",
  },
  {
    titel: "Aanvragen waar u iets mee kunt",
    tekst: "Een formulier dat meteen vraagt wat u nodig hebt, met adres en foto's erbij. Dat scheelt een plaatsbezoek voor niets.",
  },
  {
    titel: "Personeel vinden",
    tekst: "Een goede vacaturepagina op uw eigen site wordt vaker gevonden en gedeeld dan een berichtje op sociale media.",
  },
  {
    titel: "Wettelijk in orde",
    tekst: "Ondernemingsnummer, privacyverklaring en een veilige verbinding (https) horen op elke bedrijfssite. Dat zit er standaard in.",
  },
];

const ERBIJ = [
  "Ontwerp op maat in de stijl van uw zaak, met uw eigen teksten en foto's",
  "Snel en goed leesbaar op elke gsm, tablet en computer",
  "Gebouwd om gevonden te worden in Google, Google Maps en AI-tools",
  "Hosting, beveiliging en updates: daar hoeft u niet naar om te kijken",
  "Kleine aanpassingen gewoon mailen, ik zet ze online",
  "Privacyverklaring, ondernemingsnummer en https in orde",
];

const STAPPEN = [
  { titel: "U antwoordt “ja”", tekst: "Een kort antwoord op mijn mail volstaat." },
  { titel: "Ik maak een voorbeeld", tekst: "Met uw eigen diensten, foto's en gegevens, binnen een paar dagen. Afgeschermd voor Google, enkel voor u." },
  { titel: "U beslist", tekst: "Bevalt het, dan bespreken we het samen. Zo niet, dan is dat helemaal oké en hoort u niets meer." },
];

/* ── Browserkader rond een voorbeeld ── */

function Kader({ adres, children }: { adres: string; children: React.ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-[hsl(222_40%_9%)] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2" aria-hidden="true">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate rounded-full bg-white/[0.06] px-3 py-0.5 text-xs text-white/60">{adres}</span>
      </div>
      <div className="antialiased">{children}</div>
      <figcaption className="sr-only">Voorbeeld van een website voor een verzonnen bedrijf</figcaption>
    </figure>
  );
}

/* ── 1. Dakwerker: robuust, donker, Oswald ── */

const Dakwerker = () => (
  <div className="bg-[#1b1e21] text-[#e9e4dc]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
    <div className="flex items-center justify-between px-5 py-4 sm:px-8">
      <span className="flex items-center gap-2 text-lg font-semibold uppercase tracking-[0.04em]" style={{ fontFamily: "Oswald, sans-serif" }}>
        <Home className="h-5 w-5 text-[#d9772b]" aria-hidden="true" /> Vandeloo
      </span>
      <span className="hidden gap-5 text-sm text-[#e9e4dc]/70 sm:flex">
        <span>Daken</span>
        <span>Renovatie</span>
        <span>Realisaties</span>
        <span>Contact</span>
      </span>
    </div>
    <div className="relative overflow-hidden px-5 pb-8 pt-6 sm:px-8 sm:pb-12 sm:pt-10">
      {/* Dakpannen als patroon: schuine lijnen in koper */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-0 h-full w-1/2 opacity-[0.12] [background:repeating-linear-gradient(135deg,#d9772b_0_2px,transparent_2px_22px)]" />
      <p className="text-xs uppercase tracking-[0.08em] text-[#d9772b]">Dakwerken · Kasterlee en omstreken</p>
      <p className="mt-3 max-w-md text-[2rem] font-semibold uppercase leading-[1.05] tracking-[0.01em] sm:text-[2.75rem]" style={{ fontFamily: "Oswald, sans-serif" }}>
        Hellende en platte daken, waterdicht voor jaren
      </p>
      <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[#e9e4dc]/75">
        Nieuwe daken, renovatie en herstellingen na stormschade. Stuur een foto van uw dak mee, dan weten we meteen wat er nodig is.
      </p>
      <span className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#d9772b] px-4 py-2.5 text-sm font-semibold text-[#1b1e21]">
        Plaatsbezoek aanvragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </div>
    <div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
      {["Pannendaken", "Platte daken", "Dakisolatie", "Goten en zink"].map((d, i) => (
        <div key={d} className={`px-5 py-4 text-sm sm:px-6 ${i % 2 ? "" : "border-r border-white/10"} ${i < 2 ? "max-sm:border-b max-sm:border-white/10" : ""} sm:border-r sm:last:border-r-0`}>
          <span className="block text-xs text-[#d9772b] tabular-nums">0{i + 1}</span>
          <span className="mt-1 block font-medium uppercase tracking-[0.03em]" style={{ fontFamily: "Oswald, sans-serif" }}>
            {d}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ── 2. Bakkerij: warm ambacht, crème, Fraunces ── */

const Bakkerij = () => (
  <div className="bg-[#f5eee2] text-[#3b2a1e]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
    <div className="flex items-center justify-between px-5 py-4 sm:px-8">
      <span className="whitespace-nowrap text-xl italic" style={{ fontFamily: "'Fraunces Variable', serif", fontWeight: 600 }}>
        De Graanzolder
      </span>
      <span className="hidden gap-5 text-sm text-[#3b2a1e]/70 sm:flex">
        <span>Brood</span>
        <span>Taarten</span>
        <span>Ontbijt</span>
        <span>Bestellen</span>
      </span>
    </div>
    <div className="grid gap-6 px-5 pb-8 pt-4 sm:grid-cols-[1.4fr_1fr] sm:px-8 sm:pb-10 sm:pt-8">
      <div>
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#9c3f1d]">
          <Wheat className="h-4 w-4" aria-hidden="true" /> Ambachtelijke bakkerij in Geel
        </p>
        <p className="mt-3 text-[2.1rem] leading-[1.08] tracking-[-0.015em] sm:text-[2.75rem]" style={{ fontFamily: "'Fraunces Variable', serif", fontWeight: 500 }}>
          Desembrood, <em className="text-[#9c3f1d]">elke ochtend</em> vers uit de oven
        </p>
        <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-[#3b2a1e]/75">
          Met bloem van een molen uit de streek. Taarten en ontbijtmanden bestelt u hier, tot de dag voordien om 14 uur.
        </p>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3b2a1e] px-5 py-2.5 text-sm font-medium text-[#f5eee2]">Taart bestellen</span>
      </div>
      <div className="self-start rounded-lg border border-[#3b2a1e]/15 bg-[#fbf7f0] p-4 text-sm">
        <p className="flex items-center gap-2 font-medium">
          <Clock className="h-4 w-4 text-[#9c3f1d]" aria-hidden="true" /> Openingsuren
        </p>
        <dl className="mt-3 space-y-1.5 tabular-nums">
          {[
            ["Di – Za", "6.30 – 18.00"],
            ["Zondag", "7.00 – 12.30"],
            ["Maandag", "gesloten"],
          ].map(([d, u]) => (
            <div key={d} className="flex justify-between gap-4">
              <dt className="whitespace-nowrap text-[#3b2a1e]/70">{d}</dt>
              <dd className="whitespace-nowrap">{u}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 border-t border-[#3b2a1e]/10 pt-3 text-xs text-[#3b2a1e]/60">Vandaag open tot 18.00</p>
      </div>
    </div>
  </div>
);

/* ── 3. Transport: strak zakelijk, wit en marine, Space Grotesk ── */

const Transport = () => (
  <div className="bg-white text-[#0d2236]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <div className="flex items-center justify-between border-b border-[#0d2236]/10 px-5 py-4 sm:px-8">
      <span className="flex items-center gap-2 text-lg font-bold tracking-[-0.01em]">
        <Truck className="h-5 w-5 text-[#1f6feb]" aria-hidden="true" /> Nevelstein
      </span>
      <span className="hidden gap-5 text-sm text-[#0d2236]/65 sm:flex">
        <span>Diensten</span>
        <span>Vloot</span>
        <span>Vacatures</span>
        <span>Offerte</span>
      </span>
    </div>
    <div className="px-5 pb-6 pt-6 sm:px-8 sm:pt-10">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#1f6feb]">Transport · Herentals</p>
      <p className="mt-3 max-w-lg text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[2.6rem]">Vrachtvervoer in de Benelux en Duitsland, op afspraak geleverd</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 rounded-md bg-[#0d2236] px-4 py-2.5 text-sm font-medium text-white">
          Offerte voor een transport <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="inline-flex items-center rounded-md border border-[#0d2236]/20 px-4 py-2.5 text-sm font-medium">Werken als chauffeur</span>
      </div>
    </div>
    <div className="grid grid-cols-3 border-t border-[#0d2236]/10 text-sm">
      {[
        ["Complete ladingen", "FTL en LTL"],
        ["Koeltransport", "2 tot 8 °C"],
        ["Vacatures", "3 chauffeurs CE"],
      ].map(([t, s], i) => (
        <div key={t} className={`px-4 py-4 sm:px-6 ${i < 2 ? "border-r border-[#0d2236]/10" : ""}`}>
          <span className="block font-semibold leading-tight">{t}</span>
          <span className="mt-1 block text-xs text-[#0d2236]/60 tabular-nums">{s}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ── 4. Kapsalon: licht en zacht, salie en blush, Outfit ── */

const Kapsalon = () => (
  <div className="bg-[#f4ebe6] text-[#2f3a2e]" style={{ fontFamily: "Outfit, sans-serif" }}>
    <div className="flex items-center justify-between px-5 py-4 sm:px-8">
      <span className="flex items-center gap-2 text-lg font-semibold tracking-[0.02em]">
        <Scissors className="h-4 w-4 text-[#6f7d6a]" aria-hidden="true" /> mirte
      </span>
      <span className="rounded-full bg-[#2f3a2e] px-4 py-1.5 text-xs font-medium text-[#f4ebe6]">Afspraak maken</span>
    </div>
    <div className="px-5 pb-8 pt-4 sm:px-8 sm:pt-8">
      <p className="text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">Knippen, kleuren en verzorgen, met de tijd die uw haar nodig heeft</p>
      <p className="mt-3 flex items-center gap-1.5 text-sm text-[#2f3a2e]/70">
        <MapPin className="h-4 w-4" aria-hidden="true" /> Kapsalon in Mol · ook op zaterdag
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/70 p-4">
          <p className="text-sm font-medium">Vrij deze week</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm tabular-nums">
            {["Do 14.30", "Vr 10.00", "Vr 16.15", "Za 9.00"].map((t) => (
              <span key={t} className="rounded-full border border-[#6f7d6a]/40 px-3 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white/70 p-4 text-sm">
          <p className="font-medium">Prijzen</p>
          <dl className="mt-2 space-y-1 tabular-nums">
            {[
              ["Knippen dames", "vanaf € 38"],
              ["Knippen heren", "€ 26"],
              ["Kleuren", "vanaf € 55"],
            ].map(([d, p]) => (
              <div key={d} className="flex justify-between gap-4">
                <dt className="text-[#2f3a2e]/70">{d}</dt>
                <dd className="whitespace-nowrap">{p}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const VOORBEELDEN = [
  {
    sector: "Een dakwerker",
    stijl: "Robuust en donker",
    adres: "www.uwbedrijf.be",
    uitleg: "Stevige letters en een donkere basis met een koperen accent: dat past bij vakwerk dat jaren moet meegaan. Wie een dakwerker zoekt, wil vooral weten of u in zijn buurt werkt en hoe snel u kunt langskomen.",
    punten: ["Werkgebied en diensten meteen in beeld", "Aanvraag met foto van het dak erbij", "Realisaties per type dak"],
    site: <Dakwerker />,
  },
  {
    sector: "Een bakkerij",
    stijl: "Warm en ambachtelijk",
    adres: "www.uwbedrijf.be",
    uitleg: "Een klassieke letter op een warme achtergrond, zoals een krijtbord in de winkel. Bij een winkel draait alles om openingsuren en wat er vandaag te krijgen is.",
    punten: ["Openingsuren die vanzelf tonen of u nu open bent", "Taarten en ontbijtmanden online bestellen", "Uw producten en verhaal, met eigen foto's"],
    site: <Bakkerij />,
  },
  {
    sector: "Een transportbedrijf",
    stijl: "Strak en zakelijk",
    adres: "www.uwbedrijf.be",
    uitleg: "Veel wit, één heldere kleur en duidelijke cijfers: zakelijke klanten willen snel zien wat u vervoert en waarheen. En chauffeurs vinden is vaak de grootste zorg, dus vacatures krijgen een vaste plek.",
    punten: ["Diensten, vloot en regio's overzichtelijk", "Offerteaanvraag met laad- en losadres", "Vacaturepagina die chauffeurs aanspreekt"],
    site: <Transport />,
  },
  {
    sector: "Een kapsalon",
    stijl: "Licht en zacht",
    adres: "www.uwbedrijf.be",
    uitleg: "Zachte kleuren, ronde vormen en veel ruimte: rustig en verzorgd, zoals de zaak zelf. Hier willen klanten vooral weten wanneer ze terechtkunnen en wat het kost.",
    punten: ["Vrije momenten en online afspraken", "Duidelijke prijslijst", "Foto's van uw salon en uw werk"],
    site: <Kapsalon />,
  },
];


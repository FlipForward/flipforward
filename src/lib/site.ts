/**
 * Eén bron van waarheid voor bedrijfsgegevens, pakketten en FAQ.
 * Wordt gebruikt door de React-componenten én door de build (vite.config.ts)
 * voor JSON-LD, sitemap.xml en llms.txt. Pas hier aan, niet op meerdere plaatsen.
 */

export const SITE_URL = "https://flipforward.be";

export const business = {
  name: "FlipForward",
  owner: "Finn Vangronsveld",
  legalForm: "eenmanszaak",
  email: "finn@flipforward.be",
  enterpriseNumber: "1033.868.758",
  vatNumber: "BE 1033.868.758",
  vatNote: "Kleine onderneming onderworpen aan de bijzondere vrijstellingsregeling (btw-vrijgesteld)",
  street: "Middenakkers 26",
  postalCode: "2470",
  city: "Retie",
  country: "BE",
  countryName: "België",
  region: "Kempen, provincie Antwerpen",
  areaServed: ["Retie", "Kempen", "Provincie Antwerpen", "Vlaanderen", "België"],
} as const;

export const PRICE_NOTE =
  "FlipForward valt onder de vrijstellingsregeling voor kleine ondernemingen: er wordt geen btw aangerekend. De vermelde prijzen zijn eindprijzen.";

export type PackageId = "start" | "business" | "pro";

export interface Package {
  id: PackageId;
  name: string;
  audience: string;
  pages: string;
  features: string[];
  legal: string[];
  setup: number;
  setupFrom?: boolean;
  monthly: number;
  monthlyNote?: string;
  highlight?: string;
}

export const packages: Package[] = [
  {
    id: "start",
    name: "Start",
    audience: "Zelfstandigen & kleine zaken",
    pages: "Tot 5 pagina's",
    features: [
      "Mobielvriendelijk design",
      "Contactformulier",
      "Basis-SEO",
      "Kleine aanpassingen tot 30 min/maand",
    ],
    legal: ["Privacyverklaring", "Wettelijke bedrijfsgegevens"],
    setup: 1000,
    monthly: 50,
  },
  {
    id: "business",
    name: "Business",
    audience: "Kmo's die hun aanbod willen tonen",
    pages: "Tot 10 pagina's",
    features: [
      "Alles uit Start",
      "Meertalig (tot 2 talen)",
      "Zelf teksten aanpassen (CMS)",
      "SEO & vindbaarheid in AI-zoekmachines (GEO)",
      "Google Bedrijfsprofiel",
    ],
    legal: ["Privacyverklaring", "Wettelijke bedrijfsgegevens"],
    setup: 2500,
    monthly: 99,
    monthlyNote: "incl. 1 u aanpassingen/maand",
    highlight: "Meest gekozen",
  },
  {
    id: "pro",
    name: "Pro",
    audience: "B2B, meertalig, met catalogus",
    pages: "Pagina's op maat",
    features: [
      "Alles uit Business",
      "3–4 talen (bv. NL/FR/EN/DE)",
      "Doorzoekbare catalogus / assortiment",
      "Offerte-aanvraag",
      "Vacaturepagina",
    ],
    legal: ["Privacyverklaring", "Wettelijke bedrijfsgegevens", "Pagina voor je B2B-voorwaarden"],
    setup: 4500,
    setupFrom: true,
    monthly: 149,
    monthlyNote: "incl. 2 u aanpassingen/maand + kwartaalrapport",
  },
];

export const includedInAll = [
  "Domeinnaam",
  "Hosting",
  "SSL-certificaat",
  "Back-ups",
  "Updates",
  "Beveiliging",
  "Uptime-monitoring",
];

export interface AddOn {
  name: string;
  price: string;
  description: string;
}

export const addOns: AddOn[] = [
  {
    name: "Fotografie",
    price: "€ 200 eenmalig",
    description:
      "1,5 uur shoot op locatie, 15–20 nabewerkte foto's, met onbeperkt gebruiksrecht voor je eigen marketing.",
  },
  {
    name: "Extra werk buiten pakket",
    price: "€ 75 per uur",
    description: "Nieuwe functies of aanpassingen die buiten je pakket of maandelijkse uren vallen, altijd na akkoord.",
  },
  {
    name: "Extra taal",
    price: "Op aanvraag",
    description: "Een bijkomende taal bovenop de talen in je pakket.",
  },
];

export const steps = [
  {
    title: "Kennismaking",
    text: "Een vrijblijvend gesprek over je zaak, je klanten en wat je website moet doen.",
  },
  {
    title: "Voorstel & demo",
    text: "Je krijgt een concreet voorstel met het passende pakket en een eerste ontwerp om te bekijken.",
  },
  {
    title: "Bouw",
    text: "We bouwen je website in ± 2–6 weken, afhankelijk van het pakket en het aanleveren van teksten en beelden.",
  },
  {
    title: "Live + onderhoud",
    text: "Je site gaat live op je eigen domein. Hosting, updates, back-ups en beveiliging regelen wij daarna.",
  },
];

export const faqs = [
  {
    q: "Wat is de minimale looptijd?",
    a: "12 maanden vanaf de livegang. Daarna is je abonnement maandelijks opzegbaar.",
  },
  {
    q: "Van wie is het domein?",
    a: "Het domein staat op naam van de klant. Wij regelen de registratie en het technische beheer.",
  },
  {
    q: "Wat als ik wil stoppen?",
    a: "Na de minimale looptijd van 12 maanden kun je maandelijks opzeggen. Je domeinnaam staat op jouw naam en neem je mee, en je krijgt je teksten, foto's en logo's terug. Het ontwerp en de code van de website blijven eigendom van FlipForward; een overname ervan is bespreekbaar.",
  },
  {
    q: "Kan ik zelf teksten aanpassen?",
    a: "Ja, vanaf het Business-pakket via een eenvoudig beheersysteem (CMS). In het Start-pakket voeren wij kleine aanpassingen voor je uit.",
  },
  {
    q: "Werken jullie ook buiten Retie?",
    a: "Ja. We werken vooral in de Kempen en de provincie Antwerpen, maar ook verder.",
  },
  {
    q: "Zijn de prijzen inclusief btw?",
    a: "FlipForward valt onder de vrijstellingsregeling voor kleine ondernemingen en rekent geen btw aan. De vermelde prijzen zijn dus eindprijzen.",
  },
];

export const formatEuro = (n: number) =>
  "€ " + n.toLocaleString("nl-BE", { maximumFractionDigits: 0 });

export const fullAddress = `${business.street}, ${business.postalCode} ${business.city}, ${business.countryName}`;

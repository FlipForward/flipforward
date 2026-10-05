/**
 * Genereert structured data, sitemap en llms.txt uit site.ts.
 * Draait enkel in de build (vite.config.ts), niet in de browser.
 */
import { SITE_URL, business, packages, includedInAll, addOns, faqs, PRICE_NOTE, steps, formatEuro } from "./site";

export const publicRoutes = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/privacyverklaring", priority: "0.3", changefreq: "yearly" },
  { path: "/algemene-voorwaarden", priority: "0.3", changefreq: "yearly" },
];

export const routeMeta: Record<string, { title: string; description: string }> = {
  "/privacyverklaring": {
    title: "Privacyverklaring | FlipForward",
    description: "Hoe FlipForward uit Retie omgaat met je persoonsgegevens: welke gegevens, waarom, hoe lang en welke rechten je hebt.",
  },
  "/algemene-voorwaarden": {
    title: "Algemene voorwaarden | FlipForward",
    description: "De algemene voorwaarden van FlipForward voor de websitepakketten Start, Business en Pro.",
  },
  "/404": {
    title: "Pagina niet gevonden | FlipForward",
    description: "Deze pagina bestaat niet of is verplaatst.",
  },
};

export function jsonLd() {
  const orgId = `${SITE_URL}/#organisatie`;
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId,
    name: business.name,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/og-image.png`,
    image: `${SITE_URL}/og-image.png`,
    description:
      "Webbureau uit Retie dat websites bouwt en onderhoudt voor kmo's en zelfstandigen in de Kempen, als abonnement (Website as a Service).",
    email: business.email,
    founder: { "@type": "Person", name: business.owner },
    vatID: business.vatNumber.replace(/\s|\./g, ""),
    taxID: business.enterpriseNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      postalCode: business.postalCode,
      addressLocality: business.city,
      addressRegion: "Antwerpen",
      addressCountry: business.country,
    },
    areaServed: business.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    priceRange: `${formatEuro(packages[0].setup)} – ${formatEuro(packages[packages.length - 1].setup)}+`,
    currenciesAccepted: "EUR",
    knowsLanguage: "nl-BE",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Websitepakketten",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        name: `Pakket ${p.name}`,
        description: `${p.audience}. ${p.pages}, ${p.languages}. ${p.features.join(", ")}.`,
        url: `${SITE_URL}/?pakket=${p.id}#pakketten`,
        priceCurrency: "EUR",
        price: p.setup,
        priceSpecification: [
          {
            "@type": "PriceSpecification",
            name: p.setupFrom ? "Eenmalige opstartkost (vanaf)" : "Eenmalige opstartkost",
            price: p.setup,
            ...(p.setupFrom ? { minPrice: p.setup } : {}),
            priceCurrency: "EUR",
            valueAddedTaxIncluded: false,
          },
          {
            "@type": "UnitPriceSpecification",
            name: "Maandelijks abonnement",
            price: p.monthly,
            priceCurrency: "EUR",
            unitCode: "MON",
            valueAddedTaxIncluded: false,
          },
        ],
        itemOffered: { "@type": "Service", name: `Website – pakket ${p.name}`, provider: { "@id": orgId } },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: `${SITE_URL}/`,
    inLanguage: "nl-BE",
    publisher: { "@id": orgId },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return { organization, website, faqPage };
}

const script = (o: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

export function jsonLdTags(path = "/") {
  const { organization, website, faqPage } = jsonLd();
  return path === "/" ? [organization, website, faqPage].map(script).join("\n    ") : script(organization);
}

export function sitemapXml(lastmod: string) {
  const urls = publicRoutes
    .map(
      (r) =>
        `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function llmsTxt() {
  const pk = packages
    .map(
      (p) =>
        `### ${p.name}${p.highlight ? ` (${p.highlight.toLowerCase()})` : ""}\n` +
        `- Voor: ${p.audience}\n- ${p.pages}, ${p.languages}\n- ${p.features.join("; ")}\n- Juridisch: ${p.legal.join("; ")}\n` +
        `- Opstart: ${p.setupFrom ? "vanaf " : ""}${formatEuro(p.setup)} eenmalig\n` +
        `- Maandelijks: ${formatEuro(p.monthly)}${p.monthlyNote ? ` (${p.monthlyNote})` : ""}`,
    )
    .join("\n\n");

  return `# FlipForward

> FlipForward is een webbureau uit Retie (België) dat websites bouwt én onderhoudt voor kmo's en zelfstandigen in de Kempen en de provincie Antwerpen. Het model is "Website as a Service": een eenmalige opstartkost plus een vast maandbedrag voor hosting, onderhoud en aanpassingen.

## Bedrijf
- Naam: ${business.name} (handelsnaam van ${business.owner}, ${business.legalForm})
- Adres: ${business.street}, ${business.postalCode} ${business.city}, ${business.countryName}
- Ondernemingsnummer: ${business.enterpriseNumber}
- E-mail: ${business.email}
- Regio: ${business.areaServed.join(", ")}
- Website: ${SITE_URL}/

## Pakketten
${PRICE_NOTE}

${pk}

In elk pakket inbegrepen: ${includedInAll.join(", ")}.

## Extra's
${addOns.map((a) => `- ${a.name}: ${a.price}. ${a.description}`).join("\n")}

## Werkwijze
${steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join("\n")}

## Veelgestelde vragen
${faqs.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Pagina's
- [Home en pakketten](${SITE_URL}/)
- [Privacyverklaring](${SITE_URL}/privacyverklaring)
- [Algemene voorwaarden](${SITE_URL}/algemene-voorwaarden)
`;
}

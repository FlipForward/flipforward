/**
 * Genereert structured data, sitemap en llms.txt uit site.ts.
 * Draait enkel in de build (vite.config.ts), niet in de browser.
 */
import { SITE_URL, business, packages, includedInAll, addOns, faqs, PRICE_NOTE, steps, formatEuro, yearlyPrice } from "./site";

export const publicRoutes = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/website-laten-maken", priority: "0.9", changefreq: "monthly" },
  { path: "/privacyverklaring", priority: "0.3", changefreq: "yearly" },
  { path: "/algemene-voorwaarden", priority: "0.3", changefreq: "yearly" },
];

export const routeMeta: Record<string, { title: string; description: string }> = {
  "/website-laten-maken": {
    title: "Website laten maken in de Kempen – prijzen & werkwijze | FlipForward",
    description:
      `Wat kost een website laten maken in de Kempen, hoe lang duurt het en wat zit erin? Vaste prijzen vanaf ${formatEuro(packages[0].setup)}, hosting en onderhoud inbegrepen. Webdesigner uit Retie.`,
  },
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
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/og-image.png`,
    description:
      "Webbureau uit Retie dat websites bouwt en onderhoudt voor kmo's en zelfstandigen in de Kempen, als abonnement (Website as a Service).",
    email: business.email,
    telephone: business.phone.replace(/\s/g, ""),
    founder: {
      "@type": "Person",
      name: business.owner,
      jobTitle: "Oprichter en webdeveloper",
      image: `${SITE_URL}/finn-vangronsveld.webp`,
      worksFor: { "@id": orgId },
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: business.email,
      areaServed: "BE",
      availableLanguage: ["nl"],
    },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Middenakkers+26+2470+Retie",
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
    areaServed: [
      ...business.towns.map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "AdministrativeArea", name: "Kempen" } })),
      ...business.areaServed.filter((a) => a !== "Retie").map((name) => ({ "@type": "AdministrativeArea", name })),
    ],
    sameAs: [business.kboUrl],
    knowsAbout: ["Webdesign", "Website laten maken", "Websiteonderhoud", "Webhosting", "Zoekmachineoptimalisatie (SEO)", "Vindbaarheid in AI-zoekmachines (GEO)", "Google Bedrijfsprofiel"],
    slogan: "Jouw zaak verdient een website die opvalt.",
    priceRange: `${formatEuro(packages[0].setup)} – ${formatEuro(packages[packages.length - 1].setup)}+`,
    currenciesAccepted: "EUR",
    knowsLanguage: "nl-BE",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Websitepakketten",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        name: `Pakket ${p.name}`,
        description: `${p.audience}. ${p.pages}. ${p.features.join(", ")}.`,
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
  if (path === "/") return [organization, website, faqPage].map(script).join("\n    ");
  if (path === "/website-laten-maken") {
    const keys = [
      "Wat kost een website laten maken?",
      "Hoe lang duurt het om een website te laten maken?",
      "Kan ik zelf teksten aanpassen?",
      "Van wie is het domein?",
      "Werken jullie ook buiten Retie?",
    ];
    const faq = { ...faqPage, mainEntity: faqPage.mainEntity.filter((q) => keys.includes(q.name)) };
    const crumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "FlipForward", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Website laten maken", item: `${SITE_URL}/website-laten-maken` },
      ],
    };
    return [organization, faq, crumbs].map(script).join("\n    ");
  }
  return script(organization);
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
        `- Voor: ${p.audience}\n- ${p.pages}\n- ${p.features.join("; ")}\n- Juridisch: ${p.legal.join("; ")}\n` +
        `- Opstart: ${p.setupFrom ? "vanaf " : ""}${formatEuro(p.setup)} eenmalig\n` +
        `- Maandelijks: ${formatEuro(p.monthly)}${p.monthlyNote ? ` (${p.monthlyNote})` : ""}
` +
        `- Of per jaar vooruit: ${formatEuro(yearlyPrice(p))} (1 maand gratis)`,
    )
    .join("\n\n");

  return `# FlipForward

> FlipForward is een webbureau en webdesigner uit Retie (België) dat websites bouwt én onderhoudt voor kmo's en zelfstandigen in de Kempen (o.a. ${business.towns.join(", ")}) en de provincie Antwerpen. Het model is "Website as a Service": een eenmalige opstartkost plus een vast maandbedrag voor hosting, onderhoud en aanpassingen.

## Bedrijf
- Naam: ${business.name} (handelsnaam van ${business.owner}, ${business.legalForm})
- Adres: ${business.street}, ${business.postalCode} ${business.city}, ${business.countryName}
- Ondernemingsnummer: ${business.enterpriseNumber}
- Oprichter en aanspreekpunt: ${business.owner}
- Telefoon: ${business.phone}
- E-mail: ${business.email} (of via het contactformulier op de website; antwoord binnen 2 werkdagen)
- Regio: ${business.areaServed.join(", ")}
- Website: ${SITE_URL}/

## Pagina's
- [Website laten maken in de Kempen: prijzen, werkwijze en regio](${SITE_URL}/website-laten-maken)
- [Pakketten en prijzen](${SITE_URL}/#pakketten)
- [Portfolio](${SITE_URL}/#portfolio)
- [Contact](${SITE_URL}/#contact)

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

# FlipForward-website (flipforward.be)

Website van **FlipForward**, het webbureau van Finn Vangronsveld (eenmanszaak, Retie). Doel: kmo's en zelfstandigen in de
Kempen overtuigen van een "Website as a Service"-pakket (Start / Business / Pro) en een aanvraag laten indienen.
Taal: enkel Nederlands (nl-BE). Communicatie met Finn: Vlaams, informeel.

## Stack & structuur
- Vite 5 + React 18 + TypeScript + Tailwind 3 + shadcn/ui. Oorspronkelijk gegenereerd in Lovable; alle Lovable-onderdelen (Lovable Cloud/Supabase, login, admin) zijn verwijderd.
- `src/lib/site.ts` – **enige bron** voor bedrijfsgegevens, pakketten, prijzen, extra's, werkwijze en FAQ. Pas prijzen/teksten hier aan.
- `src/lib/seo.ts` – genereert JSON-LD (ProfessionalService + OfferCatalog + FAQPage), `sitemap.xml` en `llms.txt` uit `site.ts` (via plugin in `vite.config.ts`).
- `src/components/` – secties van de homepage; `hero/HeroCopy.tsx` = tekst van de hero (H1), `LegalPage.tsx` is de layout voor
  privacyverklaring en voorwaarden, `ui/` = de paar overgebleven shadcn-componenten. Een pakketknop kiest via `src/lib/selectPackage.ts`
  (event `pakket-select`) meteen het pakket in het contactformulier.
- `src/components/aceternity/` – componenten gebaseerd op de gratis registry van Aceternity UI (ui.aceternity.com), aangepast aan
  de huisstijl (oranje, reduced motion, toegankelijk). Bron staat bovenaan elk bestand. Gebruikt de library `motion` (framer-motion).
  - Hero: `ParallaxHeroImages` (projectscreenshots zweven rond de tekst en volgen de muis; bij hover de projectnaam, klik scrolt
    naar de case (`#project-…`, zie `projectAnchor`/`FEATURED` in `showcase.ts`) of opent de live site), `Spotlight`, `FlipWords` (titel).
  - Portfolio: `CometCard` (3D-tiltkaarten). Diensten/Over/Pakketten/Contact: `GlowingEffect`/`GlowCard` (rand die de muis volgt),
    Werkwijze: `Timeline`.
- `src/components/ScrollShot.tsx` – screenshot die bij hover door de pagina scrolt (enkel `transform`, geen layout-animatie).
- Portfolio (`Portfolio.tsx`): enkel deze vier, even grote kaarten in deze volgorde: Flippy (vroeger Clawd, flippy.flipforward.be), Ground Field
  (groundfield.flipforward.be, SHEQ-consultancy, Engelstalig), DriverDash, finnvangronsveld.be. `FEATURED` in `showcase.ts` volgt dezelfde lijst.
  Flippy-kaart: de vier figuurtjes (`src/assets/portfolio/flippy-pets/`, frames van de canvassen op flippy.flipforward.be, 4× nearest-neighbour)
  piepen bij hover/focus achter de bovenrand uit (`PeekingPets`, CSS `.peek-pet` in `index.css`); op touch-toestellen één keer bij in beeld komen.
  Andere projecten (ATLAZ, Hytale, Feest Op Tafel, Spuddy, …) staan enkel nog als beeld in de hero via `src/lib/showcase.ts`.
- Screenshots in `src/assets/portfolio/` (WebP; desktop 1200 px breed volledige pagina, mobiel 390×844 @2x), gemaakt met
  playwright-core + Edge. DriverDash: de lokale frontend van de getdrivendashboard-repo met onderschepte API/Supabase-calls en
  fictieve demo-ritten (namen uit de demo-seed van die backend) – nooit een account of data op de live driverdash.be aanmaken.
- Jaarlijkse betaling: altijd aanbieden, 1 maand gratis (11 maandbedragen voor 12 maanden; `yearlyPrice`/`YEARLY_FREE_MONTHS` in
  `site.ts`). Staat op de pakketkaarten, in de vergelijkingstabel, de FAQ, llms.txt, de algemene voorwaarden (art. 4 en 9, met
  `review:`) en in elke offerte. Jaarabonnement verlengt per jaar, opzegbaar tot 1 maand voor het einde, geen terugbetaling.
- Pakketten: onder de kaarten een vergelijkingstabel (`PackageComparison.tsx`, data `comparison` in `site.ts`). Business draagt
  het label "Aanrader" (niet "Meest gekozen": dat zou een verzonnen claim zijn zolang er geen klantcijfers zijn).
- Offertes: `offertes/<nummer>-<klant>/` (staat in `.gitignore`, de repo is publiek). Opgemaakt als HTML, naar PDF gerenderd met
  playwright-core + Edge (A4, max. 2 pagina's). Nummering 2026-001, 2026-002, … Altijd vermelden: "Geen btw aangerekend: bijzondere
  vrijstellingsregeling kleine ondernemingen". Wijkt een afspraak af van de algemene voorwaarden (bv. 50/50-betaling), dan staat
  dat er expliciet in ("In afwijking van artikel …").
- Facturatie: B2B-facturen aan Belgische ondernemingen moeten sinds 1/1/2026 via Peppol (e-factuur), ook als vrijgestelde kleine
  onderneming; een pdf of Stripe-factuur alleen volstaat niet. Facturen dus uit een Peppol-tool (Dexxter: nakijken of Peppol en
  terugkerende facturen intussen kunnen; begin 2026 kon terugkerend nog niet). Maandbedrag: maandelijkse factuur + klant betaalt via
  doorlopende opdracht/overschrijving. Stripe/domiciliëring pas overwegen bij meerdere abonnementsklanten.
- UI-teksten: geen uitleg-/hinttekstjes zoals "Hover om te scrollen" of "Echte websites, live online".
- Enkel donkere modus: geen themaknop meer; de donkere tokens in `src/index.css` gelden altijd (`<html class="dark">`).
- `src/hooks/useAwayTitle.ts`: andere tab-titel ("We missen je hier 🥺", …) zolang het tabblad niet actief is.
- Favicon (tab): `public/favicon.svg` = originele logo met de eerste "f" altijd zwart (#111) en "f›" oranje, transparant;
  `favicon.ico` (16/32/48) daaruit gerenderd. App-iconen (icon-192/512, apple-touch-icon) ongewijzigd: donkere achtergrond, witte f.
- Responsive gecontroleerd op 320–1920 px zonder horizontaal scrollen; dat zo houden bij nieuwe secties.
- `src/pages/` – `Index`, `PrivacyPolicy` (/privacyverklaring), `Terms` (/algemene-voorwaarden), `NotFound` (speelse 404:
  een "kapotte" IE-pagina uit 2009 die je met "Flip forward" omdraait naar een moderne kaart met links naar home/werk/pakketten/contact).
- De publieke site heeft geen backend of databank. Het contactformulier POST naar `api/contact.ts` (Vercel-functie) die een opgemaakte HTML-mail (+ tekstversie, opgebouwd in `api/_email.ts`) stuurt via SMTP van de Vimexx-mailbox.
  Env-variabelen in Vercel: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (geheim, enkel Finn), optioneel `CONTACT_TO`. Spamrem: honeypotveld `website` + rate limit.

## Beheeromgeving `/admin` (live sinds 22/10/2026, https://flipforward.be/admin)
Interne klantenadministratie voor Finn: lopende projecten, voortgang (vaste stappen tot livegang), offertes, betalingen
(opstart 50/50 + maandtermijnen) en werkuren onderhoud (t.o.v. de inbegrepen uren). **Enkel projecten die echt lopen** (vanaf
"getekend"); leads en demo's blijven in Notion ("FlipForward administratie").
- Volledig gescheiden van de publieke site: eigen ingang `admin.html` → `src/admin/main.tsx` (tweede `input` in `vite.config.ts`),
  niet geprerenderd, geen JSON-LD, `noindex` + `X-Robots-Tag` + `no-store` (vercel.json). De publieke bundel bevat geen admin- of Supabase-code
  (gecontroleerd 22/10/2026: `main-*.js` even groot als voorheen). `/admin` = `admin.html` via cleanUrls; rewrite `/admin/:path+` → `/admin` (met cleanUrls nooit naar `.html` herschrijven); in dev doet de
  plugin `adminRewrite` dat.
- Data in **Supabase** (Postgres + Auth + Storage, regio Frankfurt). Schema + RLS: `supabase/migrations/0001_admin.sql`.
  RLS laat enkel `finn@flipforward.be` toe (`public.is_admin()`); de anon-key in de frontend is dus publiek bedoeld.
  Aanmelden met magic link (`shouldCreateUser: false`). Privé-bucket `offertes` voor pdf's (upload nog niet in de UI).
  `supabase/seed-bavago.sql` = startdata voor Bavago: **enkel lokaal, staat in .gitignore** (repo is publiek, bevat klantgegevens).
- Supabase-project **`flipforward-admin`** (ref `cdvrfizyajpbhylscrkw`, org FlipForward, eu-central-1, Free; aangemaakt 22/10/2026,
  itswillhd daarvoor gepauzeerd wegens limiet 2 actieve gratis projecten). Migratie + seed uitgevoerd. Auth: signups uit,
  enige gebruiker finn@flipforward.be, Site URL `https://flipforward.be/admin`, redirect-URL's flipforward.be/admin**, localhost:*/admin**
  en de Vercel-previews. Custom SMTP = formulieren@flipforward.be (Vimexx, door Finn ingesteld). Lokaal: `.env.local` (niet in git).
- Vercel: `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (publishable key, type Config) staan op Production en Preview.
- Zonder `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` draait `/admin` in `npm run dev` op **fictieve** voorbeelddata in localStorage
  (`src/admin/voorbeeld.ts`, badge "lokaal · voorbeelddata"); in een productiebuild toont het dan enkel "niet ingesteld".
- Code: `store.ts` (Supabase/lokaal), `data.tsx` (alle rijen in één context, herladen na elke wijziging), `logica.ts` (vaste stappen,
  opstartfacturen, datums), `facturen.ts` (facturatieplanning), `FactuurLijst.tsx`, `pages/` (Overzicht, ProjectPagina, NieuwProject).
- **Facturatie** (`facturen.ts`, migratie `0002_facturatie.sql`): opstart = 2 rijen (50% bij akkoord, 50% bij livegang). Onderhoud wordt
  **berekend**, niet vooraf als rijen opgeslagen: vanaf `start_onderhoud`, `facturatie` maandelijks (elke maand; in de eerste
  `looptijd_maanden` enkel de eerste `termijnen` maanden, bv. Bavago 11 van 12) of jaarlijks (per jaar vooruit, 11 maandbedragen,
  zoals art. 9 van de voorwaarden). Klik op "Factuur verstuurd" maakt de rij aan (`soort termijn`, `periode` = sleutel, vervaldatum
  +14 d); daarna "Betaald". Status: te factureren → wacht op betaling (→ te laat) → betaald. Project op "gestopt" = geen nieuwe facturen.
  Overzicht toont: nu te factureren (≤ 7 d, ook achterstallige), wacht op betaling, binnenkort (45 d), recent betaald (90 d).
- De publieke site zet nog steeds geen cookies; de Supabase-sessie (localStorage) bestaat enkel voor Finn op `/admin`.

## SEO & GEO
- Doelzoekwoorden (lokaal, haalbaar): "webdesign Kempen/Retie", "website laten maken (Kempen)", "webdesigner + gemeente". Het
  nationale "webdesign bureau" is geen realistisch doel op korte termijn.
- Homepage: titel/description in `index.html` bevatten "Webdesign Kempen" en "website laten maken". De H1 is het label boven de
  slogan in `HeroCopy.tsx` ("Webdesign & website laten maken · Retie, Kempen"); de grote slogan is een <p>.
- Landingspagina `/website-laten-maken` (`src/pages/WebsiteLatenMaken.tsx`): prijzen, wat erin zit, werkwijze, werk, regio, FAQ.
  Alles uit `site.ts`. JSON-LD: Organization + FAQ-subset + BreadcrumbList. Gelinkt vanuit footer en Diensten.
- Werkregio: `business.towns` in `site.ts` (gemeenten in de structured data, FAQ, landingspagina, llms.txt). **Geen aparte pagina per
  gemeente** (doorway pages worden door Google afgestraft); liever echte inhoud (bv. later case-pagina's per project).
- Structured data: `sameAs` = KBO-fiche, `knowsAbout`, `areaServed` met City-items. FAQ-prijzen worden uit de pakketten berekend.
- Bij navigatie naar een andere route scrolt `App.tsx` naar boven (behalve bij een anker).

## Draaien, bouwen, deployen
- `npm install`, `npm run dev` (poort 8080).
- `npm run build` = client-build → SSR-build van `src/entry-server.tsx` → `scripts/prerender.mjs`, dat volledige HTML schrijft voor
  `/`, `/website-laten-maken`, `/privacyverklaring`, `/algemene-voorwaarden` en `404.html`. `npm run lint` = ESLint.
  Nieuwe publieke route? Toevoegen in `scripts/prerender.mjs`, `src/lib/seo.ts` (publicRoutes/routeMeta) en `App.tsx`.
- Hosting: **Vercel Pro**, team `flipforward` (URL-slug; preview-URL's eindigen op `-flipforward.vercel.app`), project `flipforward` (prj_LWfhFyDOlOHL5VuKbWzEPHdRuZ70).
  Push naar `main` = productie; elke andere branch = preview-URL. Config in `vercel.json` (redirects `/privacy` en `/terms`
  naar de Nederlandse URL's, rewrites, cache- en security-headers).
- OG-afbeelding: `scripts/og-image.svg` → `public/og-image.png` (1200×630, gerenderd met @resvg/resvg-js).

## Conventies & beslissingen
- Geen verzonnen klanten, getuigenissen, cijfers of juridische regelingen. Getuigenissen enkel echt (lijst in `Testimonials.tsx`, sectie verborgen zolang leeg).
- Geen cookies of tracking (ook geen login meer) → geen cookiebanner. Wie analytics toevoegt, moet de privacyverklaring en consent opnieuw bekijken.
- Btw: kleine onderneming onder vrijstellingsregeling → prijzen zijn eindprijzen, "geen btw aangerekend".
- Contrast WCAG AA: knoppen gebruiken `--primary` (10 89% 46%); oranje tekst `--accent` is 42% in licht, 55% in donker.
- Juridische passages die nagelezen moeten worden, hebben `review:` in `Terms.tsx`/`PrivacyPolicy.tsx`; zichtbaar gemarkeerd op preview, niet op flipforward.be.
- Kleine, logische commits in het Nederlands.

## Open / te bevestigen door Finn
- [x] Supabase opgezet (22/10/2026): project, schema, seed, auth, SMTP, Vercel-variabelen op Preview.
- [x] Beheeromgeving live (22/10/2026): variabelen op Production, `admin-backend` gemerged naar `main`.
- [ ] Oude commits `665a56a`, `9fedf25`, `18adabb` (bevatten klantgegevens Bavago, uit de branch verwijderd) laten wissen via
      GitHub Support ("remove sensitive data"); de repo is publiek, dus nooit klantgegevens committen.
- [ ] Oude preview-redirect `https://flipforward-*-finnvangronsvelds-projects.vercel.app/admin**` mag weg in Supabase (team heet nu `flipforward`).
- [ ] Later: pdf-upload naar de bucket `offertes`, export naar boekhouding, eventueel een klantportaal (klant ziet zijn voortgang).
- [x] E-mail op de site: `finn@flipforward.be` (Vimexx-mailbox).
- [x] DNS blijft bij Vimexx (domein gekoppeld aan mailhosting, beheer via DirectAdmin): A @ → 76.76.21.21, CNAME www → cname.vercel-dns.com. Mailrecords (MX spamrelay.zxcs.nl, SPF, DKIM x._domainkey, DMARC, mail/smtp/pop/ftp) ongewijzigd. Live sinds 05/10/2026.
- [x] SMTP-variabelen in Vercel gezet. [x] Contactformulier live getest door Finn: werkt (07/10/2026).
- [x] Lovable-project verwijderd (staat niet meer in de Lovable-workspace, gecontroleerd 06/10/2026).
- [ ] Juridische nalezing van algemene voorwaarden en privacyverklaring (gemarkeerde passages).
- [x] Prijs add-on "Extra taal": blijft bewust "op aanvraag" (beslissing Finn, 07/10/2026).
- [x] Foto van Finn toegevoegd (`src/assets/finn.webp`, 320×320 crop).
- [x] ATLAZ = eigen project (Finn is zelf DJ/producer ATLAZ; zo ook in zijn portfolio-repo). Label en tekst aangepast.
- [ ] Verwerkers in privacyverklaring bevestigen (Dexxter nog in gebruik?).
- [x] Redesign gemerged naar `main` en live (07/10/2026).
- [x] Speelse 404 en projectnamen in de hero gemerged naar `main` en live (07/10/2026).
- [ ] SEO buiten de code (Finn): Google Search Console (domein verifiëren via DNS bij Vimexx + sitemap indienen), Google
  Bedrijfsprofiel aanmaken (categorie "Webdesigner", servicegebied Kempen, foto's, reviews vragen aan klanten), Bing Webmaster
  Tools, vermelding in gidsen (bv. Gouden Gids, Unizo).
- [ ] Links naar flipforward.be op eigen projecten (14/10/2026): finnvangronsveld.be ✓ ("Founder of FlipForward" + Person-JSON-LD),
  driverdash.be ✓ (footer, via JS). atlazmusic.be: commit 4d67277 gepusht maar nog niet zichtbaar live, nakijken hoe die site
  deployt; let op: lokaal staat in de atlazmusicbe-map een niet-gecommitte redesign (eerst pullen/stashen). Hytale Vlaanderen (Lovable):
  nog te doen. Ground Field moet nog nagekeken worden of het een klant of een voorbeeld is (label nu "Website · SHEQ-consultancy").
- [ ] Bavago BV (Herentals, hydraulica): voorbeeld op bavago.flipforward.be, Bart Van Gorp vroeg prijs + afspraak (14/10/2026).
  Offerte 2026-001 opgesteld (Business, € 2.000 opstart na € 500 introductiekorting in ruil voor referentie, € 99/maand,
  50/50-betaling, maandelijks of per jaar € 1.089 met 1 maand gratis). Afspraak nog vast te leggen (bij voorkeur rond 16 u bij hen).
- [x] Labels: DriverDash = eigen project (webapp), Flippy (ex-Clawd) = eigen project (desktop-tool).
- [x] Licentie Aceternity UI nagelezen (07/10/2026): gratis componenten mogen in persoonlijke én commerciële/klantprojecten,
  zonder verplichte naamsvermelding. Niet toegestaan: de componenten zelf doorverkopen of herverdelen (als template, componentbibliotheek
  of op een marketplace). Bron: FAQ op ui.aceternity.com/pricing en ui.aceternity.com/licence. Gebruik dus ook voor klantensites oké.

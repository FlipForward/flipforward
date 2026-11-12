# FlipForward-website (flipforward.be)

Website van **FlipForward**, het webbureau van Finn Vangronsveld (eenmanszaak, Retie). Doel: kmo's en zelfstandigen in de
Kempen overtuigen van een "Website as a Service"-pakket (Start / Business / Pro) en een aanvraag laten indienen.
Taal: enkel Nederlands (nl-BE). Communicatie met Finn: Vlaams, informeel.

## Redesign en prijzen (11/11/2026, branch `prijzen-en-redesign`, nog niet live)
Dit blok gaat voor op oudere regels verderop (donkere modus, Aceternity-hero, vergelijkingstabel op de homepage).
- **Prijzen** (keuze Finn): opstart Start € 500, Business € 1.500, Pro vanaf € 3.000; maandbedragen (€ 50/99/149), looptijd en
  jaarbetaling ongewijzigd. Staat ook in de app: branch `prijzen-opstart` (worktree `app/.claude/worktrees/prijzen-opstart`):
  `src/lib/offerte.ts`, `server/mail.ts`, `server/leadzoeker/beoordeel.ts`. Beide branches samen live zetten.
- **Stijl** (Finn koos als referentie dennissnellenberg.com en cuberto.com; drie statische voorstellen vond hij te kaal): licht thema
  (papierwit `--background`, inktzwart, donkere vlakken via `.on-ink`), het oranje van het logo als enige accent, één lettertype
  **Host Grotesk** (variabel, zelf gehost in `public/fonts/`, voorgeladen in `index.html`), koppen in gewicht 400 met grote maat.
  Geen pillen boven koppen, geen oranje woord in koppen, geen hoofdletterlabels, geen gloed of dubbele randen.
- **Beweging** (`src/components/motion/`): `Marquee` (rollende band met beroepen, versnelt en keert om met het scrollen),
  `Magnetic` (knoppen en menulinks trekken naar de muis), `Reveal` (blok komt in beeld; in de geprerenderde HTML is alles zichtbaar).
  Hero-titel komt woord per woord in beeld via CSS (`.rise`); de inleiding verschuift enkel, zonder vervagen, zodat ze meteen als
  LCP telt. Knoppen: `.ff-btn` + `.ff-btn-primary|ink|line` in `index.css` (vlak schuift van onderuit in). Alles uit bij "minder beweging".
- **Homepage** (`Index.tsx`): Hero → Werk (`Portfolio.tsx`: desktop lijst met voorbeeld dat de muis volgt, gsm/tablet swipe-rij;
  beelden `*-thumb.webp` 800×600, met ffmpeg uit de volledige screenshots gesneden) → Prijzen (`Pricing.tsx`) → Wie en hoe
  (`About.tsx`, bevat ook `#werkwijze`) → Vragen → Contact. Anker-id's zijn dezelfde gebleven (`portfolio`, `pakketten`, `over`,
  `werkwijze`, `faq`, `contact`). Geen groot projectvenster in de hero (Finn vond dat niks). De vergelijkingstabel staat nu op
  `/website-laten-maken`. Niet meer gebruikt, nog op te ruimen: `Services.tsx`, `HowItWorks.tsx`, `ScrollShot.tsx`,
  `hero/HeroCopy.tsx`, `components/aceternity/`.
- **Lengte**: gsm (390×844) 6.677 px = 7,9 schermen (was 10.562 = 12,5); desktop (1440×900) 5.951 px = 6,6 schermen (was 10.848 = 12).
- **Controles** (Lighthouse op de productiebuild, lokaal): toegankelijkheid 100, SEO 100, best practices 100; prestaties desktop 100,
  gsm 95–98 (LCP 2,5–2,7 s gesimuleerd traag toestel, CLS 0). Na deploy de live site op CSP-fouten nakijken.
- **Navigatie en scrollen** (12/11/2026): het logo scrolt op de homepage naar boven (`scrollToTop` in `ScrollToTop.tsx`). Ankers
  landen juist onder de vaste nav via `scroll-padding-top` op `html` (4rem gsm, 5rem vanaf sm): zet geen `scroll-mt-*` op secties
  (dat telde vroeger dubbel), enkel `scroll-mt-6` waar een sectie geen eigen bovenruimte heeft (`#portfolio`). Knop "Terug naar
  boven" rechtsonder (`ScrollToTop`, op de homepage en `/website-laten-maken`): verschijnt na één schermhoogte en verdwijnt
  zolang het contactformulier in beeld is. Doorveren op gsm: `html:has(footer.on-ink)` is inktzwart (kleur van de footer) en
  `body::before` houdt de bovenkant papierwit; niet op een echte iPhone nagekeken.
- `/admin` houdt zijn donkere kleuren via het `.dark`-blok onderaan `index.css`.
- De preview in de Claude-app vindt `.claude/launch.json` van deze map niet als de sessie elders startte: dan `npx vite --port 8080`.

- Vite 5 + React 18 + TypeScript + Tailwind 3 + shadcn/ui. Oorspronkelijk gegenereerd in Lovable; alle Lovable-onderdelen (Lovable Cloud/Supabase, login, admin) zijn verwijderd.
- `src/lib/site.ts` – **enige bron** voor bedrijfsgegevens, pakketten, prijzen, extra's, werkwijze en FAQ. Pas prijzen/teksten hier aan.
- `src/lib/seo.ts` – genereert JSON-LD (ProfessionalService + OfferCatalog + FAQPage), `sitemap.xml` en `llms.txt` uit `site.ts` (via plugin in `vite.config.ts`).
- `src/components/` – secties van de homepage; `hero/HeroCopy.tsx` = tekst van de hero (H1), `LegalPage.tsx` is de layout voor
  privacyverklaring en voorwaarden, `ui/` = de paar overgebleven shadcn-componenten. Een pakketknop kiest via `src/lib/selectPackage.ts`
  (event `pakket-select`) meteen het pakket in het contactformulier.
- (Niet meer gebruikt sinds 11/11/2026, zie bovenaan.) `src/components/aceternity/` – componenten gebaseerd op de gratis registry van Aceternity UI (ui.aceternity.com), aangepast aan
  de huisstijl (oranje, reduced motion, toegankelijk). Bron staat bovenaan elk bestand. Gebruikt de library `motion` (framer-motion).
  - Hero: `ParallaxHeroImages` (projectscreenshots zweven rond de tekst en volgen de muis; bij hover de projectnaam, klik scrolt
    naar de case (`#project-…`, zie `projectAnchor`/`FEATURED` in `showcase.ts`) of opent de live site), `Spotlight`, `FlipWords` (titel).
  - Portfolio: `CometCard` (3D-tiltkaarten). Diensten/Over/Pakketten/Contact: `GlowingEffect`/`GlowCard` (rand die de muis volgt),
    Werkwijze: `Timeline`.
- `src/components/ScrollShot.tsx` – screenshot die bij hover door de pagina scrolt (enkel `transform`, geen layout-animatie).
- Portfolio (`Portfolio.tsx`): enkel deze vier, even grote kaarten in deze volgorde: Bavago (sinds 4/11/2026 op vraag van Finn in de plaats van Flippy; live op bavago.be (link https://bavago.be);
  in de hero op de grote plek rechts waar Flippy stond, Flippy op de vroegere plek van Feest Op Tafel), Ground Field
  (groundfield.flipforward.be, SHEQ-consultancy, Engelstalig), DriverDash, finnvangronsveld.be. `FEATURED` in `showcase.ts` volgt dezelfde lijst.
  Flippy staat enkel nog in de hero. `PeekingPets` (nu door geen kaart gebruikt, `peek: true` zet het terug aan): de vier figuurtjes (`src/assets/portfolio/flippy-pets/`, frames van de canvassen op flippy.flipforward.be, 4× nearest-neighbour)
  piepen bij hover/focus achter de bovenrand uit (`PeekingPets`, CSS `.peek-pet` in `index.css`); op touch-toestellen één keer bij in beeld komen.
  Andere projecten (Flippy, ATLAZ, Hytale, Spuddy, …; Bavago verving Feest Op Tafel op 4/11/2026) staan enkel nog als beeld in de hero via `src/lib/showcase.ts`.
- **/voorbeelden** (4/11/2026, `src/pages/Voorbeelden.tsx`): pagina voor de koude mails van de Mailcampagne (FlipForward-app).
  Niet in menu of sitemap, `noindex` (meta via prerender + `X-Robots-Tag` in vercel.json). Waarom een website, vier verzonnen
  bedrijven in vier huisstijlen (dakwerker/Oswald, bakkerij/Fraunces, transport/Space Grotesk, kapsalon/Outfit, self-hosted via
  @fontsource), wat erbij zit en het gratis voorbeeld (mailto, geen telefoonnummer: dat staat bewust niet meer op de site).
- Screenshots in `src/assets/portfolio/` (WebP; desktop 1200 px breed volledige pagina, mobiel 390×844 @2x), gemaakt met
  playwright-core + Edge. DriverDash: de lokale frontend van de getdrivendashboard-repo met onderschepte API/Supabase-calls en
  fictieve demo-ritten (namen uit de demo-seed van die backend) – nooit een account of data op de live driverdash.be aanmaken.
- Jaarlijkse betaling: altijd aanbieden, 1 maand gratis (11 maandbedragen voor 12 maanden; `yearlyPrice`/`YEARLY_FREE_MONTHS` in
  `site.ts`). Staat op de pakketkaarten, in de vergelijkingstabel, de FAQ, llms.txt, de algemene voorwaarden (art. 4 en 9, met
  `review:`) en in elke offerte. Jaarabonnement verlengt per jaar, opzegbaar tot 1 maand voor het einde, geen terugbetaling.
- Pakketten: de vergelijkingstabel (`PackageComparison.tsx`, data `comparison` in `site.ts`) staat op `/website-laten-maken`, niet meer op de homepage. Business draagt
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
- Licht thema sinds het redesign van 11/11/2026 (zie bovenaan); geen themaknop. Enkel `/admin` is nog donker (`admin.html` heeft `class="dark"`).
- `src/hooks/useAwayTitle.ts`: andere tab-titel ("We missen je hier", …; zonder emoji sinds 12/11/2026) zolang het tabblad niet actief is.
- Favicon (tab): `public/favicon.svg` = originele logo met de eerste "f" altijd zwart (#111) en "f›" oranje, transparant;
  `favicon.ico` (16/32/48) daaruit gerenderd. App-iconen (icon-192/512, apple-touch-icon) ongewijzigd: donkere achtergrond, witte f.
- Responsive gecontroleerd op 320–1920 px zonder horizontaal scrollen; dat zo houden bij nieuwe secties.
- Gsm-layout (30/10/2026, Finn vond mobiel "utter ass"): hero zonder zwevende screenshots (`max-md:hidden`) en met knoppen op volle
  breedte; `GlowCard` heeft op gsm één rand (geen kaart-in-kaart); voordeel- en dienstkaarten compact met icoon naast de titel,
  dienstillustraties pas vanaf `sm`; pakketten op gsm/tablet als swipe-rij (Business start in het midden), vergelijkingstabel pas vanaf
  `md`; cases tonen op gsm enkel de eerste alinea. Homepage op gsm ± 10.700 px (was 16.000). Nieuwe secties: eerst op 375 px screenshotten.
- SEO/GEO-audit (30/10/2026, score 92%): opgelost: img width/height + `fetchpriority` op de eerste hero-afbeelding, CSP/HSTS/COOP/CORP
  in vercel.json, AI-crawlers in `robots.txt`, `/.well-known/security.txt`, Person `url`/`sameAs`, meta descriptions ≤ 150 tekens,
  hero-screenshots klikbaar via JS i.p.v. links in een `aria-hidden`-blok, honeypot met `inert`. Niet aangeraakt: DMARC `p=none` en
  MTA-STS (mailrecords, Finn) en de "AI-tekst"-opmerking over de copy (Finn beslist).
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
- [ ] **Redesign + nieuwe prijzen** (11/11/2026): Finn heeft de preview van `prijzen-en-redesign` in Vercel zelf naar productie gezet;
      `main` loopt dus achter. De branch moet nog naar `main` (anders zet de volgende push naar `main` de oude site terug), samen met
      de app-branch `prijzen-opstart`. `/unslop` is gedraaid zonder video (keuze Finn): resttekens zaten op `/voorbeelden` en de 404.
- [ ] Formuliermail (`api/_email.ts`) staat in de nieuwe stijl en is soberder gemaakt voor spamfilters (geen verborgen voorvertoning,
      geen externe afbeelding, korte mailto). SPF, DKIM (`x._domainkey`) en DMARC (`p=none`) bestaan; of de mail nog als spam
      gemarkeerd wordt, moet Finn nakijken in de headers van een nieuwe testmail (mailrecords zijn zijn werk).
- [x] **Huurformule** (beslissing Finn, 12/11/2026): Start € 100/maand en Business € 199/maand, geen opstart, maandbedrag vanaf het
      akkoord (niet vanaf livegang), minimaal 24 maanden, per jaar = 1 maand gratis, geen overname van ontwerp en code. Pro niet.
      In `site.ts` (`rent`, `RENT_MONTHS`, `rentYearly`), blok "Liever geen opstart" in `Pricing.tsx`, FAQ, vergelijkingstabel,
      `/website-laten-maken`, llms.txt en de voorwaarden (art. 2, 3, 4, 9, 11; juridisch nog na te lezen). In de app: `huur` in
      `offerte.ts` + schakelaar in de offertebuilder (branch `prijzen-opstart`). Het contactformulier heeft geen aparte huurkeuze.
- [x] Lopende offertes en bestaande klanten (o.a. Bavago, Business aan € 2.000) blijven zoals ze zijn; de nieuwe prijzen gelden enkel
      voor nieuwe offertes (beslissing Finn, 11/11/2026).
- [ ] `npm run lint` geeft 2 fouten in `ui/textarea.tsx` en `tailwind.config.ts` (bestonden al vóór het redesign).
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
- [x] **Google Search Console (04/11/2026)**: property "URL-voorvoegsel" `https://flipforward.be/`, eigenaar **finn@flipforward.be**
      (in Chrome het tweede account, `/u/1/`), geverifieerd met de metatag `google-site-verification` in `index.html` → **nooit
      verwijderen** (geen HTML-bestand: `cleanUrls` zou dat omleiden). Sitemap `sitemap.xml` ingediend (eerst "Couldn't fetch",
      normaal bij een nieuwe property; morgen nakijken). Indexering aangevraagd voor `/` (stond al op Google) en `/website-laten-maken`.
      `/voorbeelden` bewust niet (noindex). Later eventueel een domein-property via DNS-TXT bij Vimexx (Finn).
- [ ] SEO buiten de code (Finn): Google
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

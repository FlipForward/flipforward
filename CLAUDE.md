# FlipForward-website (flipforward.be)

Website van **FlipForward**, het webbureau van Finn Vangronsveld (eenmanszaak, Retie). Doel: kmo's en zelfstandigen in de
Kempen overtuigen van een "Website as a Service"-pakket (Start / Business / Pro) en een aanvraag laten indienen.
Taal: enkel Nederlands (nl-BE). Communicatie met Finn: Vlaams, informeel.

## Stack & structuur
- Vite 5 + React 18 + TypeScript + Tailwind 3 + shadcn/ui. Oorspronkelijk gegenereerd in Lovable; alle Lovable-onderdelen (Lovable Cloud/Supabase, login, admin) zijn verwijderd.
- `src/lib/site.ts` – **enige bron** voor bedrijfsgegevens, pakketten, prijzen, extra's, werkwijze en FAQ. Pas prijzen/teksten hier aan.
- `src/lib/seo.ts` – genereert JSON-LD (ProfessionalService + OfferCatalog + FAQPage), `sitemap.xml` en `llms.txt` uit `site.ts` (via plugin in `vite.config.ts`).
- `src/components/` – secties van de homepage; `LegalPage.tsx` is de layout voor privacyverklaring en voorwaarden.
- `src/components/aceternity/` – componenten gebaseerd op de gratis registry van Aceternity UI (ui.aceternity.com), aangepast aan
  de huisstijl (oranje, reduced motion, toegankelijk). Bron staat bovenaan elk bestand. Gebruikt de library `motion` (framer-motion).
  - Hero: `ParallaxHeroImages` (projectscreenshots zweven rond de tekst en volgen de muis; bij hover de projectnaam, klik scrolt
    naar de case (`#project-…`, zie `projectAnchor`/`FEATURED` in `showcase.ts`) of opent de live site), `Spotlight`, `FlipWords` (titel).
  - Portfolio: `CometCard` (3D-tiltkaarten). Diensten/Over/Pakketten/Contact: `GlowingEffect`/`GlowCard` (rand die de muis volgt),
    Werkwijze: `Timeline`.
- `src/components/ScrollShot.tsx` – screenshot die bij hover door de pagina scrolt (enkel `transform`, geen layout-animatie).
- Portfolio (`Portfolio.tsx`): enkel deze vier, even grote kaarten in deze volgorde: finnvangronsveld.be, DriverDash, Flippy (vroeger Clawd, flippy.flipforward.be), ATLAZ.
  Flippy-kaart: de vier figuurtjes (`src/assets/portfolio/flippy-pets/`, frames van de canvassen op flippy.flipforward.be, 4× nearest-neighbour)
  piepen bij hover/focus achter de bovenrand uit (`PeekingPets`, CSS `.peek-pet` in `index.css`); op touch-toestellen één keer bij in beeld komen.
  Andere projecten (Hytale, Feest Op Tafel, Spuddy, …) staan enkel nog als beeld in de hero via `src/lib/showcase.ts`.
- Screenshots in `src/assets/portfolio/` (WebP; desktop 1200 px breed volledige pagina, mobiel 390×844 @2x), gemaakt met
  playwright-core + Edge. DriverDash: de lokale frontend van de getdrivendashboard-repo met onderschepte API/Supabase-calls en
  fictieve demo-ritten (namen uit de demo-seed van die backend) – nooit een account of data op de live driverdash.be aanmaken.
- UI-teksten: geen uitleg-/hinttekstjes zoals "Hover om te scrollen" of "Echte websites, live online".
- Enkel donkere modus: geen themaknop meer; de donkere tokens in `src/index.css` gelden altijd (`<html class="dark">`).
- `src/hooks/useAwayTitle.ts`: andere tab-titel ("We missen je hier 🥺", …) zolang het tabblad niet actief is.
- Favicon (tab): `public/favicon.svg` = originele logo met de eerste "f" altijd zwart (#111) en "f›" oranje, transparant;
  `favicon.ico` (16/32/48) daaruit gerenderd. App-iconen (icon-192/512, apple-touch-icon) ongewijzigd: donkere achtergrond, witte f.
- Responsive gecontroleerd op 320–1920 px zonder horizontaal scrollen; dat zo houden bij nieuwe secties.
- `src/pages/` – `Index`, `PrivacyPolicy` (/privacyverklaring), `Terms` (/algemene-voorwaarden), `NotFound` (speelse 404:
  een "kapotte" IE-pagina uit 2009 die je met "Flip forward" omdraait naar een moderne kaart met links naar home/werk/pakketten/contact).
- Geen backend of databank. Het contactformulier POST naar `api/contact.ts` (Vercel-functie) die een opgemaakte HTML-mail (+ tekstversie, opgebouwd in `api/_email.ts`) stuurt via SMTP van de Vimexx-mailbox.
  Env-variabelen in Vercel: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (geheim, enkel Finn), optioneel `CONTACT_TO`. Spamrem: honeypotveld `website` + rate limit.

## Draaien, bouwen, deployen
- `npm install`, `npm run dev` (poort 8080).
- `npm run build` = client-build → SSR-build van `src/entry-server.tsx` → `scripts/prerender.mjs`, dat volledige HTML schrijft voor
  `/`, `/privacyverklaring`, `/algemene-voorwaarden` en `404.html`.
  Nieuwe publieke route? Toevoegen in `scripts/prerender.mjs`, `src/lib/seo.ts` (publicRoutes/routeMeta) en `App.tsx`.
- Hosting: **Vercel Pro**, team `finnvangronsvelds-projects`, project `flipforward` (prj_LWfhFyDOlOHL5VuKbWzEPHdRuZ70).
  Push naar `main` = productie; elke andere branch = preview-URL. Config in `vercel.json` (redirects, rewrites, headers).
- OG-afbeelding: `scripts/og-image.svg` → `public/og-image.png` (1200×630, gerenderd met @resvg/resvg-js).

## Conventies & beslissingen
- Geen verzonnen klanten, getuigenissen, cijfers of juridische regelingen. Getuigenissen enkel echt (lijst in `Testimonials.tsx`, sectie verborgen zolang leeg).
- Geen cookies of tracking (ook geen login meer) → geen cookiebanner. Wie analytics toevoegt, moet de privacyverklaring en consent opnieuw bekijken.
- Btw: kleine onderneming onder vrijstellingsregeling → prijzen zijn eindprijzen, "geen btw aangerekend".
- Contrast WCAG AA: knoppen gebruiken `--primary` (10 89% 46%); oranje tekst `--accent` is 42% in licht, 55% in donker.
- Juridische passages die nagelezen moeten worden, hebben `review:` in `Terms.tsx`/`PrivacyPolicy.tsx`; zichtbaar gemarkeerd op preview, niet op flipforward.be.
- Kleine, logische commits in het Nederlands.

## Open / te bevestigen door Finn
- [x] E-mail op de site: `finn@flipforward.be` (Vimexx-mailbox).
- [x] DNS blijft bij Vimexx (domein gekoppeld aan mailhosting, beheer via DirectAdmin): A @ → 76.76.21.21, CNAME www → cname.vercel-dns.com. Mailrecords (MX spamrelay.zxcs.nl, SPF, DKIM x._domainkey, DMARC, mail/smtp/pop/ftp) ongewijzigd. Live sinds 05/10/2026.
- [x] SMTP-variabelen in Vercel gezet. [ ] Contactformulier één keer live testen.
- [x] Lovable-project verwijderd (staat niet meer in de Lovable-workspace, gecontroleerd 06/10/2026).
- [ ] Juridische nalezing van algemene voorwaarden en privacyverklaring (gemarkeerde passages).
- [ ] Prijs add-on "Extra taal" (nu "op aanvraag").
- [x] Foto van Finn toegevoegd (`src/assets/finn.webp`, 320×320 crop).
- [ ] Is ATLAZ een eigen project of een klant? (portfolio-label)
- [ ] Verwerkers in privacyverklaring bevestigen (Dexxter nog in gebruik?).
- [x] Redesign gemerged naar `main` en live (07/10/2026).
- [x] Speelse 404 en projectnamen in de hero gemerged naar `main` en live (07/10/2026).
- [ ] Labels bevestigen: DriverDash (eigen project of klant?), Flippy ("eigen project · desktop-tool").
- [ ] Licentie van Aceternity UI nalezen voor commercieel gebruik.

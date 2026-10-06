# FlipForward-website (flipforward.be)

Website van **FlipForward**, het webbureau van Finn Vangronsveld (eenmanszaak, Retie). Doel: kmo's en zelfstandigen in de
Kempen overtuigen van een "Website as a Service"-pakket (Start / Business / Pro) en een aanvraag laten indienen.
Taal: enkel Nederlands (nl-BE). Communicatie met Finn: Vlaams, informeel.

## Stack & structuur
- Vite 5 + React 18 + TypeScript + Tailwind 3 + shadcn/ui. Oorspronkelijk gegenereerd in Lovable; alle Lovable-onderdelen (Lovable Cloud/Supabase, login, admin) zijn verwijderd.
- `src/lib/site.ts` – **enige bron** voor bedrijfsgegevens, pakketten, prijzen, extra's, werkwijze en FAQ. Pas prijzen/teksten hier aan.
- `src/lib/seo.ts` – genereert JSON-LD (ProfessionalService + OfferCatalog + FAQPage), `sitemap.xml` en `llms.txt` uit `site.ts` (via plugin in `vite.config.ts`).
- `src/components/` – secties van de homepage; `LegalPage.tsx` is de layout voor privacyverklaring en voorwaarden.
- `src/pages/` – `Index`, `PrivacyPolicy` (/privacyverklaring), `Terms` (/algemene-voorwaarden), `NotFound`.
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

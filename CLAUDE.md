# FlipForward-website (flipforward.be)

Website van **FlipForward**, het webbureau van Finn Vangronsveld (eenmanszaak, Retie). Doel: kmo's en zelfstandigen in de
Kempen overtuigen van een "Website as a Service"-pakket (Start / Business / Pro) en een aanvraag laten indienen.
Taal: enkel Nederlands (nl-BE). Communicatie met Finn: Vlaams, informeel.

## Stack & structuur
- Vite 5 + React 18 + TypeScript + Tailwind 3 + shadcn/ui (oorspronkelijk gegenereerd in Lovable; Lovable wordt **niet** meer als editor gebruikt).
- `src/lib/site.ts` – **enige bron** voor bedrijfsgegevens, pakketten, prijzen, extra's, werkwijze en FAQ. Pas prijzen/teksten hier aan.
- `src/lib/seo.ts` – genereert JSON-LD (ProfessionalService + OfferCatalog + FAQPage), `sitemap.xml` en `llms.txt` uit `site.ts` (via plugin in `vite.config.ts`).
- `src/components/` – secties van de homepage; `LegalPage.tsx` is de layout voor privacyverklaring en voorwaarden.
- `src/pages/` – `Index`, `PrivacyPolicy` (/privacyverklaring), `Terms` (/algemene-voorwaarden), login + `admin/` (lazy geladen, enkel voor Finn).
- Backend: **Lovable Cloud (Supabase)**. Contactformulier schrijft naar tabel `contact_messages` en roept edge function `send-notification` aan.
  Edge functions in `supabase/functions/` worden via Lovable gedeployed, niet vanaf deze machine. `.env` bevat enkel de publieke Supabase-URL/-key.

## Draaien, bouwen, deployen
- `npm install`, `npm run dev` (poort 8080).
- `npm run build` = client-build → SSR-build van `src/entry-server.tsx` → `scripts/prerender.mjs`, dat volledige HTML schrijft voor
  `/`, `/privacyverklaring`, `/algemene-voorwaarden` en `404.html`; `spa.html` is de lege shell voor login/beheer.
  Nieuwe publieke route? Toevoegen in `scripts/prerender.mjs`, `src/lib/seo.ts` (publicRoutes/routeMeta) en `App.tsx`.
- Hosting: **Vercel Pro**, team `finnvangronsvelds-projects`, project `flipforward` (prj_LWfhFyDOlOHL5VuKbWzEPHdRuZ70).
  Push naar `main` = productie; elke andere branch = preview-URL. Config in `vercel.json` (redirects, rewrites, headers).
- OG-afbeelding: `scripts/og-image.svg` → `public/og-image.png` (1200×630, gerenderd met @resvg/resvg-js).

## Conventies & beslissingen
- Geen verzonnen klanten, getuigenissen, cijfers of juridische regelingen. Getuigenissen enkel echt (lijst in `Testimonials.tsx`, sectie verborgen zolang leeg).
- Geen cookies/tracking → geen cookiebanner. Wie analytics toevoegt, moet de privacyverklaring en consent opnieuw bekijken.
- Btw: kleine onderneming onder vrijstellingsregeling → prijzen zijn eindprijzen, "geen btw aangerekend".
- Contrast WCAG AA: knoppen gebruiken `--primary` (10 89% 46%); oranje tekst `--accent` is 42% in licht, 55% in donker.
- Juridische passages die nagelezen moeten worden, hebben `review:` in `Terms.tsx`/`PrivacyPolicy.tsx`; zichtbaar gemarkeerd op preview, niet op flipforward.be.
- Kleine, logische commits in het Nederlands.

## Open / te bevestigen door Finn
- [ ] `info@flipforward.be` bij Vimexx aanmaken → daarna `business.email` in `site.ts` aanpassen (nu nog gmail). Ook `to` in `send-notification`.
- [ ] Domein overzetten naar Vercel (DNS bij Vimexx) en www → apex redirect controleren.
- [ ] Juridische nalezing van algemene voorwaarden en privacyverklaring (gemarkeerde passages).
- [ ] Prijs add-on "Extra taal" (nu "op aanvraag").
- [ ] Foto van Finn voor "Over FlipForward" (`About.tsx`, constante `PHOTO`).
- [ ] Is ATLAZ een eigen project of een klant? (portfolio-label)
- [ ] Verwerkers in privacyverklaring bevestigen (regio Supabase-databank, Dexxter nog in gebruik?).
- [ ] Beveiliging edge function `send-notification` (geen auth, open relay naar willekeurige e-mailadressen).

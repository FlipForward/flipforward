# flipforward.be

Website van FlipForward, webbureau uit Retie. Vite + React + TypeScript + Tailwind, gehost op Vercel.

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # client + prerender van de publieke pagina's naar dist/
```

- Inhoud, pakketten en prijzen: `src/lib/site.ts`
- Contactformulier: `api/contact.ts` (Vercel-functie, mailt via SMTP; zie de env-variabelen bovenaan dat bestand)
- Meer context: `CLAUDE.md`

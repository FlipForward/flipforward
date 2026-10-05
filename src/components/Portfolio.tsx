import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

/**
 * Cases bevatten enkel feiten die op de projectsites zelf staan. Geen verzonnen cijfers.
 * Nieuwe klantcases pas toevoegen na akkoord van de klant.
 */
const projects = [
  {
    title: "Hytale Vlaanderen",
    category: "Communityplatform",
    challenge: "Een Vlaams-Nederlandse Hytale-community wilde één plek voor spelers en content creators.",
    solution: "Een communityplatform dat toont welke streamers live zijn, met speler-statistieken en een overzicht van creators.",
    result: "Live op hytalevlaanderen.be.",
    link: "https://hytalevlaanderen.be",
  },
  {
    title: "ATLAZ",
    category: "DJ / producer",
    challenge: "Een DJ en producer had een officiële plek nodig voor zijn muziek en boekingen.",
    solution: "Een website met mixes, aankomende shows en een presskit voor organisatoren.",
    result: "Live op atlazmusic.be.",
    link: "https://atlazmusic.be",
  },
  {
    title: "Persoonlijke website",
    category: "Eigen project · portfolio",
    challenge: "Een persoonlijke plek om mijn verhaal en werk te tonen.",
    solution: "Een cinematische one-page portfolio.",
    result: "Live op finnvangronsveld.be.",
    link: "https://finnvangronsveld.be",
  },
  {
    title: "Webdesign Essentials",
    category: "Eigen project · opleiding",
    challenge: "Schoolopdracht: alle opdrachten van een semester webdesign bundelen.",
    solution: "Een responsive portfolio met meerdere pagina's, eigen CSS en eigen fotografie.",
    result: "Online als portfolio van het semester.",
    link: "https://finnvangronsveld.sinners.be",
  },
];

const Portfolio = () => (
  <section id="portfolio" aria-labelledby="portfolio-title" className="py-16 sm:py-24 bg-gradient-hero scroll-mt-20">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 id="portfolio-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Ons <span className="text-accent">werk</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">Een greep uit wat we gebouwd hebben.</p>
      </div>

      <ul className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {projects.map((p) => (
          <li key={p.title}>
            <Card className="p-5 sm:p-8 bg-gradient-card border-border h-full flex flex-col">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <Badge variant="outline" className="text-accent border-accent/50 text-xs">
                  {p.category}
                </Badge>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-4 text-foreground">{p.title}</h3>
              <dl className="space-y-3 text-sm sm:text-base flex-1">
                <div>
                  <dt className="font-semibold text-foreground">Vraag</dt>
                  <dd className="text-muted-foreground">{p.challenge}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Aanpak</dt>
                  <dd className="text-muted-foreground">{p.solution}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Resultaat</dt>
                  <dd className="text-muted-foreground">{p.result}</dd>
                </div>
              </dl>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent underline underline-offset-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Bekijk de website<span className="sr-only"> van {p.title} (opent in nieuw tabblad)</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Portfolio;

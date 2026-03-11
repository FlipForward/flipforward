import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <ArrowLeft size={20} />
              <Logo className="h-8 w-auto text-foreground" />
              <span className="text-xl font-bold">FlipForward</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Algemene Voorwaarden</h1>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Identiteit van de Ondernemer</h2>
            <p>
              Naam: Finn Vangronsveld<br />
              Handelsnaam: FlipForward<br />
              KBO-nummer: BE1033868758<br />
              E-mail: finnvangronsveld@gmail.com<br />
              Adres: Middenakkers 26, 2470 Retie, België
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Toepasselijkheid</h2>
            <p>
              Deze algemene voorwaarden zijn van toepassing op elk aanbod van FlipForward en op elke tot stand gekomen overeenkomst tussen FlipForward en de opdrachtgever.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Aanbod en Overeenkomst</h2>
            <p>
              Alle offertes en aanbiedingen van FlipForward zijn vrijblijvend, tenzij uitdrukkelijk anders vermeld. Een overeenkomst komt tot stand op het moment dat de opdrachtgever een offerte schriftelijk of elektronisch aanvaardt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Prijzen en Betaling</h2>
            <p>
              Alle prijzen zijn exclusief BTW, tenzij anders vermeld. Facturen dienen binnen 30 dagen na factuurdatum betaald te worden. Bij laattijdige betaling worden wettelijke intresten aangerekend.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Levering en Uitvoering</h2>
            <p>
              FlipForward zal zich inspannen om de overeengekomen diensten binnen de afgesproken termijn te leveren. Leveringstermijnen zijn indicatief en niet bindend, tenzij uitdrukkelijk anders overeengekomen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Intellectueel Eigendom</h2>
            <p>
              Alle rechten van intellectueel eigendom op de geleverde producten en diensten berusten bij FlipForward, tenzij schriftelijk anders overeengekomen. Na volledige betaling verkrijgt de opdrachtgever een gebruiksrecht op het eindproduct.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Aansprakelijkheid</h2>
            <p>
              FlipForward is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst. De aansprakelijkheid van FlipForward is in alle gevallen beperkt tot het bedrag dat voor de betreffende opdracht in rekening is gebracht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Toepasselijk Recht</h2>
            <p>
              Op alle overeenkomsten is het Belgisch recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechtbank in België.
            </p>
          </section>

          <p className="text-sm text-muted-foreground/60 pt-4 border-t border-border">
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-BE')}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Terms;

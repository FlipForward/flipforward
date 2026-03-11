import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

const PrivacyPolicy = () => {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Gegevensverzameling</h2>
            <p>
              Wij verzamelen persoonlijke gegevens wanneer u ons contactformulier invult, zoals uw naam en e-mailadres. Daarnaast kunnen wij automatisch technische gegevens verzamelen via cookies, zoals uw IP-adres, browsertype en bezochte pagina's.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Gebruik van Gegevens</h2>
            <p>
              De verzamelde gegevens worden gebruikt om uw vragen te beantwoorden, onze diensten te verbeteren en u relevante informatie te verstrekken. Wij delen uw persoonlijke gegevens niet met derden, tenzij dit wettelijk vereist is.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Rechten van Gebruikers</h2>
            <p>
              Conform de Algemene Verordening Gegevensbescherming (AVG/GDPR) heeft u het recht om uw persoonlijke gegevens in te zien, te corrigeren of te laten verwijderen. U kunt ook bezwaar maken tegen de verwerking van uw gegevens. Neem hiervoor contact met ons op via e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Cookies</h2>
            <p>
              Onze website maakt gebruik van cookies om uw ervaring te verbeteren. U kunt uw cookie-voorkeuren beheren via uw browserinstellingen. Meer informatie over ons cookiebeleid vindt u in de cookiebanner op onze website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Contact</h2>
            <p>
              Voor vragen over dit privacybeleid kunt u contact opnemen met:
            </p>
            <p className="mt-2">
              Finn Vangronsveld<br />
              FlipForward<br />
              KBO: BE1033868758<br />
              E-mail: finnvangronsveld@gmail.com
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

export default PrivacyPolicy;

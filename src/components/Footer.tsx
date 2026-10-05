import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Separator } from "@/components/ui/separator";
import { business } from "@/lib/site";

const linkClass = "text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline";

/** Wettelijke vermeldingen volgens WER art. XII.6. */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-hero border-t border-border py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <Link to="/" className="flex items-center gap-3" aria-label="FlipForward – naar de homepage">
            <Logo className="h-8 w-auto text-foreground" />
            <span className="text-xl font-bold text-foreground">FlipForward</span>
          </Link>

          <nav aria-label="Juridisch" className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <Link to="/privacyverklaring" className={linkClass}>
              Privacyverklaring
            </Link>
            <Link to="/algemene-voorwaarden" className={linkClass}>
              Algemene voorwaarden
            </Link>
            <a href="/#contact" className={linkClass}>
              Contact
            </a>
          </nav>
        </div>

        <Separator className="mb-8" />

        <address className="not-italic grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground mb-8">
          <div>
            <p className="font-semibold text-foreground mb-1">{business.owner}</p>
            <p>Eenmanszaak, handelsnaam {business.name}</p>
            <p>
              {business.street}, {business.postalCode} {business.city}, {business.countryName}
            </p>
          </div>
          <div>
            <p>Ondernemingsnummer: {business.enterpriseNumber}</p>
            <p>Btw: {business.vatNumber}</p>
            <p className="text-xs mt-1">{business.vatNote}</p>
          </div>
          <div>
            <p>
              E-mail:{" "}
              <a href={`mailto:${business.email}`} className={linkClass}>
                {business.email}
              </a>
            </p>
          </div>
        </address>

        <p className="text-muted-foreground text-xs text-center">
          © {year} {business.name}. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

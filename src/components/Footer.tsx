import { Link } from "react-router-dom";
import Logo from "./Logo";
import { business } from "@/lib/site";

const linkClass = "ff-link";

/** Wettelijke vermeldingen volgens WER art. XII.6. */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink pb-10 pt-4">
      <div className="wrap">
        <div className="line flex flex-col gap-8 border-t pt-10 md:flex-row md:items-start md:justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="FlipForward, naar de homepage">
            <Logo className="h-6 w-auto text-primary" />
            <span className="text-lg font-medium tracking-[-0.01em]">FlipForward</span>
          </Link>

          <nav aria-label="Juridisch" className="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            <Link to="/website-laten-maken" className={linkClass}>
              Website laten maken
            </Link>
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

        <address className="soft mt-10 grid gap-6 text-sm not-italic sm:grid-cols-3">
          <div>
            <p>{business.owner}</p>
            <p>Eenmanszaak, handelsnaam {business.name}</p>
            <p>
              {business.street}, {business.postalCode} {business.city}, {business.countryName}
            </p>
          </div>
          <div>
            <p>Ondernemingsnummer: {business.enterpriseNumber}</p>
            <p>Btw: {business.vatNumber}</p>
            <p>{business.vatNote}</p>
          </div>
          <div className="sm:text-right">
            <p>
              <a href={`mailto:${business.email}`} className={linkClass}>
                {business.email}
              </a>
            </p>
            <p className="mt-1">
              © {year} {business.name}
            </p>
          </div>
        </address>
      </div>
    </footer>
  );
};

export default Footer;

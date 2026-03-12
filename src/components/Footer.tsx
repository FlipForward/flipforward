import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useInView } from "react-intersection-observer";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <footer className="bg-gradient-hero border-t border-border py-10 sm:py-14">
      <div
        ref={ref}
        className={`container mx-auto px-4 sm:px-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Top row: logo + legal links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-auto text-foreground" />
            <span className="text-xl font-bold text-foreground">FlipForward</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Algemene Voorwaarden
            </Link>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Company details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-muted-foreground mb-8">
          <div>
            <p className="font-semibold text-foreground mb-1">Finn Vangronsveld</p>
            <p>Handelsnaam: FlipForward</p>
          </div>
          <div>
            <p>KBO: BE1033868758</p>
            <p>E-mail: info@flipforward.be</p>
          </div>
          <div>
            <p>Middenakkers 26, 2470 Retie, België</p>
          </div>
        </div>

        <p className="text-muted-foreground/60 text-xs text-center">
          © {currentYear} FlipForward. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

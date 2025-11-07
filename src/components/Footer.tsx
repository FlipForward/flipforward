import Logo from "./Logo";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <footer className="bg-gradient-hero border-t border-border py-8 sm:py-12">
      <div
        ref={ref}
        className={`container mx-auto px-4 sm:px-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-auto text-foreground" />
            <span className="text-xl font-bold text-foreground">FlipForward</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-8 text-sm sm:text-base">
            <a href="#services" className="text-muted-foreground">
              Services
            </a>
            <a href="#portfolio" className="text-muted-foreground">
              Portfolio
            </a>
            <a href="#contact" className="text-muted-foreground">
              Contact
            </a>
          </div>

          <p className="text-muted-foreground text-xs sm:text-sm text-center">© {currentYear} Flip Forward. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

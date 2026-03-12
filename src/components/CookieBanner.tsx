import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in pointer-events-none">
      <div className="container mx-auto max-w-3xl pointer-events-auto">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl p-4 sm:px-6 sm:py-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-sm text-muted-foreground flex-1">
            Wij gebruiken cookies om uw ervaring op onze website te verbeteren. Door verder te gaan, gaat u akkoord met ons{" "}
            <Link to="/privacy" className="text-accent hover:underline">
              privacybeleid
            </Link>
            .
          </p>
          <Button variant="hero" size="sm" onClick={handleAccept} className="shrink-0">
            Akkoord
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

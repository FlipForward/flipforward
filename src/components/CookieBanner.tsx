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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1">
            Wij gebruiken cookies om uw ervaring op onze website te verbeteren. Door verder te gaan, gaat u akkoord met ons{" "}
            <Link to="/privacy" className="text-primary hover:underline">
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

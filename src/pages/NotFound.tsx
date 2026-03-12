import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-accent mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Pagina niet gevonden</h1>
        <p className="text-muted-foreground mb-8">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <Link to="/">
          <Button variant="hero" size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug naar home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => (
  <main id="main" className="flex min-h-screen items-center justify-center bg-background px-4">
    <div className="text-center max-w-md">
      <p className="text-8xl font-bold text-accent mb-4" aria-hidden="true">
        404
      </p>
      <h1 className="text-2xl font-bold text-foreground mb-2">Pagina niet gevonden</h1>
      <p className="text-muted-foreground mb-8">De pagina die je zoekt bestaat niet of is verplaatst.</p>
      <Button asChild variant="hero" size="lg">
        <Link to="/">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Terug naar home
        </Link>
      </Button>
    </div>
  </main>
);

export default NotFound;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export interface LegalSection {
  title: string;
  body: React.ReactNode;
  /** Passage die juridisch nagelezen moet worden. Enkel zichtbaar gemarkeerd op preview-omgevingen. */
  review?: string;
}

/**
 * Markeringen "juridisch na te lezen" zijn alleen zichtbaar buiten productie
 * (preview-URL's, localhost), zodat Finn ze kan nalezen vóór publicatie.
 */
const showReview = () =>
  typeof window !== "undefined" && !["flipforward.be", "www.flipforward.be"].includes(window.location.hostname);

const LegalPage = ({ title, updated, intro, sections }: { title: string; updated: string; intro: React.ReactNode; sections: LegalSection[] }) => {
  // Na mount bepalen: zo blijft de geprerenderde HTML gelijk aan de eerste client-render.
  const [review, setReview] = useState(false);
  useEffect(() => setReview(showReview()), []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-3 text-foreground hover:text-accent transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <ArrowLeft size={20} aria-hidden="true" />
            <Logo className="h-8 w-auto text-foreground" />
            <span className="text-xl font-bold">FlipForward</span>
            <span className="sr-only">– terug naar de homepage</span>
          </Link>
        </div>
      </header>

      <main id="main" className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl flex-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-sm text-muted-foreground mb-8">Laatst bijgewerkt: {updated}</p>
        <div className="text-muted-foreground leading-relaxed mb-10">{intro}</div>

        <div className="space-y-8 text-muted-foreground leading-relaxed [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_p+p]:mt-3 [&_p+ul]:mt-3 [&_ul+p]:mt-3">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{s.title}</h2>
              {review && s.review && (
                <p className="mb-3 rounded-md border border-yellow-500/60 bg-yellow-500/10 px-3 py-2 text-sm text-foreground">
                  ⚖️ Juridisch na te lezen: {s.review}
                </p>
              )}
              {s.body}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;

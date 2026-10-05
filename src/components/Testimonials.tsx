import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  company: string;
}

/**
 * Alleen ECHTE getuigenissen, met akkoord van de klant.
 * Zolang deze lijst leeg is, wordt de sectie niet getoond.
 */
const testimonials: Testimonial[] = [];

const Testimonials = () => {
  if (testimonials.length === 0) return null;

  return (
    <section id="getuigenissen" aria-labelledby="getuigenissen-title" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 id="getuigenissen-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center">
          Wat klanten <span className="text-accent">zeggen</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6 bg-gradient-card border-border">
              <Quote className="h-6 w-6 text-accent" aria-hidden="true" />
              <blockquote className="mt-4 text-foreground">“{t.quote}”</blockquote>
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{t.name}</span>, {t.company}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

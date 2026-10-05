import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/site";

/**
 * Native <details>/<summary>: werkt zonder JavaScript, is toegankelijk en de antwoorden staan
 * in de geprerenderde HTML. De FAQPage-structured data komt uit vite.config.ts.
 */
const Faq = () => (
  <section id="faq" aria-labelledby="faq-title" className="py-16 sm:py-24 bg-muted/50 scroll-mt-20">
    <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
      <h2 id="faq-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center">
        Veelgestelde <span className="text-accent">vragen</span>
      </h2>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base sm:text-lg font-medium text-foreground hover:text-accent [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="pb-5 pr-9 text-base text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;

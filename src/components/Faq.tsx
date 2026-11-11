import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";
import Reveal from "./motion/Reveal";

/**
 * Native <details>/<summary>: werkt zonder JavaScript, is toegankelijk en de antwoorden staan
 * in de geprerenderde HTML. De FAQPage-structured data komt uit vite.config.ts.
 */
const Faq = () => (
  <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-16 sm:py-28">
    <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      <Reveal>
        <h2 id="faq-title" className="h-section">
          Vragen
        </h2>
      </Reveal>
      <Reveal className="border-t border-border">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg tracking-[-0.01em] sm:text-xl [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-open:rotate-45" strokeWidth={1.5} aria-hidden="true" />
            </summary>
            <p className="max-w-[44rem] pb-6 pr-10 leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </Reveal>
    </div>
  </section>
);

export default Faq;

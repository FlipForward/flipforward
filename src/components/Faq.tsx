import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/site";

/** De FAQPage-structured data wordt bij de build in index.html gezet (zie vite.config.ts). */
const Faq = () => (
  <section id="faq" aria-labelledby="faq-title" className="py-16 sm:py-24 bg-muted/50 scroll-mt-20">
    <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
      <h2 id="faq-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center">
        Veelgestelde <span className="text-accent">vragen</span>
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base sm:text-lg">{f.q}</AccordionTrigger>
            <AccordionContent forceMount className="text-muted-foreground text-base">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default Faq;

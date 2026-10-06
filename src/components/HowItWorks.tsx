import { steps } from "@/lib/site";
import { Timeline } from "./aceternity/Timeline";

const HowItWorks = () => (
  <section id="werkwijze" aria-labelledby="werkwijze-title" className="scroll-mt-20 bg-background py-20 sm:py-28">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="mx-auto mb-6 max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Werkwijze</p>
        <h2 id="werkwijze-title" className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Hoe werkt <span className="text-accent">het?</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Van eerste gesprek tot een website die blijft werken, in vier stappen.
        </p>
      </div>

      <Timeline
        data={steps.map((s) => ({
          title: s.title,
          content: (
            <div className="rounded-2xl border border-border bg-gradient-card p-6 sm:p-8">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{s.text}</p>
            </div>
          ),
        }))}
      />
    </div>
  </section>
);

export default HowItWorks;

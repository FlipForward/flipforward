import { steps } from "@/lib/site";

const HowItWorks = () => (
  <section id="werkwijze" aria-labelledby="werkwijze-title" className="py-16 sm:py-24 bg-background scroll-mt-20">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 id="werkwijze-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Hoe werkt <span className="text-accent">het?</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          Van eerste gesprek tot een website die blijft werken, in vier stappen.
        </p>
      </div>

      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-xl border border-border bg-gradient-card p-6">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              <span className="sr-only">Stap {i + 1}: </span>
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;

/**
 * Gebaseerd op "Timeline" van Aceternity UI (ui.aceternity.com/components/timeline).
 * Aangepast: geen eigen kop, oranje lijn die zich vult bij het scrollen, genummerde bolletjes, <ol>-semantiek.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export interface TimelineEntry {
  title: string;
  content: ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLOListElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.getBoundingClientRect().height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: container, offset: ["start 30%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={container} className="w-full">
      <ol ref={ref} className="relative mx-auto max-w-5xl">
        {data.map((item, i) => (
          <li key={item.title} className="flex justify-start pt-10 md:gap-10 md:pt-28 first:md:pt-10">
            <div className="sticky top-32 z-10 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
                <span className="text-sm font-bold text-accent" aria-hidden="true">
                  {i + 1}
                </span>
              </div>
              <h3 className="hidden text-3xl font-extrabold tracking-tight text-muted-foreground md:block md:pl-20 lg:text-5xl">
                <span className="sr-only">Stap {i + 1}: </span>
                {item.title}
              </h3>
            </div>
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-3 block text-2xl font-extrabold text-foreground md:hidden">
                <span className="sr-only">Stap {i + 1}: </span>
                {item.title}
              </h3>
              {item.content}
            </div>
          </li>
        ))}
        <div
          aria-hidden="true"
          style={{ height }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: h, opacity }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[hsl(10_89%_55%)] via-[hsl(28_95%_60%)] from-[0%] via-[10%] to-transparent"
          />
        </div>
      </ol>
    </div>
  );
};

/**
 * Gebaseerd op "Pointer Highlight" van Aceternity UI (ui.aceternity.com/components/pointer-highlight).
 * Aangepast: inline (span), oranje kader en pijltje, decoratief.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function PointerHighlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [dim, setDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setDim({ width: e.contentRect.width, height: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={ref} className={cn("relative inline-block px-1", className)}>
      {children}
      {dim.width > 0 && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0">
          <motion.span
            className="absolute left-0 top-0 block rounded-[3px] border border-accent bg-accent/5"
            initial={{ width: 0, height: 0 }}
            whileInView={{ width: dim.width, height: dim.height }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute left-0 top-0 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, x: dim.width + 2, y: dim.height + 2 }}
            viewport={{ once: true }}
            style={{ rotate: -90 }}
            transition={{ opacity: { duration: 0.1 }, duration: 1, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5 fill-accent text-accent">
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
            </svg>
          </motion.span>
        </span>
      )}
    </span>
  );
}

/**
 * Gebaseerd op "3D Marquee" van Aceternity UI (ui.aceternity.com/components/3d-marquee).
 * Aangepast: decoratief (aria-hidden), stilstaand bij reduced motion, rasterlijnen enkel donker.
 */
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({ images, className }: { images: string[]; className?: string }) => {
  const reduced = useReducedMotion();
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, c) => images.slice(c * chunkSize, c * chunkSize + chunkSize));

  return (
    <div aria-hidden="true" className={cn("block overflow-hidden", className)}>
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-[0.45] sm:scale-75 lg:scale-100">
          <div
            style={{ transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)" }}
            className="relative right-[50%] top-96 grid size-full origin-top-left grid-cols-4 gap-8 [transform-style:preserve-3d]"
          >
            {chunks.map((sub, colIndex) => (
              <motion.div
                animate={reduced ? undefined : { y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{ duration: colIndex % 2 === 0 ? 10 : 15, repeat: Infinity, repeatType: "reverse" }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
              >
                <GridLine vertical className="-left-4" offset="80px" />
                {sub.map((image, i) => (
                  <div className="relative" key={i + image}>
                    <GridLine className="-top-4" offset="20px" />
                    <motion.img
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      src={image}
                      alt=""
                      className="aspect-[970/700] rounded-lg object-cover object-top ring-1 ring-white/10 hover:shadow-2xl"
                      width={970}
                      height={700}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLine = ({ className, offset, vertical }: { className?: string; offset?: string; vertical?: boolean }) => (
  <div
    style={
      {
        "--background": "#ffffff",
        "--color": "rgba(255, 255, 255, 0.18)",
        "--height": vertical ? "5px" : "1px",
        "--width": vertical ? "1px" : "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        maskComposite: "exclude",
      } as React.CSSProperties
    }
    className={cn(
      "absolute z-30 [background-size:var(--width)_var(--height)] [mask-composite:exclude]",
      vertical
        ? "top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]"
        : "left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
      className,
    )}
  />
);

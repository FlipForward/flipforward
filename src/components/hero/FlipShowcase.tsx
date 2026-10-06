import { useEffect, useRef, useState } from "react";
import { Lock, TriangleAlert, RotateCw, ArrowRight, Smartphone, ShieldCheck, Search } from "lucide-react";

/**
 * Hero-visual: een verouderde website die "omflipt" naar een moderne.
 * Het voorbeeld is bewust generiek ("Jouw Zaak"): geen verzonnen klant.
 * - flipt één keer automatisch na het laden
 * - klikken op de kaart of de schakelaar flipt opnieuw
 * - lichte 3D-tilt volgt de muis (enkel fijne pointer, niet bij reduced motion)
 */
const FlipShowcase = () => {
  const [flipped, setFlipped] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const touched = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  // Automatisch flippen zodra de kaart echt in beeld is (op mobiel staat ze onder de vouw).
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(rm);
    let t: number | undefined;
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) {
      t = window.setTimeout(() => !touched.current && setFlipped(true), 1400);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          t = window.setTimeout(() => !touched.current && setFlipped(true), rm ? 600 : 1200);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const set = (v: boolean) => {
    touched.current = true;
    setFlipped(v);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  const rotation = reduced
    ? "none"
    : `rotateX(${tilt.x}deg) rotateY(${(flipped ? 180 : 0) + tilt.y}deg)`;

  return (
    <div ref={root} className="w-full max-w-[640px] mx-auto">
      <div
        className="relative [perspective:1600px]"
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      >
        {/* gloed achter de kaart */}
        <div
          aria-hidden="true"
          className={`absolute -inset-8 rounded-[2rem] blur-3xl transition-opacity duration-700 bg-[radial-gradient(ellipse_at_center,hsl(10_89%_50%/0.35),transparent_70%)] ${
            flipped ? "opacity-100" : "opacity-30"
          }`}
        />

        <button
          type="button"
          onClick={() => set(!flipped)}
          aria-label={flipped ? "Toon de verouderde website" : "Flip naar de moderne website"}
          className="group relative block w-full aspect-[16/11] text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background [container-type:inline-size]"
        >
          <div
            className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1.15)] will-change-transform"
            style={{ transform: rotation }}
          >
            <OldSite visible={!flipped} reduced={reduced} />
            <NewSite visible={flipped} reduced={reduced} />
          </div>
        </button>
      </div>

      {/* Schakelaar */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <div role="group" aria-label="Kies een versie" className="relative inline-flex rounded-full border border-border bg-card/80 p-1 text-sm backdrop-blur">
          <span
            aria-hidden="true"
            className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-gradient-accent shadow-glow transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1.2)] ${
              flipped ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <button
            type="button"
            aria-pressed={!flipped}
            onClick={() => set(false)}
            className={`relative z-10 w-36 rounded-full px-4 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              !flipped ? "text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Je site nu
          </button>
          <button
            type="button"
            aria-pressed={flipped}
            onClick={() => set(true)}
            className={`relative z-10 w-36 rounded-full px-4 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              flipped ? "text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Na de flip
          </button>
        </div>
        <RotateCw className="hidden sm:block h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </div>
    </div>
  );
};

/* ---------- Gedeelde browserkader ---------- */

const Face = ({
  back,
  visible,
  reduced,
  children,
  className = "",
}: {
  back?: boolean;
  visible: boolean;
  reduced: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    aria-hidden="true"
    className={`absolute inset-0 overflow-hidden rounded-xl border shadow-2xl [backface-visibility:hidden] ${className} ${
      reduced ? `transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}` : ""
    }`}
    style={back && !reduced ? { transform: "rotateY(180deg)" } : undefined}
  >
    {children}
  </div>
);

/* ---------- Voorkant: de saaie, verouderde site ---------- */

const OldSite = ({ visible, reduced }: { visible: boolean; reduced: boolean }) => (
  <Face visible={visible} reduced={reduced} className="border-[#9a9a9a] bg-[#c0c0c0]">
    {/* Windows-achtig kader */}
    <div className="flex items-center gap-[1.2cqw] bg-gradient-to-r from-[#0a246a] to-[#a6caf0] px-[1.6cqw] py-[0.9cqw]">
      <span className="text-[2.1cqw] font-bold text-white [font-family:Tahoma,Verdana,sans-serif]">Jouw Zaak - Microsoft Internet Explorer</span>
      <span className="ml-auto flex gap-[0.6cqw]">
        {["_", "□", "×"].map((c) => (
          <span key={c} className="grid h-[2.6cqw] w-[2.8cqw] place-items-center border border-white/80 bg-[#d4d0c8] text-[1.8cqw] leading-none text-black">
            {c}
          </span>
        ))}
      </span>
    </div>
    <div className="flex items-center gap-[1cqw] border-b border-[#808080] bg-[#d4d0c8] px-[1.6cqw] py-[0.8cqw] text-[1.8cqw] text-black [font-family:Tahoma,Verdana,sans-serif]">
      <span>Adres</span>
      <span className="flex flex-1 items-center gap-[0.8cqw] border border-[#808080] bg-white px-[1cqw] py-[0.3cqw]">
        <TriangleAlert className="h-[2cqw] w-[2cqw] text-[#b45309]" />
        <span className="text-[#555]">Niet beveiligd |</span> http://www.jouwzaak.be/index.htm
      </span>
    </div>

    <div className="h-full bg-[#fffff0] p-[2.4cqw] text-black [font-family:'Times_New_Roman',Times,serif]">
      <div className="overflow-hidden whitespace-nowrap border-y-2 border-[#000080] bg-[#ffff66] py-[0.4cqw]">
        <p className="inline-block text-[2.4cqw] font-bold text-[#cc0000] motion-safe:animate-[marquee_9s_linear_infinite] [animation-delay:-4s]">
          *** WELKOM OP ONZE WEBSITE!!! *** NIEUW: bekijk onze FOTO'S *** Bel ons voor info ***
        </p>
      </div>

      <div className="mt-[2cqw] grid grid-cols-[28%_1fr] gap-[2cqw]">
        <table className="h-fit w-full border-2 border-[#000080] bg-[#e0e0ff] text-[2cqw]">
          <tbody>
            {["Home", "Over ons", "Producten", "Foto's", "Gastenboek", "Contact"].map((l) => (
              <tr key={l}>
                <td className="border border-[#9999cc] px-[1cqw] py-[0.4cqw] text-[#0000ee] underline">» {l}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h3 className="text-[4.2cqw] font-bold leading-tight text-[#000080] underline [font-family:'Comic_Sans_MS','Comic_Sans',cursive]">
            Jouw Zaak bvba
          </h3>
          <p className="mt-[1cqw] text-[2.2cqw] leading-snug">
            Wij zijn een dynamisch bedrijf met jarenlange ervaring. Klik <span className="text-[#0000ee] underline">hier</span> voor
            meer info. Volg ons ook op Facebook!
          </p>
          <div className="mt-[1.6cqw] grid h-[13cqw] place-items-center border-2 border-dashed border-[#999] bg-[repeating-linear-gradient(45deg,#ffcc00_0_1.2cqw,#222_1.2cqw_2.4cqw)]">
            <span className="bg-[#ffcc00] px-[1.2cqw] py-[0.3cqw] text-[2.2cqw] font-bold">UNDER CONSTRUCTION</span>
          </div>
          <p className="mt-[1.6cqw] text-[1.8cqw] text-[#555]">
            Bezoeker nr. <span className="bg-black px-[0.6cqw] font-mono text-[#33ff33]">0004217</span> · Laatst bijgewerkt:
            12/03/2014
          </p>
        </div>
      </div>

      <div className="mt-[2.4cqw] border-t-2 border-[#000080] pt-[1.2cqw] text-center text-[1.7cqw] text-[#555]">
        <p>
          © 2014 Jouw Zaak · Webmaster: neef Kevin · <span className="text-[#0000ee] underline">Teken ons gastenboek!</span>
        </p>
        <p className="mt-[0.4cqw] italic">Best bekeken met Internet Explorer 6 op 800x600</p>
      </div>
    </div>
  </Face>
);

/* ---------- Achterkant: modern, met FlipForward ---------- */

const NewSite = ({ visible, reduced }: { visible: boolean; reduced: boolean }) => (
  <Face back visible={visible} reduced={reduced} className="border-white/10 bg-[hsl(222_47%_6%)]">
    {/* moderne browserbalk */}
    <div className="flex items-center gap-[1.4cqw] border-b border-white/10 bg-white/[0.04] px-[1.8cqw] py-[1.2cqw]">
      <span className="flex gap-[0.8cqw]">
        <i className="h-[1.4cqw] w-[1.4cqw] rounded-full bg-[#ff5f57]" />
        <i className="h-[1.4cqw] w-[1.4cqw] rounded-full bg-[#febc2e]" />
        <i className="h-[1.4cqw] w-[1.4cqw] rounded-full bg-[#28c840]" />
      </span>
      <span className="mx-auto flex items-center gap-[0.8cqw] rounded-full bg-white/[0.06] px-[2.4cqw] py-[0.5cqw] text-[1.8cqw] text-white/70">
        <Lock className="h-[1.7cqw] w-[1.7cqw] text-emerald-400" />
        jouwzaak.be
      </span>
    </div>

    <div className="relative h-full overflow-hidden px-[4cqw] pt-[2.6cqw] text-white">
      {/* achtergrondvormen */}
      <div className="absolute -right-[10cqw] -top-[8cqw] h-[48cqw] w-[48cqw] rounded-full bg-[radial-gradient(circle,hsl(10_89%_55%/0.55),transparent_65%)] blur-[2cqw]" />
      <div className="absolute bottom-[6cqw] left-[30cqw] h-[30cqw] w-[30cqw] rounded-full bg-[radial-gradient(circle,hsl(28_95%_55%/0.25),transparent_65%)] blur-[2cqw]" />

      <nav className="relative flex items-center text-[1.9cqw]">
        <span className="flex items-center gap-[0.8cqw] font-bold">
          <span className="grid h-[3cqw] w-[3cqw] place-items-center rounded-[0.8cqw] bg-gradient-accent text-[1.6cqw]">J</span>
          Jouw Zaak
        </span>
        <span className="ml-auto flex gap-[2.6cqw] text-white/60">
          <span>Diensten</span>
          <span>Werk</span>
          <span>Over</span>
        </span>
        <span className="ml-[2.6cqw] rounded-full bg-white px-[1.8cqw] py-[0.5cqw] font-semibold text-black">Contact</span>
      </nav>

      <div className="relative mt-[5cqw] grid grid-cols-[1.25fr_1fr] items-center gap-[3cqw]">
        <div>
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-[1.4cqw] py-[0.4cqw] text-[1.6cqw] text-white/70">
            Vakwerk uit de Kempen
          </span>
          <h3 className="mt-[1.6cqw] text-[6.2cqw] font-extrabold leading-[0.98] tracking-tight">
            Scherp online.
            <span className="block bg-gradient-to-r from-[hsl(10_89%_60%)] to-[hsl(32_95%_60%)] bg-clip-text text-transparent">
              Klaar voor klanten.
            </span>
          </h3>
          <p className="mt-[1.8cqw] max-w-[90%] text-[1.9cqw] leading-relaxed text-white/60">
            Snel, mobielvriendelijk en vindbaar. Zonder dat jij er omkijken naar hebt.
          </p>
          <div className="mt-[2.4cqw] flex gap-[1.4cqw] text-[1.8cqw]">
            <span className="inline-flex items-center gap-[0.8cqw] rounded-full bg-gradient-accent px-[2.2cqw] py-[1cqw] font-semibold shadow-[0_0_3cqw_hsl(10_89%_55%/0.5)]">
              Offerte aanvragen <ArrowRight className="h-[1.9cqw] w-[1.9cqw]" />
            </span>
            <span className="rounded-full border border-white/20 px-[2.2cqw] py-[1cqw] text-white/80">Ons werk</span>
          </div>
        </div>

        {/* "product"-kaartjes */}
        <div className="relative h-[30cqw]">
          <div className="absolute right-0 top-0 h-[22cqw] w-[28cqw] rotate-3 rounded-[1.6cqw] border border-white/10 bg-gradient-to-br from-[hsl(10_80%_45%)] via-[hsl(20_85%_40%)] to-[hsl(222_40%_12%)] p-[1.6cqw] shadow-2xl">
            <div className="h-[1.2cqw] w-[10cqw] rounded-full bg-white/50" />
            <div className="mt-[1cqw] h-[1cqw] w-[15cqw] rounded-full bg-white/25" />
            <div className="absolute bottom-[1.6cqw] left-[1.6cqw] right-[1.6cqw] h-[8cqw] rounded-[1cqw] bg-black/25 backdrop-blur" />
          </div>
          <div className="absolute bottom-0 left-0 w-[20cqw] -rotate-3 space-y-[1cqw] rounded-[1.4cqw] border border-white/10 bg-white/[0.07] p-[1.4cqw] text-[1.6cqw] backdrop-blur-md shadow-2xl">
            {[
              { icon: Smartphone, t: "Mobielvriendelijk" },
              { icon: ShieldCheck, t: "Veilig (SSL)" },
              { icon: Search, t: "Vindbaar" },
            ].map(({ icon: I, t }) => (
              <span key={t} className="flex items-center gap-[1cqw] text-white/85">
                <I className="h-[2cqw] w-[2cqw] text-[hsl(10_89%_62%)]" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Face>
);

export default FlipShowcase;

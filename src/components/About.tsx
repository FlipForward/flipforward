import { MapPin, UserRound, ShieldCheck } from "lucide-react";
import { business } from "@/lib/site";
import finnPhoto from "@/assets/finn.webp";
import { GlowCard } from "./aceternity/GlowingEffect";

const points = [
  {
    icon: MapPin,
    title: "Lokaal",
    text: `Gevestigd in ${business.city}. We kennen de Kempen en werken vooral voor ondernemers in de buurt.`,
  },
  {
    icon: UserRound,
    title: "Eén aanspreekpunt",
    text: "Geen accountmanagers of ticketsystemen: je spreekt rechtstreeks met wie je website bouwt en onderhoudt.",
  },
  {
    icon: ShieldCheck,
    title: "Volledig ontzorgd",
    text: "Hosting, updates, back-ups en beveiliging regelen wij. Jij hoeft niets technisch te doen.",
  },
];

const About = () => (
  <section id="over" aria-labelledby="over-title" className="relative scroll-mt-20 overflow-hidden bg-muted/30 py-20 sm:py-28">
    <div className="container relative z-10 mx-auto px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm">
          <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,hsl(10_89%_50%/0.25),transparent_70%)] blur-2xl" />
          <GlowCard className="rounded-[2rem]" innerClassName="rounded-[1.6rem] bg-none p-0">
            <img
              src={finnPhoto}
              alt={`${business.owner}, oprichter van FlipForward`}
              width={320}
              height={320}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
          </GlowCard>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background/90 px-4 py-2 text-sm shadow-xl backdrop-blur">
            <span className="font-semibold text-foreground">{business.owner}</span>
            <span className="text-muted-foreground"> · oprichter</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Over FlipForward</p>
          <h2 id="over-title" className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Een webbureau uit {business.city}, met <span className="text-accent">persoonlijk contact.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            FlipForward is het webbureau van <strong className="text-foreground">{business.owner}</strong>. Ik bouw websites voor
            zelfstandigen en kmo's en blijf daarna{" "}
            <strong className="text-foreground">je vaste contactpersoon</strong>: voor een nieuwe tekst, een
            extra pagina of een vraag over je site. Geen ingewikkelde trajecten, wel duidelijke afspraken en een vaste prijs.
          </p>
        </div>
      </div>

      <ul className="mx-auto mt-16 grid max-w-6xl gap-4 sm:gap-5 md:grid-cols-3">
        {points.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <GlowCard innerClassName="p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-accent/10">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-bold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </GlowCard>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default About;

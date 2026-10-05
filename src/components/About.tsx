import { Card } from "@/components/ui/card";
import { MapPin, UserRound, ShieldCheck } from "lucide-react";
import { business } from "@/lib/site";
import finnPhoto from "@/assets/finn.webp";

const PHOTO: string | null = finnPhoto;

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
  <section id="over" aria-labelledby="over-title" className="py-16 sm:py-24 bg-muted/50 relative overflow-hidden scroll-mt-20">
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="text-center mb-12 sm:mb-16">
        <h2 id="over-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Over <span className="text-accent">FlipForward</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          Een webbureau uit {business.city}, met persoonlijk contact.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="p-6 sm:p-8 md:p-10 bg-gradient-card border-border mb-6 sm:mb-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {PHOTO ? (
            <img src={PHOTO} alt={`${business.owner}, oprichter van FlipForward`} width={112} height={112} loading="lazy" decoding="async" className="h-28 w-28 rounded-full object-cover flex-shrink-0 ring-2 ring-accent/40" />
          ) : (
            <div className="h-28 w-28 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold flex-shrink-0" aria-hidden="true">
              FV
            </div>
          )}
          <div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              FlipForward is het webbureau van <strong className="text-foreground">{business.owner}</strong>. Ik bouw
              websites voor zelfstandigen en kmo's en blijf daarna je vaste contactpersoon: voor een nieuwe tekst, een extra
              pagina of een vraag over je site. Geen ingewikkelde trajecten, wel duidelijke afspraken en een vaste prijs.
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {points.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-5 sm:p-6 bg-gradient-card border-border">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{title}</h3>
              <p className="text-muted-foreground text-sm">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;

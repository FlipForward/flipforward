import { Card } from "@/components/ui/card";
import { Palette, Globe, Wrench, Search } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Design & ontwikkeling",
    text: "Een website op maat van je zaak, mobielvriendelijk en snel. Met twee feedbackrondes, zodat het ontwerp klopt.",
  },
  {
    icon: Globe,
    title: "Domein & hosting",
    text: "We registreren je domeinnaam op jouw naam, zorgen voor een beveiligde verbinding (SSL) en snelle hosting.",
  },
  {
    icon: Wrench,
    title: "Onderhoud & support",
    text: "Updates, back-ups, beveiliging en uptime-monitoring. Aanpassingen aan je site doen we binnen je pakket.",
  },
  {
    icon: Search,
    title: "Vindbaarheid",
    text: "Een technisch sterke basis voor Google, en vanaf Business ook voor AI-zoekmachines en je Google Bedrijfsprofiel.",
  },
];

const Services = () => (
  <section id="diensten" aria-labelledby="diensten-title" className="py-16 sm:py-24 bg-background scroll-mt-20">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 id="diensten-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Website as a <span className="text-accent">Service</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          Geen losse factuur voor een website die daarna veroudert: wij bouwen én onderhouden, voor een vast bedrag per maand.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {services.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="p-5 sm:p-8 bg-gradient-card border-border">
            <div className="mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">{text}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Services;

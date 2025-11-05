import { Card } from '@/components/ui/card';
import { Code2, Palette, Rocket, Search, Smartphone, Zap } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom-coded websites built with modern frameworks and best practices for optimal performance.'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that engage users and drive conversions through thoughtful experiences.'
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Responsive designs that look stunning and function flawlessly on every device and screen size.'
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Strategic optimization to boost your search rankings and drive organic traffic to your site.'
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Lightning-fast load times and smooth interactions that keep visitors engaged and coming back.'
  },
  {
    icon: Rocket,
    title: 'Growth Strategy',
    description: 'Data-driven strategies to scale your digital presence and achieve measurable business results.'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Services That <span className="text-accent">Scale</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive web solutions tailored to your business goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="p-8 bg-gradient-card border-border hover:shadow-[0_0_30px_hsl(10_89%_55%/0.3)] transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

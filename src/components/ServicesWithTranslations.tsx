import { Card } from '@/components/ui/card';
import { Code2, Palette, Rocket, Search, Smartphone, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const services = [
    {
      icon: Code2,
      titleKey: 'services.webdev.title',
      descKey: 'services.webdev.desc'
    },
    {
      icon: Palette,
      titleKey: 'services.design.title',
      descKey: 'services.design.desc'
    },
    {
      icon: Smartphone,
      titleKey: 'services.mobile.title',
      descKey: 'services.mobile.desc'
    },
    {
      icon: Search,
      titleKey: 'services.seo.title',
      descKey: 'services.seo.desc'
    },
    {
      icon: Zap,
      titleKey: 'services.performance.title',
      descKey: 'services.performance.desc'
    },
    {
      icon: Rocket,
      titleKey: 'services.growth.title',
      descKey: 'services.growth.desc'
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('services.title')} <span className="text-accent">{t('services.titleAccent')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className={`p-8 bg-gradient-card border-border hover:shadow-[0_0_30px_hsl(10_89%_55%/0.3)] transition-all duration-300 cursor-pointer ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-muted-foreground">
                  {t(service.descKey)}
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

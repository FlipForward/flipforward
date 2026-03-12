import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'react-intersection-observer';

const Pricing = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    'pricing.feature1',
    'pricing.feature2',
    'pricing.feature3',
    'pricing.feature4',
    'pricing.feature5',
    'pricing.feature6',
    'pricing.feature7',
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-muted/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            {t('pricing.title')} <span className="text-accent">{t('pricing.titleAccent')}</span>
          </h2>
        </div>

        <div ref={ref} className="max-w-lg mx-auto">
          <Card className={`p-6 sm:p-10 bg-gradient-card border-accent/30 shadow-[0_0_40px_hsl(10_89%_55%/0.15)] transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Price */}
            <div className="text-center mb-8">
              <p className="text-4xl sm:text-5xl font-bold text-foreground">{t('pricing.setup')}</p>
              <p className="text-muted-foreground mt-1">{t('pricing.setupLabel')}</p>
              <p className="text-xl sm:text-2xl font-semibold text-accent mt-4">{t('pricing.monthly')}</p>
              <p className="text-muted-foreground text-sm">{t('pricing.monthlyLabel')}</p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {features.map((key) => (
                <li key={key} className="flex items-center gap-3 text-sm sm:text-base text-foreground">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  {t(key)}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button variant="hero" size="lg" className="w-full" onClick={scrollToContact}>
              {t('pricing.cta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

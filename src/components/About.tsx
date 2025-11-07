import { Card } from '@/components/ui/card';
import { Code2, Rocket, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  return (
    <section id="about" className="py-16 sm:py-24 bg-muted/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            {t('about.title')} <span className="text-accent">{t('about.titleAccent')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className={`p-6 sm:p-8 md:p-12 bg-gradient-card border-border mb-6 sm:mb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              {t('about.description')}
            </p>
          </Card>

          <div ref={ref} className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <Card className={`p-5 sm:p-6 bg-gradient-card border-border hover:shadow-[0_0_30px_hsl(10_89%_55%/0.3)] transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mb-4">
                <Code2 className="w-6 h-6 text-accent flex-shrink-0" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{t('about.passion.title')}</h3>
              <p className="text-muted-foreground text-sm">{t('about.passion.desc')}</p>
            </Card>

            <Card className={`p-5 sm:p-6 bg-gradient-card border-border hover:shadow-[0_0_30px_hsl(10_89%_55%/0.3)] transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mb-4">
                <Rocket className="w-6 h-6 text-accent flex-shrink-0" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{t('about.learning.title')}</h3>
              <p className="text-muted-foreground text-sm">{t('about.learning.desc')}</p>
            </Card>

            <Card className={`p-5 sm:p-6 bg-gradient-card border-border hover:shadow-[0_0_30px_hsl(10_89%_55%/0.3)] transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mb-4">
                <Heart className="w-6 h-6 text-accent flex-shrink-0" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{t('about.dedication.title')}</h3>
              <p className="text-muted-foreground text-sm">{t('about.dedication.desc')}</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

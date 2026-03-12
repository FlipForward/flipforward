import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Send, Clock, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { supabase } = await import('@/integrations/supabase/client');
    const { error } = await supabase.from('contact_messages').insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });

    if (error) {
      toast({
        title: 'Fout bij verzenden',
        description: 'Probeer het later opnieuw.',
        variant: 'destructive',
      });
    } else {
      try {
        await supabase.functions.invoke('send-notification', {
          body: {
            type: 'new_request_admin',
            data: {
              subject: `Contactbericht van ${formData.name.trim()}`,
              user_email: formData.email.trim(),
              description: formData.message.trim(),
            },
          },
        });
      } catch (e) {
        console.error('Email notification failed:', e);
      }

      toast({
        title: t('contact.success'),
        description: t('contact.successDesc'),
      });
      setFormData({ name: '', email: '', message: '' });
    }
    setLoading(false);
  };

  const infoCards = [
    { icon: Mail, titleKey: 'contact.emailUs', desc: 'finnvangronsveld@gmail.com' },
    { icon: Clock, titleKey: 'contact.delivery', descKey: 'contact.deliveryDesc' },
    { icon: Sparkles, titleKey: 'contact.visuals', descKey: 'contact.visualsDesc' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            {t('contact.title')} <span className="text-accent">{t('contact.titleAccent')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            {t('contact.subtitle')}
          </p>
        </div>

        <div ref={ref} className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Form */}
          <Card className={`p-6 sm:p-8 bg-gradient-card border-border transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-foreground">
                  {t('contact.name')}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('contact.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-foreground">
                  {t('contact.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-foreground">
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('contact.messagePlaceholder')}
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-background border-border resize-none"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Verzenden...' : t('contact.send')}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </Card>

          {/* Info cards */}
          <div className={`flex flex-col gap-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
            {infoCards.map(({ icon: Icon, titleKey, desc, descKey }, i) => (
              <Card key={i} className="p-5 sm:p-6 bg-gradient-card border-border hover:border-accent/30 hover:shadow-glow transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold mb-1 text-foreground text-sm">{t(titleKey)}</h3>
                    <p className="text-sm text-muted-foreground break-all sm:break-normal">
                      {desc || t(descKey!)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  const sections = [
    { title: 'privacy.section1.title', text: 'privacy.section1.text', items: 'privacy.section1.items' },
    { title: 'privacy.section2.title', text: 'privacy.section2.text', items: 'privacy.section2.items' },
    { title: 'privacy.section3.title', text: 'privacy.section3.text' },
    { title: 'privacy.section4.title', text: 'privacy.section4.text' },
    { title: 'privacy.section5.title', text: 'privacy.section5.text' },
    { title: 'privacy.section6.title', text: 'privacy.section6.text' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <ArrowLeft size={20} />
              <Logo className="h-8 w-auto text-foreground" />
              <span className="text-xl font-bold">FlipForward</span>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('privacy.title')}</h1>
        <p className="text-sm text-muted-foreground/60 mb-8">
          {t('privacy.lastUpdated')}: {new Date().toLocaleDateString('nl-BE')}
        </p>

        <p className="text-muted-foreground leading-relaxed mb-10">{t('privacy.intro')}</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{t(section.title)}</h2>
              <p>{t(section.text)}</p>
              {section.items && (
                <ul className="list-disc list-inside mt-3 space-y-1">
                  {t(section.items).split('|').map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

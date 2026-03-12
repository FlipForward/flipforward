import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Terms = () => {
  const { t } = useLanguage();

  const articles = [
    { title: 'terms.art1.title', paragraphs: ['terms.art1.p1', 'terms.art1.p2'] },
    { title: 'terms.art2.title', paragraphs: ['terms.art2.p1', 'terms.art2.p2', 'terms.art2.p3'] },
    { title: 'terms.art3.title', paragraphs: ['terms.art3.p1', 'terms.art3.p2', 'terms.art3.p3'] },
    { title: 'terms.art4.title', paragraphs: ['terms.art4.p1', 'terms.art4.p2', 'terms.art4.p3'] },
    { title: 'terms.art5.title', paragraphs: ['terms.art5.p1', 'terms.art5.p2'] },
    { title: 'terms.art6.title', paragraphs: ['terms.art6.p1', 'terms.art6.p2'] },
    { title: 'terms.art7.title', paragraphs: ['terms.art7.p1'] },
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
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('terms.title')}</h1>
        <p className="text-sm text-muted-foreground/60 mb-8">
          {t('terms.lastUpdated')}: {new Date().toLocaleDateString('nl-BE')}
        </p>

        <p className="text-muted-foreground leading-relaxed mb-10">{t('terms.intro')}</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          {articles.map((article, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{t(article.title)}</h2>
              {article.paragraphs.map((p, j) => (
                <p key={j} className={j > 0 ? 'mt-3' : ''}>{t(p)}</p>
              ))}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Terms;

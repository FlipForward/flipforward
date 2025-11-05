import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'nl' : 'en')}
      className="gap-2"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language === 'en' ? 'NL' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;

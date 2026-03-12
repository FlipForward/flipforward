import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Flag = ({ code }: { code: string }) => {
  const flags: Record<string, { bg: string; colors: string[] }> = {
    en: { bg: '', colors: ['hsl(220, 60%, 30%)', 'hsl(0, 70%, 45%)', 'hsl(0, 0%, 100%)'] },
    nl: { bg: '', colors: ['hsl(10, 80%, 45%)', 'hsl(0, 0%, 100%)', 'hsl(220, 60%, 30%)'] },
    de: { bg: '', colors: ['hsl(0, 0%, 10%)', 'hsl(0, 70%, 45%)', 'hsl(45, 90%, 50%)'] },
    fr: { bg: '', colors: ['hsl(220, 60%, 35%)', 'hsl(0, 0%, 100%)', 'hsl(0, 70%, 45%)'] },
  };

  const flag = flags[code];
  if (!flag) return null;

  if (code === 'en') {
    return (
      <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-sm shrink-0">
        <rect width="20" height="14" fill={flag.colors[0]} />
        <line x1="0" y1="0" x2="20" y2="14" stroke={flag.colors[2]} strokeWidth="2.5" />
        <line x1="20" y1="0" x2="0" y2="14" stroke={flag.colors[2]} strokeWidth="2.5" />
        <line x1="0" y1="0" x2="20" y2="14" stroke={flag.colors[1]} strokeWidth="1" />
        <line x1="20" y1="0" x2="0" y2="14" stroke={flag.colors[1]} strokeWidth="1" />
        <rect x="8" y="0" width="4" height="14" fill={flag.colors[2]} />
        <rect x="0" y="5" width="20" height="4" fill={flag.colors[2]} />
        <rect x="8.75" y="0" width="2.5" height="14" fill={flag.colors[1]} />
        <rect x="0" y="5.5" width="20" height="3" fill={flag.colors[1]} />
      </svg>
    );
  }

  if (code === 'fr') {
    return (
      <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-sm shrink-0">
        <rect x="0" width="6.67" height="14" fill={flag.colors[0]} />
        <rect x="6.67" width="6.67" height="14" fill={flag.colors[1]} />
        <rect x="13.33" width="6.67" height="14" fill={flag.colors[2]} />
      </svg>
    );
  }

  // NL & DE: horizontal stripes
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-sm shrink-0">
      <rect y="0" width="20" height="4.67" fill={flag.colors[0]} />
      <rect y="4.67" width="20" height="4.67" fill={flag.colors[1]} />
      <rect y="9.33" width="20" height="4.67" fill={flag.colors[2]} />
    </svg>
  );
};

const languages = [
  { code: 'en' as const, label: 'English' },
  { code: 'nl' as const, label: 'Nederlands' },
  { code: 'de' as const, label: 'Deutsch' },
  { code: 'fr' as const, label: 'Français' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const current = languages.find((l) => l.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 px-2">
          <Flag code={current.code} />
          <span className="font-medium text-sm">{current.code.toUpperCase()}</span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`gap-2 cursor-pointer ${language === lang.code ? 'bg-accent/10 text-accent' : ''}`}
          >
            <Flag code={lang.code} />
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

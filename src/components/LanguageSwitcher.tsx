import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Flag = ({ code }: { code: string }) => {
  const flags: Record<string, { colors: string[] }> = {
    en: { colors: ['hsl(220, 60%, 30%)', 'hsl(0, 70%, 45%)', 'hsl(0, 0%, 100%)'] },
    nl: { colors: ['hsl(10, 80%, 45%)', 'hsl(0, 0%, 100%)', 'hsl(220, 60%, 30%)'] },
    de: { colors: ['hsl(0, 0%, 10%)', 'hsl(0, 70%, 45%)', 'hsl(45, 90%, 50%)'] },
    fr: { colors: ['hsl(220, 60%, 35%)', 'hsl(0, 0%, 100%)', 'hsl(0, 70%, 45%)'] },
  };

  const flag = flags[code];
  if (!flag) return null;

  const size = 20;

  if (code === 'en') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" className="shrink-0 rounded-full overflow-hidden">
        <clipPath id="circleEN"><circle cx="10" cy="10" r="10" /></clipPath>
        <g clipPath="url(#circleEN)">
          <rect width="20" height="20" fill={flag.colors[0]} />
          <line x1="0" y1="0" x2="20" y2="20" stroke={flag.colors[2]} strokeWidth="3" />
          <line x1="20" y1="0" x2="0" y2="20" stroke={flag.colors[2]} strokeWidth="3" />
          <line x1="0" y1="0" x2="20" y2="20" stroke={flag.colors[1]} strokeWidth="1.2" />
          <line x1="20" y1="0" x2="0" y2="20" stroke={flag.colors[1]} strokeWidth="1.2" />
          <rect x="8" y="0" width="4" height="20" fill={flag.colors[2]} />
          <rect x="0" y="8" width="20" height="4" fill={flag.colors[2]} />
          <rect x="8.75" y="0" width="2.5" height="20" fill={flag.colors[1]} />
          <rect x="0" y="8.75" width="20" height="2.5" fill={flag.colors[1]} />
        </g>
      </svg>
    );
  }

  if (code === 'fr') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" className="shrink-0 rounded-full overflow-hidden">
        <clipPath id="circleFR"><circle cx="10" cy="10" r="10" /></clipPath>
        <g clipPath="url(#circleFR)">
          <rect x="0" width="6.67" height="20" fill={flag.colors[0]} />
          <rect x="6.67" width="6.67" height="20" fill={flag.colors[1]} />
          <rect x="13.33" width="6.67" height="20" fill={flag.colors[2]} />
        </g>
      </svg>
    );
  }

  // NL & DE: horizontal stripes
  const clipId = `circle${code.toUpperCase()}`;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className="shrink-0 rounded-full overflow-hidden">
      <clipPath id={clipId}><circle cx="10" cy="10" r="10" /></clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect y="0" width="20" height="6.67" fill={flag.colors[0]} />
        <rect y="6.67" width="20" height="6.67" fill={flag.colors[1]} />
        <rect y="13.33" width="20" height="6.67" fill={flag.colors[2]} />
      </g>
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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 focus-visible:ring-0 focus-visible:ring-offset-0">
          <Flag code={current.code} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`gap-2.5 cursor-pointer ${language === lang.code ? 'bg-accent/10 text-accent' : ''}`}
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

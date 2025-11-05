import { useState, useEffect } from 'react';
import { LucideIcon, User, BookOpen, Briefcase, Store, Coffee, Scissors, Wrench, Palette, Mail, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Idea {
  textKey: string;
  icon: LucideIcon;
}

const TypingAnimation = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const ideas: Idea[] = [
    { textKey: 'hero.ideas.biography', icon: User },
    { textKey: 'hero.ideas.blog', icon: BookOpen },
    { textKey: 'hero.ideas.portfolio', icon: Briefcase },
    { textKey: 'hero.ideas.shop', icon: Store },
    { textKey: 'hero.ideas.cafe', icon: Coffee },
    { textKey: 'hero.ideas.salon', icon: Scissors },
    { textKey: 'hero.ideas.services', icon: Wrench },
    { textKey: 'hero.ideas.gallery', icon: Palette },
    { textKey: 'hero.ideas.contact', icon: Mail },
    { textKey: 'hero.ideas.landing', icon: FileText },
  ];

  const currentIdea = ideas[currentIndex];
  const CurrentIcon = currentIdea.icon;
  const fullText = t(currentIdea.textKey);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && displayedText === fullText) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % ideas.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? fullText.substring(0, displayedText.length - 1)
          : fullText.substring(0, displayedText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, fullText, ideas.length]);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8 transition-all duration-300">
      <CurrentIcon 
        key={currentIndex} 
        className="w-4 h-4 text-accent flex-shrink-0 animate-scale-in" 
      />
      <span className="text-sm text-accent font-medium whitespace-nowrap">
        {displayedText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};

export default TypingAnimation;

import { useState, useEffect } from 'react';
import { LucideIcon, ShoppingCart, Calendar, Utensils, Dumbbell, GraduationCap, Briefcase, Heart, Music, Camera, Plane } from 'lucide-react';
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
    { textKey: 'hero.ideas.ecommerce', icon: ShoppingCart },
    { textKey: 'hero.ideas.booking', icon: Calendar },
    { textKey: 'hero.ideas.restaurant', icon: Utensils },
    { textKey: 'hero.ideas.fitness', icon: Dumbbell },
    { textKey: 'hero.ideas.education', icon: GraduationCap },
    { textKey: 'hero.ideas.portfolio', icon: Briefcase },
    { textKey: 'hero.ideas.dating', icon: Heart },
    { textKey: 'hero.ideas.music', icon: Music },
    { textKey: 'hero.ideas.photography', icon: Camera },
    { textKey: 'hero.ideas.travel', icon: Plane },
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
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8">
      <CurrentIcon className="w-4 h-4 text-accent flex-shrink-0" />
      <span className="text-sm text-accent font-medium min-w-[200px]">
        {displayedText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};

export default TypingAnimation;

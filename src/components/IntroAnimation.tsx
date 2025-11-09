import { useState, useEffect } from 'react';
import Logo from './Logo';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [step, setStep] = useState<'initial' | 'show-logo' | 'slide' | 'fadeout'>('initial');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep('show-logo'), 100),
      setTimeout(() => setStep('slide'), 1100),
      setTimeout(() => setStep('fadeout'), 2100),
      setTimeout(() => onComplete(), 2700),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-600 ${
        step === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Logo - starts centered, then moves left */}
        <div 
          className={`transition-all duration-700 ease-out ${
            step === 'initial' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          } ${
            step === 'slide' || step === 'fadeout' ? '-translate-x-16 sm:-translate-x-20' : 'translate-x-0'
          }`}
        >
          <Logo className="h-16 sm:h-20 md:h-24 w-auto text-white" />
        </div>

        {/* Text - slides from behind the logo */}
        <div 
          className={`absolute transition-all duration-700 ease-out ${
            step === 'slide' || step === 'fadeout' 
              ? 'opacity-100 translate-x-12 sm:translate-x-16' 
              : 'opacity-0 -translate-x-16 sm:-translate-x-20'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground whitespace-nowrap">
            FlipForward
          </h1>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;

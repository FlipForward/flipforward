import { useState, useEffect } from 'react';
import Logo from './Logo';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [step, setStep] = useState<'logo' | 'slide' | 'text' | 'fadeout'>('logo');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep('slide'), 800),
      setTimeout(() => setStep('text'), 1400),
      setTimeout(() => setStep('fadeout'), 2400),
      setTimeout(() => onComplete(), 3000),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-opacity duration-600 ${
        step === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div 
          className={`transition-all duration-700 ${
            step === 'logo' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          } ${
            step === 'slide' || step === 'text' || step === 'fadeout' ? 'translate-x-0' : 'translate-x-0'
          }`}
        >
          <Logo className="h-16 sm:h-20 md:h-24 w-auto text-primary" />
        </div>

        {/* Text */}
        <div 
          className={`transition-all duration-700 ${
            step === 'text' || step === 'fadeout' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            FlipForward
          </h1>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;

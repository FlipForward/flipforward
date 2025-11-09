import { useState, useEffect } from 'react';
import Logo from './Logo';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [step, setStep] = useState<'initial' | 'show' | 'fadeout'>('initial');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep('show'), 100),
      setTimeout(() => setStep('fadeout'), 2100),
      setTimeout(() => onComplete(), 2600),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        step === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div 
        className={`transition-all duration-500 ease-out ${
          step === 'initial' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <Logo className="h-16 sm:h-20 md:h-24 w-auto text-white" />
      </div>
    </div>
  );
};

export default IntroAnimation;

import { useRef, useState, useEffect, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

const MagneticButton = ({ children, className = '', strength = 0.3 }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      
      // Calculate distance from cursor to button center
      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Only apply magnetic effect within 150px radius
      const magneticRadius = 150;
      
      if (distance < magneticRadius) {
        // Calculate magnetic pull (stronger when closer)
        const pullStrength = (1 - distance / magneticRadius) * strength;
        const x = distanceX * pullStrength;
        const y = distanceY * pullStrength;
        setPosition({ x, y });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={buttonRef}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;

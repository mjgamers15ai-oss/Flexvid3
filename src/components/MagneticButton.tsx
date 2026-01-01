
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', variant = 'primary' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textXTo = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textYTo = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * 0.3);
      yTo(y * 0.3);
      textXTo(x * 0.15);
      textYTo(y * 0.15);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-white text-black';
      case 'secondary':
        return 'bg-transparent text-white border border-white/20 hover:border-white/40';
      case 'outline':
        return 'bg-transparent text-white/60 hover:text-white';
      default:
        return 'bg-white text-black';
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`group relative overflow-hidden px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${getVariantStyles()} ${className}`}
    >
      {/* Liquid background fill effect */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100 group-hover:origin-top pointer-events-none"
        style={{ backgroundColor: variant === 'primary' ? '#e5e5e5' : 'white' }}
      />
      
      {/* Dual layer text for rolling animation */}
      <span ref={textRef} className="relative z-10 block pointer-events-none">
        <span className="flex flex-col h-4 overflow-hidden">
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
            {children}
          </span>
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-black">
            {children}
          </span>
        </span>
      </span>
    </button>
  );
};

export default MagneticButton;

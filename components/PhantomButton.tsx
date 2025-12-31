
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PhantomButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
}

const PhantomButton: React.FC<PhantomButtonProps> = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textMainRef = useRef<HTMLSpanElement>(null);
  const textTopRef = useRef<HTMLSpanElement>(null);
  const textBottomRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(textTopRef.current, {
      y: 0,
      opacity: 0,
      duration: 0.6,
      ease: "power4.out"
    }, 0)
    .to(textBottomRef.current, {
      y: 0,
      opacity: 0,
      duration: 0.6,
      ease: "power4.out"
    }, 0)
    .to(textMainRef.current, {
      opacity: 1,
      scale: 1.05,
      letterSpacing: "0.25em",
      duration: 0.7,
      ease: "expo.out"
    }, 0.1)
    .to(bgRef.current, {
      opacity: 1,
      scaleY: 1,
      duration: 0.8,
      ease: "power4.inOut"
    }, 0)
    .to(button, {
      borderColor: "rgba(255, 255, 255, 0.3)",
      duration: 0.5
    }, 0.2);

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`group relative px-16 py-8 bg-transparent border border-white/5 overflow-hidden flex items-center justify-center transition-colors duration-700 ${className}`}
    >
      {/* Background Reveal */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-white/[0.03] backdrop-blur-md opacity-0 scale-y-0 origin-bottom pointer-events-none"
      />

      {/* Decorative Corner Marks */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-white/40 transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-white/40 transition-colors duration-500"></div>

      {/* Synchronized Text Layers */}
      <div className="relative h-4 flex items-center justify-center">
        {/* Phantom Top */}
        <span 
          ref={textTopRef}
          className="absolute text-[9px] font-bold uppercase tracking-[0.5em] text-white opacity-20 -translate-y-8 pointer-events-none blur-[2px]"
        >
          {children}
        </span>

        {/* Main Focus */}
        <span 
          ref={textMainRef}
          className="relative z-10 text-[9px] font-bold uppercase tracking-[0.5em] text-white opacity-30 transition-all duration-500"
        >
          {children}
        </span>

        {/* Phantom Bottom */}
        <span 
          ref={textBottomRef}
          className="absolute text-[9px] font-bold uppercase tracking-[0.5em] text-white opacity-20 translate-y-8 pointer-events-none blur-[2px]"
        >
          {children}
        </span>
      </div>

      {/* Subtle scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[50%] w-full -translate-y-full group-hover:translate-y-[200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
    </button>
  );
};

export default PhantomButton;

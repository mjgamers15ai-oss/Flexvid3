
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ZenithButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
}

const ZenithButton: React.FC<ZenithButtonProps> = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const textMainRef = useRef<HTMLSpanElement>(null);
  const textGhostRef = useRef<HTMLSpanElement>(null);
  const borderTopRef = useRef<HTMLDivElement>(null);
  const borderBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(scanLineRef.current, {
      left: '100%',
      duration: 0.8,
      ease: "power2.inOut"
    }, 0)
    .to(borderTopRef.current, {
      scaleX: 1,
      duration: 0.6,
      ease: "expo.out"
    }, 0)
    .to(borderBottomRef.current, {
      scaleX: 1,
      duration: 0.6,
      ease: "expo.out"
    }, 0)
    .to(textMainRef.current, {
      y: -2,
      letterSpacing: '0.3em',
      opacity: 1,
      duration: 0.4,
      ease: "power3.out"
    }, 0.1)
    .to(textGhostRef.current, {
      y: -2,
      opacity: 0.2,
      duration: 0.5,
      ease: "power3.out"
    }, 0.15);

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
      className={`group relative px-14 py-6 bg-transparent overflow-hidden flex items-center justify-center border-x border-white/10 ${className}`}
    >
      {/* Horizontal Border Strips */}
      <div 
        ref={borderTopRef}
        className="absolute top-0 left-0 w-full h-[1px] bg-white/40 origin-center scale-x-0"
      />
      <div 
        ref={borderBottomRef}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 origin-center scale-x-0"
      />

      {/* Vertical Scan Beam */}
      <div 
        ref={scanLineRef}
        className="absolute top-0 -left-[10%] w-[2px] h-full bg-white/60 blur-[1px] z-20 pointer-events-none"
      />

      {/* Text Layers */}
      <div className="relative flex flex-col items-center">
        <span 
          ref={textMainRef}
          className="relative z-10 text-[9px] font-bold uppercase tracking-[0.45em] text-white opacity-40 transition-opacity duration-300"
        >
          {children}
        </span>
        <span 
          ref={textGhostRef}
          className="absolute top-full left-0 w-full text-[9px] font-bold uppercase tracking-[0.45em] text-white opacity-0 pointer-events-none blur-[1px] translate-y-1"
        >
          {children}
        </span>
      </div>

      {/* Viewfinder Brackets - Ascetic Detail */}
      <div className="absolute top-2 left-2 w-1 h-1 border-t border-l border-white/20 group-hover:border-white/60 transition-colors"></div>
      <div className="absolute top-2 right-2 w-1 h-1 border-t border-r border-white/20 group-hover:border-white/60 transition-colors"></div>
      <div className="absolute bottom-2 left-2 w-1 h-1 border-b border-l border-white/20 group-hover:border-white/60 transition-colors"></div>
      <div className="absolute bottom-2 right-2 w-1 h-1 border-b border-r border-white/20 group-hover:border-white/60 transition-colors"></div>
    </button>
  );
};

export default ZenithButton;

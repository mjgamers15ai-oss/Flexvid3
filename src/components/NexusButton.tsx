
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface NexusButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
}

const NexusButton: React.FC<NexusButtonProps> = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const bracketTLRef = useRef<HTMLDivElement>(null);
  const bracketTRRef = useRef<HTMLDivElement>(null);
  const bracketBLRef = useRef<HTMLDivElement>(null);
  const bracketBRRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const tl = gsap.timeline({ paused: true });

    // Brackets contract inwards
    tl.to([bracketTLRef.current, bracketTRRef.current, bracketBLRef.current, bracketBRRef.current], {
      x: (i) => (i === 1 || i === 3 ? -6 : 6),
      y: (i) => (i === 2 || i === 3 ? -6 : 6),
      opacity: 1,
      duration: 0.5,
      ease: "expo.out"
    }, 0)
    // Background sweep
    .fromTo(sweepRef.current, 
      { xPercent: -100 },
      { xPercent: 100, duration: 1, ease: "power3.inOut" }, 
    0)
    // Text focus effect
    .to(textRef.current, {
      letterSpacing: "0.3em",
      opacity: 1,
      duration: 0.6,
      ease: "power4.out"
    }, 0)
    // Border highlight
    .to(button, {
      borderColor: "rgba(255, 255, 255, 0.4)",
      duration: 0.4
    }, 0);

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
      className={`group relative px-14 py-7 bg-transparent border border-white/10 overflow-hidden flex items-center justify-center transition-all duration-500 ${className}`}
    >
      {/* Background Light Sweep */}
      <div 
        ref={sweepRef}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent w-full h-full pointer-events-none skew-x-12 scale-150"
      />

      {/* Lens Brackets */}
      <div ref={bracketTLRef} className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 opacity-0 pointer-events-none"></div>
      <div ref={bracketTRRef} className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40 opacity-0 pointer-events-none"></div>
      <div ref={bracketBLRef} className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40 opacity-0 pointer-events-none"></div>
      <div ref={bracketBRRef} className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 opacity-0 pointer-events-none"></div>

      {/* Visible Content */}
      <span 
        ref={textRef}
        className="relative z-10 text-[10px] font-bold uppercase tracking-[0.5em] text-white opacity-80 transition-all duration-500"
      >
        {children}
      </span>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-white/20 blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </button>
  );
};

export default NexusButton;


import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AestheticButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
}

const AestheticButton: React.FC<AestheticButtonProps> = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const aura = auraRef.current;
    const text = textRef.current;
    if (!button || !aura || !text) return;

    // Split text into spans for staggered animation if needed, 
    // but for "smooth/ascetic" we'll do a refined letter-spacing & opacity shift
    
    const xTo = gsap.quickTo(aura, "xPercent", { duration: 0.4, ease: "power2.out" });
    const yTo = gsap.quickTo(aura, "yPercent", { duration: 0.4, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100 - 50;
      const y = ((e.clientY - top) / height) * 100 - 50;

      xTo(x);
      yTo(y);
    };

    const handleMouseEnter = () => {
      gsap.to(aura, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "expo.out"
      });
      
      gsap.to(text, {
        letterSpacing: "0.2em",
        opacity: 1,
        duration: 0.8,
        ease: "power4.out"
      });

      gsap.to(button, {
        borderColor: "rgba(255, 255, 255, 0.4)",
        duration: 0.4
      });
    };

    const handleMouseLeave = () => {
      gsap.to(aura, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: "expo.in"
      });

      gsap.to(text, {
        letterSpacing: "0.4em",
        opacity: 0.5,
        duration: 0.8,
        ease: "power4.out"
      });

      gsap.to(button, {
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.4
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`group relative px-12 py-6 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] ${className}`}
    >
      {/* The Internal "Aura" */}
      <div 
        ref={auraRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] opacity-0 scale-50 pointer-events-none z-0"
      />
      
      {/* Glassy Overlay */}
      <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Content */}
      <span 
        ref={textRef}
        className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white opacity-50 transition-all duration-700 ease-out inline-block"
      >
        {children}
      </span>

      {/* Edge Light */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
    </button>
  );
};

export default AestheticButton;

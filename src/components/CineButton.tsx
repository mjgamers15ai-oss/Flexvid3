
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface CineButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const CineButton: React.FC<CineButtonProps> = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const borderRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const border = borderRef.current;
    if (!button || !border) return;

    // Magnetic logic
    const xTo = gsap.quickTo(button, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    
    // SVG Border preparation
    const length = border.getTotalLength();
    gsap.set(border, { strokeDasharray: length, strokeDashoffset: length });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseEnter = () => {
      // Shutter/Focus animation
      gsap.to(textRef.current, {
        letterSpacing: "0.2em",
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.6,
        ease: "expo.out"
      });
      
      // Border draw animation
      gsap.to(border, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.inOut"
      });
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      
      gsap.to(textRef.current, {
        letterSpacing: "0.4em",
        filter: "blur(2px)",
        opacity: 0.5,
        duration: 0.6,
        ease: "expo.out"
      });
      
      gsap.to(border, {
        strokeDashoffset: length,
        duration: 0.6,
        ease: "power2.inOut"
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
      className={`group relative flex items-center justify-center px-10 py-5 bg-transparent overflow-visible ${className}`}
    >
      {/* Animated SVG Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect
          ref={borderRef}
          x="1" y="1" width="98" height="98"
          fill="none"
          stroke="white"
          strokeWidth="1"
          rx="30"
          className="opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        />
        {/* Background static border */}
        <rect
          x="1" y="1" width="98" height="98"
          fill="none"
          stroke="white"
          strokeWidth="1"
          rx="30"
          className="opacity-10"
        />
      </svg>

      <span 
        ref={textRef} 
        className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white opacity-50 blur-[2px] transition-all"
      >
        {children}
      </span>
      
      {/* Decorative dots in corners on hover */}
      <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-500 translate-x-2 translate-y-2"></div>
      <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-500 -translate-x-2 translate-y-2"></div>
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-500 translate-x-2 -translate-y-2"></div>
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-500 -translate-x-2 -translate-y-2"></div>
    </button>
  );
};

export default CineButton;


import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface KineticButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline';
}

const KineticButton: React.FC<KineticButtonProps> = ({ children, onClick, className = '', variant = 'primary' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const shutterLeftRef = useRef<HTMLDivElement>(null);
  const shutterRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Prepare text for scramble effect
    const originalText = children;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    
    const scramble = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        text.innerText = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    };

    const handleMouseEnter = () => {
      scramble();
      
      // Shutter Animation
      gsap.to([shutterLeftRef.current, shutterRightRef.current], {
        scaleX: 1,
        duration: 0.6,
        ease: "expo.inOut",
        stagger: 0.05
      });

      // Text Color Flip
      gsap.to(text, {
        color: variant === 'primary' ? '#000' : '#000',
        duration: 0.4,
        ease: "power2.out"
      });

      // Corner Braces
      gsap.to(".brace", {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)",
        stagger: 0.05
      });
    };

    const handleMouseLeave = () => {
      gsap.to([shutterLeftRef.current, shutterRightRef.current], {
        scaleX: 0,
        duration: 0.6,
        ease: "expo.inOut"
      });

      gsap.to(text, {
        color: variant === 'primary' ? '#fff' : '#fff',
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(".brace", {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.in"
      });
      
      // Reset text
      text.innerText = originalText;
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (button) {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [children, variant]);

  const baseStyles = "relative px-12 py-5 overflow-hidden group transition-all duration-300 border border-white/10 rounded-sm";
  const variantStyles = variant === 'primary' ? "bg-transparent" : "bg-transparent";

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {/* Background Shutters */}
      <div 
        ref={shutterLeftRef}
        className="absolute inset-0 bg-white origin-left scale-x-0 z-0"
      />
      <div 
        ref={shutterRightRef}
        className="absolute inset-0 bg-white origin-right scale-x-0 z-0 opacity-90"
      />

      {/* Decorative Corner Braces */}
      <div className="brace absolute top-0 left-0 w-2 h-2 border-t border-l border-white z-20 opacity-0 scale-50"></div>
      <div className="brace absolute top-0 right-0 w-2 h-2 border-t border-r border-white z-20 opacity-0 scale-50"></div>
      <div className="brace absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white z-20 opacity-0 scale-50"></div>
      <div className="brace absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white z-20 opacity-0 scale-50"></div>

      {/* Inner Content */}
      <span 
        ref={textRef}
        className="relative z-10 font-bold text-[10px] uppercase tracking-[0.4em] whitespace-nowrap inline-block"
      >
        {children}
      </span>
      
      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 opacity-0 group-hover:opacity-100 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
    </button>
  );
};

export default KineticButton;


import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Fix: Initialize GSAP state to prevent "not eligible for reset" errors with quickTo
    // We explicitly set the rotation values so GSAP's cache is populated.
    gsap.set(card, { rotateX: 0, rotateY: 0 });

    const xTo = gsap.quickTo(card, "rotateY", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(card, "rotateX", { duration: 0.7, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) / (width / 2);
      const y = (e.clientY - (top + height / 2)) / (height / 2);

      xTo(x * 15); // max 15 degrees
      yTo(-y * 15);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      // Ensure clean state on unmount
      gsap.set(card, { rotateX: 0, rotateY: 0 });
    };
  }, []);

  return (
    <div style={{ perspective: '1000px' }}>
      <div 
        ref={cardRef} 
        className={`transform-gpu ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltCard;

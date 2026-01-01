
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const upperRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const text = "FLEXVID";
      textElement.innerHTML = text.split("").map(char => 
        `<span class="loader-char inline-block opacity-0 translate-y-6 scale-y-50 origin-bottom">${char}</span>`
      ).join("");
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) containerRef.current.style.display = 'none';
        onComplete();
      }
    });

    // 1. Precise entrance
    tl.to(".loader-char", {
      opacity: 1,
      y: 0,
      scaleY: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "expo.out",
      delay: 0.5
    })
    // 2. Exact 0.5em character expansion for elite branding
    .to(textRef.current, {
      letterSpacing: "0.5em",
      duration: 2,
      ease: "power3.inOut"
    }, "-=0.2")
    // 3. Cinematic dissipation
    .to(textRef.current, {
      opacity: 0,
      filter: "blur(20px)",
      scale: 1.1,
      duration: 1,
      ease: "power4.in"
    }, "-=0.8")
    // 4. Reveal shutter
    .to(upperRef.current, {
      yPercent: -100,
      duration: 1.5,
      ease: "expo.inOut"
    }, "open")
    .to(lowerRef.current, {
      yPercent: 100,
      duration: 1.5,
      ease: "expo.inOut"
    }, "open");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex items-center justify-center">
      <div ref={upperRef} className="absolute top-0 left-0 w-full h-1/2 bg-white z-[101]"></div>
      <div ref={lowerRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-[101]"></div>
      
      <div className="relative z-[102] flex items-center justify-center px-10">
        <div 
          ref={textRef} 
          className="font-sync font-bold text-3xl md:text-5xl lg:text-6xl text-black tracking-[0.1em] select-none whitespace-nowrap leading-none"
        >
          FLEXVID
        </div>
      </div>
    </div>
  );
};

export default Loader;

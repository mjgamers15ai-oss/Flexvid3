import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NexusButton from './NexusButton';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Internal reveal for non-giant elements
      gsap.fromTo(containerRef.current?.querySelectorAll('.reveal-item'),
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          stagger: 0.1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Massive text scroll interaction
      gsap.fromTo(".cta-giant-text", 
        { scale: 0.9, opacity: 0, filter: "blur(20px)" },
        { 
          scale: 1, 
          opacity: 1, 
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Subtle expansion on scroll
      gsap.to(".cta-giant-text", {
        letterSpacing: "0.05em",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-60 pb-40 px-6 relative overflow-hidden flex flex-col items-center text-center bg-[#020202]">
      {/* Cinematic grid background refined */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05)_0%,_transparent_70%)]"></div>
      </div>
      
      <div ref={textContainerRef} className="max-w-7xl relative z-10 space-y-16">
        <div className="space-y-4">
          <span className="reveal-item text-[11px] uppercase tracking-[1em] text-white/20 font-black block">Exclusive Partnership</span>
          <div className="cta-giant-text flex flex-col items-center">
            <h2 className="text-6xl md:text-[10rem] lg:text-[12rem] font-black leading-[0.78] tracking-tighter uppercase font-sync">
              <span className="glow-text-intense block">BEYOND</span>
              <span className="outline-text block mt-[-0.05em]">STANDARD.</span>
            </h2>
          </div>
        </div>

        <p className="reveal-item text-xs md:text-xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed">
          We only partner with brands that demand absolute excellence. <br className="hidden md:block" />
          Join the elite circle of narrative masters.
        </p>
        
        <div className="reveal-item flex flex-col items-center gap-14 pt-8">
          <NexusButton className="!px-20 !py-10 !text-[11px] !font-black !rounded-sm hover:scale-105 transition-transform duration-500">
            APPLY TO PARTNER
          </NexusButton>
          
          <div className="flex items-center gap-10 opacity-20 hover:opacity-60 transition-opacity duration-700">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[8px] font-bold tracking-[0.5em] uppercase">Limited Q4 Slots</span>
              <div className="w-10 h-[1px] bg-white/40"></div>
            </div>
            <div className="w-[1px] h-6 bg-white/20 rotate-12"></div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[8px] font-bold tracking-[0.5em] uppercase">Private Studio</span>
              <div className="w-10 h-[1px] bg-white/40"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
          color: transparent;
          text-shadow: none !important;
        }
        .outline-text:hover {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
          transition: -webkit-text-stroke 0.5s ease;
        }
      `}</style>
    </section>
  );
};

export default FinalCTA;
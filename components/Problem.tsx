
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Problem: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(words, 
          { 
            opacity: 0,
            filter: 'blur(10px)',
            y: 20,
            scale: 0.98
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            scale: 1,
            stagger: 0.05,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top 85%',
              end: 'bottom 40%',
              scrub: 0.5,
            }
          }
        );
      }
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const text = "Noise kills attention. In a world of infinite scrolling, generic content is invisible. Most brands fail because their stories are lost in the static. We are the filter.";

  return (
    <section ref={triggerRef} id="problem" className="pt-48 pb-24 px-6 flex justify-center items-center bg-black min-h-[60vh] relative overflow-hidden">
      {/* Cinematic grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="max-w-6xl text-center relative z-10">
        <h2 ref={textRef} className="text-3xl md:text-5xl lg:text-[4.5rem] font-bold leading-[1.3] tracking-tight text-white flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em] glow-text-soft">
          {text.split(' ').map((word, i) => (
            <span key={i} className="word inline-block will-change-[transform,opacity,filter]">
              {word}
            </span>
          ))}
        </h2>
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="h-[1px] w-24 bg-white/20"></div>
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/20 font-black">Strategic Perspective</span>
        </div>
      </div>
    </section>
  );
};

export default Problem;

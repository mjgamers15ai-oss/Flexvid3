
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import NexusButton from './NexusButton';
import CineButton from './CineButton';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const text = titleRef.current.innerText;
        // Split by words first to prevent word-breaks, then characters
        titleRef.current.innerHTML = text.split(" ").map(word => {
          return `<span class="inline-block whitespace-nowrap">` + 
            word.split("").map(c => 
              `<span class="hero-char inline-block translate-y-[110%] opacity-0 filter blur-[10px]">${c}</span>`
            ).join("") + 
          `</span>`;
        }).join('<span class="inline-block">&nbsp;</span>');
      }

      const tl = gsap.timeline({ delay: 2.5 });

      tl.to(".hero-char", {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.02,
        duration: 1.2,
        ease: "expo.out"
      })
      .fromTo(sublineRef.current, 
        { opacity: 0, y: 30, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power3.out" },
        "-=0.9"
      )
      .fromTo(actionsRef.current, 
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" },
        "-=1"
      );

      // Background Parallax
      gsap.to('.hero-bg-asset', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden px-6 pt-16">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
        <div className="hero-bg-asset absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,30,30,1)_0%,_rgba(0,0,0,1)_100%)] opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white/5 rounded-full opacity-20 blur-[1px]"></div>
      </div>

      <div className="max-w-6xl space-y-12 z-10 flex flex-col items-center">
        {/* Padding added to overflow container to prevent text-shadow clipping */}
        <div className="overflow-hidden p-10 -m-10">
          <h1 ref={titleRef} className="text-4xl md:text-[5rem] lg:text-[6.5rem] font-extrabold leading-[1] tracking-tightest uppercase w-full glow-text-intense px-4">
            ELEVATE EVERY SINGLE FRAME.
          </h1>
        </div>
        
        <p ref={sublineRef} className="text-sm md:text-base lg:text-xl text-white/40 max-w-xl mx-auto font-light leading-relaxed opacity-0">
          A boutique creative studio specializing in precision-cut cinematic storytelling for high-end brands and global creators.
        </p>

        <div ref={actionsRef} className="flex flex-col sm:flex-row items-center justify-center gap-14 pt-6 opacity-0">
          <NexusButton>Start Your Project</NexusButton>
          <CineButton>View Work</CineButton>
        </div>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-20">
        <span className="text-[9px] uppercase tracking-[0.6em] font-black glow-text-soft">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white via-white/40 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
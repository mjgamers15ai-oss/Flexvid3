
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  {
    number: "01",
    phase: "IMMERSION",
    title: "Discovery",
    desc: "We begin with a strategic audit of your brand's existing assets and narrative goals. We define the emotional arc that will command your audience's focus.",
    tags: ["Narrative Audit", "Competitive Edge", "Visual Blueprint"],
    detail: "PHASE 01: THE FOUNDATION"
  },
  {
    number: "02",
    phase: "SURGERY",
    title: "Curation",
    desc: "The 'Invisible Edit'. We surgically strip away the excess to reveal the masterpiece within. Pacing is dialed in to the exact millisecond of impact.",
    tags: ["Elite Selection", "Rhythmic Flow", "Emotional Anchors"],
    detail: "PHASE 02: THE SELECTION"
  },
  {
    number: "03",
    phase: "REFINERY",
    title: "Alchemy",
    desc: "Color science and psychoacoustic sound design. We apply elite-grade grading and spatial audio to transport your viewers into your world.",
    tags: ["12-Bit Color", "Spatial Audio", "VFX Sculpting"],
    detail: "PHASE 03: THE POLISH"
  },
  {
    number: "04",
    phase: "ZENITH",
    title: "Delivery",
    desc: "Optimized for the high-end display. We deliver master-grade exports across every vertical and horizontal format for a seamless launch.",
    tags: ["4K HDR Masters", "Multi-Platform", "Launch Strategy"],
    detail: "PHASE 04: THE IMPACT"
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!scrollRef.current || !containerRef.current) return;
      
      const scrollWidth = scrollRef.current.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      // 1. Horizontal Scroll Trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${amountToScroll * 1.8}`, // Extended for better scrub experience
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      });

      tl.to(scrollRef.current, {
        x: -amountToScroll,
        ease: 'none',
      });

      // 2. Synchronized Progress bar
      if (progressRef.current) {
        tl.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
        }, 0);
      }

      // 3. Staggered reveal for each card's content as it scrolls in
      const cardContents = gsap.utils.toArray('.process-card-content');
      cardContents.forEach((content: any) => {
        gsap.fromTo(content, 
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: content,
              containerAnimation: tl,
              start: 'left 85%',
              end: 'left 45%',
              scrub: true,
            }
          }
        );
      });

      // 4. Parallax effect for the background numbers
      const bgNumbers = gsap.utils.toArray('.bg-number');
      bgNumbers.forEach((num: any) => {
        gsap.to(num, {
          x: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: num,
            containerAnimation: tl,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="bg-[#020202] relative overflow-hidden h-screen flex items-center">
      {/* Visual background details */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.01] blur-[150px] rounded-full"></div>
      </div>

      {/* Persistent Info Header */}
      <div className="absolute top-12 left-10 md:top-20 md:left-20 z-20 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-white/40"></div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">Execution Workflow</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tightest uppercase italic opacity-10 font-sync">FLEXVID STUDIO</h2>
      </div>

      {/* Progress Track */}
      <div className="absolute bottom-16 left-10 right-10 h-[1px] bg-white/10 z-20 md:left-20 md:right-20">
        <div 
          ref={progressRef} 
          className="h-full bg-white origin-left scale-x-0 transition-transform duration-300"
        />
        <div className="flex justify-between mt-3">
          <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/20">Init</span>
          <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/20">Mastery</span>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex h-full items-center gap-[10vw] px-[15vw] whitespace-nowrap will-change-transform">
        {steps.map((step, i) => (
          <div key={i} className="process-step min-w-[90vw] md:min-w-[55vw] group relative py-20">
            
            {/* Background Giant Text - Parallax */}
            <span className="bg-number font-sync text-[20rem] md:text-[35rem] font-bold text-white/[0.015] select-none leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none tracking-tighter">
              {step.number}
            </span>

            <div className="process-card-content relative z-10 flex flex-col justify-center">
              <div className="flex flex-col gap-10">
                <div className="space-y-4">
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-white/30 font-bold block border-b border-white/10 pb-4 max-w-fit">
                    {step.detail}
                  </span>
                  <div className="flex items-baseline gap-6">
                    <h3 className="text-5xl md:text-8xl font-black tracking-tightest uppercase leading-none">
                      {step.title}
                    </h3>
                    <span className="text-lg md:text-2xl font-light italic text-white/20 uppercase font-sync">{step.phase}</span>
                  </div>
                </div>

                <p className="text-base md:text-xl text-white/50 max-w-lg whitespace-normal font-light leading-relaxed">
                  {step.desc}
                </p>

                {/* Interactive Pills */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {step.tags.map((tag, j) => (
                    <div key={j} className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.03] group/pill hover:border-white/20 hover:bg-white/5 transition-all duration-300">
                      <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover/pill:bg-white transition-colors"></div>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 group-hover/pill:text-white transition-colors">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ))}
        
        {/* Generous Padding for smooth end */}
        <div className="min-w-[40vw]"></div>
      </div>
    </section>
  );
};

export default Process;

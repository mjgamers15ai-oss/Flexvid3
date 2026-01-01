import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.reveal-item');
      
      gsap.fromTo(items, 
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const vitals = [
    { label: "Views Generated", value: "500M+" },
    { label: "Global Partners", value: "40+" },
    { label: "Awards Won", value: "12" },
    { label: "Revision Rate", value: "0.1%" }
  ];

  return (
    <section id="about-page" ref={containerRef} className="pt-48 pb-40 px-8 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-end mb-48">
          <div className="reveal-item">
            <span className="text-[11px] uppercase tracking-[0.8em] text-white/20 font-black block mb-8">The Studio Manifesto</span>
            <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tightest leading-[0.85] uppercase font-sync glow-text">
              THE <br /> <span className="text-white/30">FILTER.</span>
            </h1>
          </div>
          <div className="reveal-item pb-4">
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/60 max-w-xl">
              FLEXVID is a boutique creative house dedicated to the elimination of generic noise. We partner with visionaries who demand precision, narrative depth, and absolute technical purity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-48 reveal-item">
          {vitals.map((vital, i) => (
            <div key={i} className="space-y-6 border-t border-white/10 pt-10">
              <h2 className="text-4xl md:text-6xl font-sync font-bold glow-text-intense text-white">{vital.value}</h2>
              <p className="text-[9px] uppercase tracking-[0.6em] text-white/30 font-black">{vital.label}</p>
            </div>
          ))}
        </div>

        <div className="reveal-item relative overflow-hidden rounded-[3rem] bg-white/[0.03] border border-white/5 flex items-center justify-center p-12 md:p-24 group">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05)_0%,_transparent_60%)]"></div>
          </div>
          <div className="text-center relative z-10 max-w-4xl space-y-10">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-sync font-bold glow-text-soft leading-tight">WE DO NOT EDIT.<br/>WE SCULPT.</h3>
            <p className="text-white/40 uppercase tracking-[0.25em] text-[11px] md:text-[13px] leading-[2.2] font-medium max-w-2xl mx-auto">
              Every frame is a calculation. Every cut is a pulse. Our methodology is rooted in the psychological impact of pacing and visual geometry. We are the architects of your digital legacy.
            </p>
          </div>
        </div>

        <div className="mt-48 grid md:grid-cols-3 gap-24 reveal-item">
          <div className="space-y-8">
            <div className="w-16 h-[1px] bg-white/20"></div>
            <h4 className="text-[11px] uppercase tracking-[0.6em] font-black text-white/30">Studio Philosophy</h4>
            <p className="text-sm text-white/50 leading-relaxed font-light italic">"We believe in quality over quantity. That is why we only accept three exclusive partnerships per quarter."</p>
          </div>
          <div className="space-y-8">
            <div className="w-16 h-[1px] bg-white/20"></div>
            <h4 className="text-[11px] uppercase tracking-[0.6em] font-black text-white/30">Technical Purity</h4>
            <p className="text-sm text-white/50 leading-relaxed font-light">No templates. No presets. Every grade and sound profile is tailored to the project's unique digital frequency.</p>
          </div>
          <div className="space-y-8">
            <div className="w-16 h-[1px] bg-white/20"></div>
            <h4 className="text-[11px] uppercase tracking-[0.6em] font-black text-white/30">Global Reach</h4>
            <p className="text-sm text-white/50 leading-relaxed font-light">Operating from New York, London, and Tokyo. We serve the world's most elite creative minds across all timezones.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
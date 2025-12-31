import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage: React.FC = () => {
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

  const details = [
    {
      title: "Cinematic Brand Films",
      detail: "We create immersive 4K HDR narratives that define brand legacies. From high-fashion to tech innovation, our films are built to withstand time.",
      specs: ["Scripting", "Direction", "12-Bit Color", "Mastering"]
    },
    {
      title: "Performance Advertising",
      detail: "Precision-cut ads designed for the scrolling generation. We optimize for the first 3 seconds to ensure maximum hook-rate and conversion.",
      specs: ["A/B Hooks", "UGC Hybrid", "Viral-Pacing", "Dynamic CTAs"]
    },
    {
      title: "Creator Ecosystems",
      detail: "Empowering global creators with a dedicated editing desk. We manage everything from raw ingest to multi-platform horizontal and vertical exports.",
      specs: ["Retention Edits", "Storytelling", "SEO-Metadata", "Thumbnails"]
    },
    {
      title: "Visual Identity & Motion",
      detail: "Custom kinetic typography and visual effects that give your brand a unique motion signature. We don't use templates; we build assets.",
      specs: ["VFX Design", "Kinetic Typography", "Soundscapes", "Logo Animation"]
    }
  ];

  return (
    <section id="services-page" ref={containerRef} className="pt-48 pb-32 px-6 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 reveal-item">
          <span className="text-[11px] uppercase tracking-[0.5em] text-white/30 font-bold block mb-4">The Catalog</span>
          <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tightest leading-[0.85] uppercase font-sync glow-text">
            PRECISION <br /> SERVICES.
          </h1>
        </div>

        <div className="grid gap-20">
          {details.map((service, i) => (
            <div key={i} className="group border-t border-white/10 pt-16 grid lg:grid-cols-12 gap-12 reveal-item">
              <div className="lg:col-span-2">
                 <span className="text-4xl font-sync font-bold text-white/10 group-hover:text-white transition-colors duration-700">0{i+1}</span>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight glow-text-soft">{service.title}</h2>
                <p className="text-lg text-white/50 leading-relaxed font-light">
                  {service.detail}
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4 content-start">
                {service.specs.map((spec, j) => (
                  <div key={j} className="bg-white/[0.03] border border-white/5 p-5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 p-12 md:p-20 bg-white/[0.02] border border-white/10 rounded-[3rem] text-center reveal-item relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <h3 className="relative z-10 text-3xl font-sync font-bold mb-12 glow-text-soft">THE TECH STACK</h3>
          <div className="relative z-10 flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-40">
            {['12-BIT LOG', 'SPATIAL AUDIO', '4K HDR', 'DA VINCI RESOLVE', 'PREMIERE PRO', 'AFTER EFFECTS'].map((tech) => (
              <span key={tech} className="text-[10px] uppercase tracking-[0.4em] font-black hover:text-white transition-colors cursor-default">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
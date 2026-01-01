import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '../components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const WorkPage: React.FC = () => {
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

  const projects = [
    { title: "Aether Motion", category: "Brand Film", year: "2024", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" },
    { title: "Vantage Point", category: "Commercial", year: "2023", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600" },
    { title: "Neon Pulse", category: "Short-Form", year: "2024", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1600" },
    { title: "The Filter", category: "Documentary", year: "2024", img: "https://images.unsplash.com/photo-1492691523567-6170f0295da4?auto=format&fit=crop&q=80&w=2070" },
    { title: "Urban Zenith", category: "Brand Film", year: "2023", img: "https://images.unsplash.com/photo-1478720143907-28973b0a21d2?auto=format&fit=crop&q=80&w=1600" },
    { title: "Stellar Flow", category: "Motion", year: "2024", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1600" },
  ];

  return (
    <section id="work-page" ref={containerRef} className="pt-48 pb-32 px-6 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 reveal-item">
          <span className="text-[11px] uppercase tracking-[0.5em] text-white/30 font-bold block mb-4">The Archive</span>
          <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tightest leading-[0.85] uppercase font-sync glow-text">
            SELECTED <br /> WORKS.
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {projects.map((project, i) => (
            <div key={i} className="group cursor-pointer reveal-item">
              <TiltCard>
                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/40 transition-all duration-700">
                  <img 
                    src={project.img} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0" 
                    alt={project.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  <div className="absolute bottom-8 left-8 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/60">{project.category}</span>
                    <h3 className="text-3xl font-bold glow-text-soft text-white">{project.title}</h3>
                  </div>
                  <div className="absolute top-8 right-8 text-[10px] font-mono tracking-widest text-white/30 group-hover:text-white/80 transition-colors">
                    /{project.year}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
        
        <div className="mt-40 text-center reveal-item">
          <p className="text-white/20 text-xs uppercase tracking-[0.8em] font-black">Archive Continued</p>
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-8"></div>
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
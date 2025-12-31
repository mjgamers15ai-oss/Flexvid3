import React from 'react';
import TiltCard from './TiltCard';

const projects = [
  {
    title: "Aether Motion",
    category: "Brand Film",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
    year: "2024"
  },
  {
    title: "Vantage Point",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
    year: "2023"
  },
  {
    title: "Neon Pulse",
    category: "Short-Form",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1600",
    year: "2024"
  }
];

const Work: React.FC = () => {
  return (
    <section id="work" className="py-48 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-28 gap-8 reveal-item">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black block">Portfolio</span>
            <h2 className="text-6xl md:text-[7rem] font-bold tracking-tighter uppercase leading-none glow-text">THE SHOWREEL.</h2>
          </div>
          <div className="text-right">
            <p className="text-white/30 max-w-xs text-xs uppercase tracking-[0.3em] leading-relaxed mb-6 font-bold">
              Narrative meeting technical perfection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className={`${i === 0 ? 'md:col-span-12' : 'md:col-span-6'} group cursor-pointer reveal-item`}
            >
              <TiltCard>
                <div className="relative overflow-hidden rounded-[3rem] aspect-video md:aspect-[21/9] bg-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-700">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-70"></div>
                  
                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                    <div className="space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40">{project.category}</span>
                      <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight glow-text-soft">{project.title}</h3>
                    </div>
                    <div className="opacity-0 group-hover:opacity-40 transition-opacity duration-1000 font-mono text-sm tracking-widest text-white/40">
                      /{project.year}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
import React from 'react';
import ComparisonSlider from './ComparisonSlider';

const Transformation: React.FC = () => {
  return (
    <section id="transformation" className="pt-60 pb-40 px-6 bg-[#030303]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="reveal-item text-[11px] uppercase tracking-[0.6em] text-white/20 font-black block">Technical Alchemy</span>
            <h2 className="reveal-item text-6xl md:text-8xl lg:text-[7.5rem] font-black leading-[0.8] tracking-tighter uppercase font-sync glow-text">
              WE BRING <br /> <span className="text-white/40">THE CLARITY.</span>
            </h2>
          </div>
          
          <p className="reveal-item text-xl text-white/40 leading-relaxed max-w-lg font-light">
            Raw footage is just potential. We sculpt it into a narrative weapon using elite-level color grading and precision psychoacoustic engineering.
          </p>
          
          <div className="reveal-item pt-8 flex flex-wrap gap-16">
            <div className="space-y-2 border-l border-white/10 pl-8">
              <h4 className="text-3xl font-bold glow-text-soft">4K HDR</h4>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-black">Master Delivery</p>
            </div>
            <div className="space-y-2 border-l border-white/10 pl-8">
              <h4 className="text-3xl font-bold glow-text-soft">12-BIT</h4>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-black">Color Depth</p>
            </div>
          </div>
        </div>
        
        <div className="reveal-item relative group">
          <div className="absolute -inset-4 bg-white/[0.01] blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <ComparisonSlider />
          <div className="absolute -bottom-8 -left-8 bg-white text-black px-10 py-6 rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.5)] hidden md:block">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-6 h-[1px] bg-black"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.6em]">Interactive Proof</p>
            </div>
            <p className="text-[9px] opacity-40 uppercase tracking-widest font-bold">Slide to Reveal</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transformation;
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-24 px-8 border-t border-white/[0.03] bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
        
        {/* Logo/Identity */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-4 text-xs font-bold tracking-[0.4em] font-sync cursor-pointer group"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 border border-white/20 rotate-45 group-hover:rotate-[225deg] transition-all duration-1000"></div>
            <div className="w-1 h-1 bg-white rotate-45 group-hover:scale-150 transition-transform"></div>
          </div>
          <span className="glow-text-soft">FLEXVID</span>
        </div>
        
        {/* Nav links refined */}
        <div className="flex flex-wrap justify-center gap-12 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
          {['services', 'work', 'about'].map((view) => (
            <button 
              key={view}
              onClick={() => onNavigate(view as ViewType)} 
              className="relative py-2 group/foot hover:text-white transition-all duration-500 overflow-hidden"
            >
              <span className="block translate-y-0 group-hover/foot:-translate-y-full transition-transform duration-500">{view}</span>
              <span className="absolute top-0 left-0 block translate-y-full group-hover/foot:translate-y-0 transition-transform duration-500 text-white">{view}</span>
            </button>
          ))}
        </div>
        
        {/* Metadata */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-medium">
            © 2025 FLEXVID STUDIO. BUILT FOR THE ELITE.
          </div>
          <div className="flex items-center gap-4 text-[8px] text-white/10 uppercase tracking-widest font-mono">
            <span>40.7128° N, 74.0060° W</span>
            <div className="w-1 h-1 rounded-full bg-white/5"></div>
            <span>v2.1.0_PRO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
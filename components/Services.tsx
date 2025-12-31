import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import TiltCard from './TiltCard';
import NexusButton from './NexusButton';

// Extended Data Model for Rich Content
const services = [
  {
    id: 1,
    title: "Cinematic Brand Films",
    shortDesc: "Long-form narrative experiences designed to build deep brand equity.",
    fullDesc: "We don't just shoot video; we architect legacies. Our brand films are 4K HDR masterpieces that blend documentary-style authenticity with Hollywood-grade cinematography. We handle everything from storyboard conception to the final color grade.",
    icon: "01",
    features: ["Narrative Architecture", "Cinema Camera Production", "Original Score Composition", "Theatrical Color Grading"],
    cta: "Start Production"
  },
  {
    id: 2,
    title: "Performance Ads",
    shortDesc: "Precision-engineered creatives optimized for conversion and retention.",
    fullDesc: "In the attention economy, you have 3 seconds. Our performance ads are scientifically engineered to stop the scroll. We combine psychological hooks with high-fidelity visuals to drive unprecedented ROAS across Meta, TikTok, and YouTube.",
    icon: "02",
    features: ["A/B Hook Testing", "Conversion Copywriting", "Viral Pacing", "Multi-Format Export"],
    cta: "Scale Your Ads"
  },
  {
    id: 3,
    title: "YouTube Strategy",
    shortDesc: "Elevating creators with high-fidelity editing and narrative pacing.",
    fullDesc: "We turn channels into media empires. By analyzing retention graphs and algorithm shifts, we apply a data-backed narrative structure to your content, ensuring higher AVD (Average View Duration) and explosive subscriber growth.",
    icon: "03",
    features: ["Retention Editing", "Thumbnail Design", "Channel Analytics", "Content Roadmap"],
    cta: "Optimize Channel"
  },
  {
    id: 4,
    title: "Short-Form Content",
    shortDesc: "Viral-ready vertical content that dominates the social landscape.",
    fullDesc: "Vertical video is the new prime time. We produce high-volume, high-quality Shorts and Reels that maintain your premium brand image while capitalizing on trending audio and visual formats.",
    icon: "04",
    features: ["Trend Jacking", "Kinetic Typography", "Sound Design", "Daily Output"],
    cta: "Go Viral"
  }
];

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);
  const [originRect, setOriginRect] = useState<Rect | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Safety cleanup for scroll locking
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCardClick = (service: typeof services[0], e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimating || activeService) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setOriginRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    });
    setActiveService(service);
    document.body.style.overflow = 'hidden'; 
  };

  const handleClose = () => {
    if (isAnimating || !activeService || !originRect || !expandedCardRef.current) return;
    setIsAnimating(true);
    
    const card = expandedCardRef.current;
    const currentRect = card.getBoundingClientRect();
    const scaleX = originRect.width / currentRect.width;
    const scaleY = originRect.height / currentRect.height;
    const targetX = originRect.left - currentRect.left;
    const targetY = originRect.top - currentRect.top;
    
    const targetVisualRadius = 40; 
    const calculatedCssRadius = targetVisualRadius / scaleX; 

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setActiveService(null);
          setOriginRect(null);
          setIsAnimating(false);
          document.body.style.overflow = '';
        }
      });

      tl.to(contentRef.current, { opacity: 0, duration: 0.15, ease: "power1.out" })
      .to(card, {
        x: targetX,
        y: targetY,
        scaleX: scaleX,
        scaleY: scaleY,
        borderRadius: `${calculatedCssRadius}px`,
        duration: 0.55,
        ease: "power3.inOut" 
      }, 0)
      .to(backdropRef.current, { opacity: 0, duration: 0.55, ease: "power2.inOut" }, 0);
    });
  };

  useLayoutEffect(() => {
    if (activeService && originRect && expandedCardRef.current) {
      setIsAnimating(true);
      const card = expandedCardRef.current;
      const finalRect = card.getBoundingClientRect();

      const deltaX = originRect.left - finalRect.left;
      const deltaY = originRect.top - finalRect.top;
      const scaleX = originRect.width / finalRect.width;
      const scaleY = originRect.height / finalRect.height;

      gsap.set(card, {
        x: deltaX,
        y: deltaY,
        scaleX: scaleX,
        scaleY: scaleY,
        borderRadius: `${40 / scaleX}px`, 
        opacity: 1
      });
      
      gsap.set(contentRef.current, { opacity: 0, y: 15 });
      gsap.set(backdropRef.current, { opacity: 0 });

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setIsAnimating(false)
        });

        tl.to(backdropRef.current, { opacity: 1, duration: 0.5 })
        .to(card, {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          borderRadius: "2rem",
          duration: 0.65,
          ease: "power3.inOut"
        }, 0)
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        }, 0.25);
      }, overlayRef);

      return () => ctx.revert();
    }
  }, [activeService, originRect]);

  return (
    <section id="services" ref={containerRef} className="py-48 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 reveal-item">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] text-white/30 font-black">Expertise</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter glow-text uppercase font-sync">OUR SERVICES.</h2>
          </div>
          <p className="text-white/30 max-w-xs text-[10px] uppercase tracking-[0.3em] font-bold leading-relaxed">
            Scalable creative solutions for digital leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="reveal-item">
              <TiltCard className="h-full">
                <div 
                  onClick={(e) => handleCardClick(service, e)}
                  className={`group relative h-full p-12 bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden ${activeService?.id === service.id ? 'opacity-0' : 'opacity-100'}`}
                >
                  <div className="text-white/10 text-6xl font-black mb-16 group-hover:text-white group-hover:scale-110 transition-all duration-700 font-sync glow-text-soft">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 glow-text-soft uppercase tracking-tight">{service.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-10 font-light">{service.shortDesc}</p>
                  
                  <div className="absolute bottom-10 right-10 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M12 5V19M5 12H19" />
                    </svg>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {activeService && createPortal(
        <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div ref={backdropRef} onClick={handleClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl pointer-events-auto cursor-zoom-out"></div>
          
          <div 
            ref={expandedCardRef}
            className="absolute bg-[#050505] border border-white/10 overflow-hidden shadow-2xl pointer-events-auto origin-top-left"
            style={{ 
              width: '90vw', 
              maxWidth: '1000px', 
              height: '80vh', 
              top: '50%', 
              left: '50%',
              marginTop: '-40vh',
              marginLeft: 'max(-45vw, -500px)',
              borderRadius: '2rem',
              willChange: 'transform'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-black pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute -top-20 -left-10 text-[20rem] md:text-[25rem] font-black text-white/[0.02] font-sync select-none pointer-events-none leading-none overflow-hidden z-0">
                {activeService.icon}
             </div>

            <div ref={contentRef} className="relative z-10 w-full h-full p-8 md:p-14 flex flex-col md:flex-row gap-12 md:gap-24 overflow-y-auto custom-scrollbar">
              <div className="md:w-5/12 flex flex-col h-full relative">
                 <div className="mb-12">
                   <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] glow-text-intense mb-8 break-words">
                     {activeService.title}
                   </h3>
                   <div className="w-24 h-1.5 bg-white"></div>
                 </div>
                 
                 <div className="hidden md:block mt-auto">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-6 block border-b border-white/10 pb-4 w-fit">Capabilities</span>
                    <ul className="space-y-4">
                      {activeService.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-4 text-sm text-white/80 font-medium">
                              <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
                              {feature}
                          </li>
                      ))}
                    </ul>
                 </div>
              </div>

              <div className="md:w-7/12 flex flex-col h-full pt-2 md:pt-4">
                 <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-light mb-12 md:mb-auto">
                    {activeService.fullDesc}
                 </p>
                 <div className="md:hidden mb-12">
                   <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-4 block">Capabilities</span>
                   <ul className="space-y-3">
                     {activeService.features.map((feature, idx) => (
                         <li key={idx} className="flex items-center gap-3 text-sm text-white/70">
                             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                             {feature}
                         </li>
                     ))}
                   </ul>
                 </div>
                 <div className="border-t border-white/10 pt-10 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                    <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold block">Production Timeline</span>
                        <span className="text-base font-sync font-bold text-white block">2-4 WEEKS AVG.</span>
                    </div>
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                         <div className="hidden lg:flex flex-col items-end">
                            <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-1">Status</span>
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                ACCEPTING
                            </span>
                        </div>
                        <NexusButton onClick={handleClose} className="w-full sm:w-auto !py-4 !px-8">
                            {activeService.cta}
                        </NexusButton>
                    </div>
                 </div>
              </div>

              <button onClick={handleClose} className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all duration-300 group z-50 backdrop-blur-md">
                <div className="relative w-4 h-4">
                    <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-white -translate-y-1/2 rotate-45 group-hover:rotate-90 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>
                    <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-white -translate-y-1/2 -rotate-45 group-hover:-rotate-90 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>
                </div>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Services;
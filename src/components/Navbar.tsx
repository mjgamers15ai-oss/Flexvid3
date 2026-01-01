import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import NexusButton from './NexusButton';
import { ViewType } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useLayoutEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power4.out", 
        delay: 2.5 
      }
    );
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(menuRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.6,
        ease: 'expo.out'
      });
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [isMobileMenuOpen]);

  const navLinks: { label: string; view: ViewType }[] = [
    { label: 'Services', view: 'services' },
    { label: 'Work', view: 'work' },
    { label: 'About', view: 'about' },
  ];

  const handleLinkClick = (view: ViewType) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-5 flex flex-col items-center opacity-0 pointer-events-none">
      <div className="max-w-7xl w-full flex justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 px-6 md:px-8 py-3 rounded-full shadow-2xl pointer-events-auto relative z-20">
        
        {/* Diamond Logo Branding */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 cursor-pointer group relative"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 border border-white/20 rotate-45 group-hover:rotate-[225deg] group-hover:border-white/60 transition-all duration-1000 ease-in-out"></div>
            <div className="w-1.5 h-1.5 bg-white rotate-45 shadow-[0_0_8px_rgba(255,255,255,0.6)] group-hover:scale-125 transition-transform duration-500"></div>
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tighter uppercase font-sync glow-text-soft">
            FLEXVID
          </span>
        </div>
        
        {/* Nav Links */}
        <div className="hidden md:flex gap-6 lg:gap-8 text-[11px] uppercase tracking-tight font-bold text-white/40">
          {navLinks.map((link) => (
            <button 
              key={link.label}
              onClick={() => handleLinkClick(link.view)}
              className={`relative py-1 transition-all duration-300 hover:text-white group/link ${currentView === link.view ? 'text-white' : ''}`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-500 ${currentView === link.view ? 'w-full shadow-[0_0_8px_white]' : 'w-0 group-hover/link:w-full'}`}></span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <NexusButton 
            className="!px-6 !py-2.5 !text-[10px]"
            onClick={() => handleLinkClick('about')}
          >
            Enquire
          </NexusButton>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1 p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className={`w-5 h-[1.5px] bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-[1.5px] bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-[1.5px] bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={menuRef}
        className="md:hidden w-[95%] overflow-hidden h-0 opacity-0 pointer-events-auto bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] mt-2 flex flex-col items-center justify-center z-10 shadow-2xl"
      >
        <div className="py-12 flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.label}
              onClick={() => handleLinkClick(link.view)}
              className={`text-2xl font-sync font-bold tracking-tighter uppercase transition-all ${currentView === link.view ? 'text-white glow-text' : 'text-white/30'}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
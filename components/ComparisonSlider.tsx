
import React, { useRef } from 'react';

const ComparisonSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const afterImageRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || !handleRef.current || !afterImageRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    
    // Calculate percentage
    let pos = ((clientX - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(100, pos));
    
    // Direct DOM update for performance (avoids React render cycle)
    handleRef.current.style.left = `${pos}%`;
    afterImageRef.current.style.width = `${pos}%`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/5] md:aspect-video w-full overflow-hidden rounded-[2.5rem] border border-white/10 cursor-col-resize select-none shadow-2xl"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* "After" Image (Graded) - The Background Base */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1492691523567-6170f0295da4?auto=format&fit=crop&q=80&w=2070" 
          alt="Graded" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 right-10 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] font-black text-white/60">Graded</div>
      </div>

      {/* "Before" Image (Raw) - clipped container */}
      <div 
        ref={afterImageRef}
        className="absolute inset-0 overflow-hidden border-r border-white/20"
        style={{ width: `50%` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1492691523567-6170f0295da4?auto=format&fit=crop&q=80&w=2070&sat=-100&cont=-20" 
          alt="Raw" 
          className="absolute inset-0 w-full h-full object-cover max-w-none filter brightness-90"
          // Ensure image doesn't scale/squash, stays anchored relative to container
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="absolute bottom-10 left-10 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] font-black text-white/40">Raw Log</div>
      </div>

      {/* Slider Handle */}
      <div 
        ref={handleRef}
        className="absolute top-0 bottom-0 w-[1px] bg-white/60 z-20 pointer-events-none"
        style={{ left: `50%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/40 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-2xl border border-white/20">
          <div className="flex gap-1.5 items-center">
            <div className="w-[1.5px] h-4 bg-white/40"></div>
            <div className="w-[1.5px] h-6 bg-white"></div>
            <div className="w-[1.5px] h-4 bg-white/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;

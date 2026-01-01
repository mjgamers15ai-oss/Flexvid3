import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal generic items
      gsap.fromTo(containerRef.current?.querySelectorAll('.reveal-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );

      // Main Quote Reveal
      if (quoteRef.current) {
        const text = quoteRef.current.innerText;
        quoteRef.current.innerHTML = text.split(" ").map(word => 
          `<span class="inline-block overflow-hidden"><span class="testimonial-word inline-block translate-y-full opacity-0 filter blur-md">${word}&nbsp;</span></span>`
        ).join("");

        gsap.to(".testimonial-word", {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.03,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
          }
        });
      }

      // Side Cards Stagger
      gsap.fromTo(".side-testimonial", 
        { x: 30, opacity: 0, filter: "blur(10px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.2,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".side-testimonial",
            start: "top 90%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-48 px-6 bg-black relative overflow-hidden">
      {/* Decorative lens flare-like glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
          <div className="md:col-span-2">
            <div className="reveal-item w-16 h-[1px] bg-white/20 mb-12"></div>
            <h2 ref={quoteRef} className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tightest mb-16 glow-text uppercase font-sync">
              "FLEXVID didn't just edit our content; they reinvented our entire digital identity."
            </h2>
            <div className="reveal-item flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rotate-45"></div>
              </div>
              <div>
                <p className="font-bold text-[10px] uppercase tracking-[0.4em] glow-text-soft">James Sterling</p>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-medium mt-1">CEO, AETHER WEAR</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-end space-y-10">
            <div className="side-testimonial p-10 bg-white/[0.02] border-l border-white/10 rounded-tr-[2rem] rounded-br-[2rem]">
              <p className="text-white/50 mb-8 italic text-sm leading-relaxed font-light">"Precision is an understatement. Their eye for detail is unmatched in the industry today."</p>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">— Creative Director, LUNA</p>
            </div>
            <div className="side-testimonial p-10 bg-white/[0.02] border-l border-white/10 rounded-tr-[2rem] rounded-br-[2rem]">
              <p className="text-white/50 mb-8 italic text-sm leading-relaxed font-light">"The speed and consistency they provide is a cheat code for any scaling brand."</p>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">— Head of Content, PULSE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
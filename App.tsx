import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Transformation from './components/Transformation';
import Work from './components/Work';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

// Pages
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';

// Types
import { ViewType } from './types';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const mainRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Prevent Loader loop by memoizing the callback
  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Initialize Scroll & Motion System
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const updateVelocityEffects = () => {
      if (!contentRef.current || isTransitioning) return;
      
      const velocity = (lenis as any).velocity;
      const absVelocity = Math.abs(velocity);
      
      const normalizedVelocity = Math.min(absVelocity / 4000, 1);
      const blurVal = normalizedVelocity * 3; 
      const scaleVal = 1 - (normalizedVelocity * 0.01); 
      const skewVal = velocity / 300; 

      gsap.set(contentRef.current, {
        filter: `blur(${blurVal}px)`,
        scale: scaleVal,
        skewY: `${Math.min(Math.max(skewVal, -1.5), 1.5)}deg`, 
        force3D: true 
      });
    };

    gsap.ticker.add(updateVelocityEffects);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateVelocityEffects);
    };
  }, [loading, isTransitioning]);

  // Global Animation Orchestrator
  useLayoutEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger to ensure positions are correct after loading/route change
      ScrollTrigger.refresh();

      // Batch reveal for all items with class 'reveal-item'
      // This handles entrance animations globally
      ScrollTrigger.batch(".reveal-item", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(batch, 
            { opacity: 0, y: 40, filter: 'blur(10px)' },
            { 
              opacity: 1, 
              y: 0, 
              filter: 'blur(0px)',
              stagger: 0.1, 
              duration: 1.2, 
              ease: "power3.out",
              overwrite: true 
            }
          );
        },
        once: true
      });

    }, mainRef);

    return () => ctx.revert();
  }, [loading, currentView]);

  // Handle Page Transitions
  const handleNavigate = (view: ViewType) => {
    if (view === currentView || isTransitioning) return;
    setIsTransitioning(true);

    if (contentRef.current) {
        gsap.set(contentRef.current, { clearProps: "all" });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        // Scroll to top instantly before revealing
        window.scrollTo(0, 0);
        lenisRef.current?.scrollTo(0, { immediate: true });
        // Force a refresh after layout changes
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    });

    tl.to(mainRef.current, {
      opacity: 0,
      y: -50,
      filter: 'blur(20px)',
      duration: 0.6,
      ease: "power3.in"
    })
    .fromTo(transitionOverlayRef.current,
      { yPercent: 100 },
      { 
        yPercent: 0, 
        duration: 0.8, 
        ease: "power4.inOut",
        display: 'block'
      },
      "-=0.4"
    )
    .add(() => {
      setCurrentView(view);
    })
    .to(transitionOverlayRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut"
    })
    .fromTo(mainRef.current, 
      { 
        opacity: 0, 
        y: 50, 
        filter: 'blur(20px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        duration: 1, 
        ease: "power3.out",
        clearProps: "all"
      },
      "-=0.5"
    )
    .set(transitionOverlayRef.current, { display: 'none', yPercent: 100 });
  };

  const renderViewContent = () => {
    switch(currentView) {
      case 'services': return <ServicesPage />;
      case 'work': return <WorkPage />;
      case 'about': return <AboutPage />;
      default: return (
        <>
          <Hero />
          <Problem />
          <Transformation />
          <Services />
          <Work />
          <Testimonials />
          <FinalCTA />
        </>
      );
    }
  };

  return (
    <div className="relative bg-black text-white selection:bg-white/20">
      {loading && <Loader onComplete={handleLoaderComplete} />}
      <CustomCursor />
      
      {/* Page Transition Overlay */}
      <div 
        ref={transitionOverlayRef}
        className="fixed inset-0 z-[100] bg-black hidden pointer-events-none transform-gpu"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_0_30px_rgba(255,255,255,0.3)]"></div>
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl"></div>
        <div className="absolute inset-0 flex items-center justify-center">
             <span className="font-sync font-bold text-xl tracking-[0.5em] animate-pulse">LOADING</span>
        </div>
      </div>

      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      
      <main 
        ref={mainRef}
        className={`relative z-10 w-full transform-gpu min-h-screen ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ willChange: 'transform, opacity, filter' }}
      >
        <div ref={contentRef} className="w-full">
          {!loading && renderViewContent()}
        </div>
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrambleText from './ScrambleText';
import { GlassEffect } from '../ui/liquid-glass';
import { LiquidEffectAnimation } from '../ui/liquid-effect-animation';

const links = ['About', 'Skills', 'Projects', 'Contact'];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [liquidState, setLiquidState] = useState({ active: false, x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = (e) => {
    // Get mouse click center coordinates for the ripple origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Dispatch global event to smoothly seamlessly transition the page
    window.dispatchEvent(new CustomEvent('liquid-transition', { detail: { x, y, to: '/editor' } }));
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-700 bg-transparent ${
          scrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="w-full px-8 md:px-16 flex items-center justify-between">
          
          {/* Logo & Role */}
          <div className="flex items-center gap-6 relative">
            
            {/* 'Click Here' Pointer Animation (Moved Below) */}
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: -5 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
              className="absolute -bottom-10 left-6 text-electric font-mono text-[10px] tracking-mega-wide uppercase flex flex-col items-center pointer-events-none drop-shadow-[0_0_8px_rgba(0,136,255,0.8)]"
            >
              <span className="text-sm mb-1">↑</span>
              <span>Click Here</span>
            </motion.div>

            <button onClick={handleLogoClick} data-hover className="group flex items-center relative z-10">
              <span className="font-display font-bold text-xl md:text-2xl tracking-super-wide text-white transition-transform group-hover:scale-105">
                PRASANTH<span className="text-electric">.</span>
              </span>
            </button>
            <span className="hidden md:block font-mono text-[10px] text-electric tracking-mega-wide uppercase">
              Full Stack Developer
            </span>
          </div>

          {/* Right Side: Hire Me Button */}
          <div className="flex items-center gap-6">

            <button 
              onClick={() => window.open('https://www.linkedin.com/in/prasanthzodiac/', '_blank')} 
              className="px-6 py-2.5 rounded-full bg-electric text-black font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              data-hover
            >
              Hire Me <ArrowRight size={16} className="-rotate-45" strokeWidth={2.5} />
            </button>
          </div>
          
        </div>
      </motion.nav>

      {/* Vertical Menu List (Left side of the screen) - Text is now horizontal */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="hidden md:flex fixed top-1/2 -translate-y-1/2 left-8 lg:left-12 flex-col gap-6 z-50"
      >
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            data-hover
            className="font-mono text-xs tracking-mega-wide uppercase text-ghost hover:text-electric transition-colors flex items-center"
          >
            <ScrambleText text={link} />
          </button>
        ))}
      </motion.div>
    </>
  );
}
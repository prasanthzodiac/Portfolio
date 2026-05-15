import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrambleText from '../components/portfolio/ScrambleText';
import { scrollToTarget } from '@/lib/smooth-scroll';

export default function EditorNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    window.dispatchEvent(new CustomEvent('liquid-transition', { detail: { x, y, to: '/' } }));
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
        
        <div className="flex items-center gap-6 relative">
          
          {/* 'Click Here' Pointer Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: -5 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            className="absolute -bottom-10 left-6 text-[#E5A823] font-mono text-[10px] tracking-mega-wide uppercase flex flex-col items-center pointer-events-none drop-shadow-[0_0_8px_rgba(229,168,35,0.8)]"
          >
            <span className="text-sm mb-1">↑</span>
            <span>Click Here</span>
          </motion.div>

          {/* Interactive Zodiac Logo replacing Developer Side text */}
          <button
            onClick={handleLogoClick}
            className="group flex items-center relative z-10 outline-none"
          >
            <span className="font-display font-bold text-xl md:text-2xl tracking-super-wide text-white transition-transform group-hover:scale-105 uppercase">
              ZODIAC<span className="text-[#E5A823]">.</span>
            </span>
          </button>
          <span className="hidden md:block font-mono text-[10px] text-[#E5A823] tracking-mega-wide uppercase">
            Video Editor
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.open('https://www.linkedin.com/in/prasanthzodiac/', '_blank')}
            className="px-6 py-2.5 rounded-full bg-[#E5A823] text-black font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
            data-hover
          >
            Hire Me <ArrowRight size={16} className="-rotate-45" strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </motion.nav>

    {/* Vertical Menu List */}
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="hidden md:flex fixed top-1/2 -translate-y-1/2 left-8 lg:left-12 flex-col gap-6 z-50"
    >
      {['Spotlight', 'The Craft', 'Services', 'Process', 'Portfolio', 'About', 'Contact'].map((link) => (
        <button
          key={link}
          onClick={() => {
            const id = link.toLowerCase().replace(' ', '-');
            scrollToTarget(id, { offset: -100, duration: 1.1 });
          }}
          data-hover
          className="font-mono text-xs tracking-mega-wide uppercase text-slate-500 hover:text-[#E5A823] transition-colors flex items-center"
        >
          <ScrambleText text={link} />
        </button>
      ))}
    </motion.div>
    </>
  );
}

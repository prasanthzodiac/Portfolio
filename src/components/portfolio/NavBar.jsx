import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = ['Hero', 'About', 'Skills', 'Projects', 'Contact'];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5 bg-transparent'
      }`}
      style={scrolled ? {
        background: 'rgba(8,6,14,0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,179,71,0.08)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="font-display font-bold text-xl tracking-tight">
          <span className="text-white">P</span>
          <span className="text-white">rasanth</span>
          <span className="text-gradient-brand-zodiac"> Zodiac</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              data-hover
              className={`font-mono-code text-xs tracking-widest uppercase transition-all duration-300 relative ${
                active === link ? 'text-electric' : 'text-ghost hover:text-white'
              }`}
            >
              {link}
              {active === link && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: '#FFB347' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Status pill */}
        <div className="px-4 py-2 rounded-full"
          style={{ background: 'rgba(255,179,71,0.06)', border: '1px solid rgba(255,179,71,0.2)' }}>
          <span className="font-mono-code text-xs text-electric">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >●</motion.span>
            {' '}OPEN TO WORK
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import ScrambleText from './ScrambleText';
import { GlassFilter, GlassEffect } from '../ui/liquid-glass';
import { soundManager } from '../../lib/sound';

const resumeHref = `${import.meta.env.BASE_URL || '/'}Prasanth S - Resume.pdf`.replace(/([^:]\/)\/{2,}/g, '$1/');

const AudioWave = ({ active, color }) => (
  <div className="flex items-center gap-[2px] h-3 w-4">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        animate={active ? { height: ['20%', '100%', '30%', '80%', '20%'] } : { height: '20%' }}
        transition={active ? { repeat: Infinity, duration: 0.8 + (i * 0.1), delay: i * 0.1 } : {}}
        className={`w-[2px] rounded-full ${color}`}
      />
    ))}
  </div>
);

export default function HeroSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [soundOn, setSoundOn] = useState(!soundManager.isMuted);

  useEffect(() => {
    soundManager.setTheme('dev');
    const unsubscribe = soundManager.subscribe((isMuted) => setSoundOn(!isMuted));
    return unsubscribe;
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const canvasY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Spline replaces the custom Three.js scene

  return (
    <section ref={sectionRef} id="hero" className="relative w-full min-h-screen flex flex-col justify-end bg-transparent pb-20">
      <GlassFilter />
      {/* Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="vertical-line left-[10%]" />
        <div className="vertical-line left-[50%]" />
        <div className="vertical-line right-[10%]" />
      </div>

      {/* 3D Canvas - Fades out seamlessly at the bottom so it doesn't create a sharp cut-off when scrolling to the next section */}
      <motion.div style={{ y: canvasY }} className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
        <div className="w-full h-full" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}>
          <Spline scene="https://prod.spline.design/NgVnt4OEKaT7X5rH/scene.splinecode" className="w-full h-full" />
        </div>
      </motion.div>

      {/* Content - pushed to the bottom half */}
      <motion.div style={{ y: contentY, opacity }} className="relative z-20 w-full px-8 flex flex-col items-center text-center mt-[45vh]">
        <h1 className="font-display font-bold text-white uppercase leading-[1.1] tracking-widest max-w-5xl"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
          <motion.span className="block drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}>
            CRAFTING EXPERIENCES
          </motion.span>
          <motion.span className="block text-gradient-hero drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}>
            THROUGH CODE
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 font-body font-light text-ghost/90 text-sm md:text-base max-w-2xl mx-auto tracking-wide leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
        >
          I engineer full-stack digital experiences that fuse elegant interfaces with powerful backend systems — designed to capture attention and make users stop scrolling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <GlassEffect
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-3xl px-8 py-4 text-white font-display font-bold text-xs tracking-mega-wide uppercase hover:px-10 hover:rounded-4xl"
          >
            <div data-hover className="transition-all duration-700 hover:scale-95 text-shadow-glow">
              <ScrambleText text="Explore Projects" />
            </div>
          </GlassEffect>

          <GlassEffect
            href={resumeHref}
            download="Prasanth-S-Resume.pdf"
            className="rounded-3xl px-8 py-4 text-electric font-display font-bold text-xs tracking-mega-wide uppercase hover:px-10 hover:rounded-4xl"
          >
            <div data-hover className="transition-all duration-700 hover:scale-95 text-shadow-glow">
              <ScrambleText text="Download Resume" />
            </div>
          </GlassEffect>
        </motion.div>
      </motion.div>

      {/* Bottom controls */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-24 left-8 right-8 flex justify-between items-center z-20 pointer-events-none"
      >
        <button 
          onClick={() => soundManager.toggleMute('dev')}
          className={`font-mono text-[10px] tracking-mega-wide uppercase flex items-center gap-2 pointer-events-auto transition-colors duration-300 hover:text-white ${soundOn ? 'text-electric' : 'text-ghost'}`}
        >
          <AudioWave active={soundOn} color={soundOn ? 'bg-electric' : 'bg-ghost/50'} />
          Sound {soundOn ? 'On' : 'Off'}
        </button>
        <div className="relative flex flex-col items-end">
          {/* Black layer above 'Scroll to Explore' to physically cover the Spline watermark */}
          <div className="w-40 h-12 bg-void absolute bottom-full mb-2 right-[-20px] z-30 rounded-sm"></div>

          <div className="relative z-10 font-mono text-[10px] tracking-mega-wide text-electric uppercase flex items-center gap-2">
            Scroll To Explore <span className="w-4 h-px bg-electric/50" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
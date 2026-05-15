import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';
import { soundManager } from '../lib/sound';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SPLINE_URL = 'https://prod.spline.design/wedFhbA0KXtJnrYR/scene.splinecode';

function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className="w-12 h-12 mx-auto mb-4 rounded-xl"
          style={{
            border: '2px solid rgba(229, 168, 35,0.3)',
            borderTopColor: '#E5A823',
          }}
        />
        <span className="editor-mono text-[11px] tracking-[0.3em] uppercase text-slate-500">
          Loading 3D Scene
        </span>
      </div>
    </div>
  );
}

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

export default function EditorHero() {
  const [soundOn, setSoundOn] = useState(!soundManager.isMuted);

  useEffect(() => {
    soundManager.setTheme('editor');
    const unsubscribe = soundManager.subscribe((isMuted) => setSoundOn(!isMuted));
    return unsubscribe;
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden editor-letterbox">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0 editor-spline-container">
        <Suspense fallback={<SplineLoader />}>
          <Spline
            scene={SPLINE_URL}
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(10,10,15,0.4) 0%, rgba(10,10,15,0.1) 30%, rgba(10,10,15,0.1) 60%, rgba(10,10,15,0.7) 100%),
              radial-gradient(ellipse at center, transparent 40%, rgba(10,10,15,0.6) 100%)
            `,
          }}
        />
      </div>

      {/* Shimmer */}
      <div className="absolute inset-0 editor-shimmer pointer-events-none opacity-30 z-10" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 text-center max-w-4xl px-6 mt-[50vh] pb-16"
      >
        {/* Badge was moved out of here */}
        {/* Title */}
        <h1 className="editor-font-display font-extrabold text-white leading-[0.88] tracking-tighter uppercase"
          style={{ fontSize: 'clamp(2rem, 7.5vw, 5rem)' }}>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block editor-text-gradient"
          >
            EDITS THAT STOP
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block mt-1 text-white"
          >
            THE SCROLL
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal tracking-tight normal-case"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          Cinematic edits, social-first pacing, and clean brand spots — timelines tuned for impact, not noise.
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {['Reels', 'Promos', 'Subtitles', 'Sound design', 'Color'].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.06, duration: 0.4 }}
              className="px-4 py-2 rounded-full text-slate-300 transition-all duration-300 hover:border-[rgba(229, 168, 35,0.3)] hover:text-white"
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: '1px solid rgba(229, 168, 35,0.25)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full"
              style={{ background: '#E5A823' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom controls */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-24 left-8 right-8 flex justify-between items-center z-20 pointer-events-none"
      >
        <button 
          onClick={() => soundManager.toggleMute('editor')}
          className={`font-mono text-[10px] tracking-mega-wide uppercase flex items-center gap-2 pointer-events-auto transition-colors duration-300 hover:text-white ${soundOn ? 'text-[#E5A823]' : 'text-slate-500'}`}
        >
          <AudioWave active={soundOn} color={soundOn ? 'bg-[#E5A823]' : 'bg-slate-500/50'} />
          Sound {soundOn ? 'On' : 'Off'}
        </button>
        <div className="relative flex flex-col items-end">
          <div className="relative z-10 font-mono text-[10px] tracking-mega-wide text-[#E5A823] uppercase flex items-center gap-2">
            Scroll To Explore <span className="w-4 h-px bg-[#E5A823]/50" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

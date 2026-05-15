import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { WORK_EXPERIENCE, KRIV_LOGO_PATH } from './constants';

const logoSrc = `${import.meta.env.BASE_URL || '/'}${KRIV_LOGO_PATH}`.replace(/([^:]\/)\/{2,}/g, '$1/');

export default function EditorWork() {
  const w = WORK_EXPERIENCE;
  return (
    <section id="portfolio" className="relative z-10 max-w-6xl mx-auto px-6 py-12 pb-28">
      <p className="editor-mono text-[11px] tracking-[0.35em] uppercase mb-3" style={{ color: '#E5A823' }}>Experience</p>
      <h2 className="editor-font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-12">
        Work <span className="editor-text-gradient">history</span>
      </h2>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="editor-card-launch p-8 md:p-10 flex flex-col md:flex-row gap-8 relative z-10"
      >
        <div className="flex-shrink-0">
          <div
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-lg"
            style={{
              background: 'rgba(17,17,24,0.6)',
              border: '1px solid rgba(229, 168, 35,0.2)',
              boxShadow: '0 0 30px rgba(229, 168, 35,0.08)',
            }}
          >
            <img src={logoSrc} alt="" className="w-full h-full object-cover" width={112} height={112} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Briefcase size={18} style={{ color: '#E5A823' }} className="shrink-0" />
            <h3 className="editor-font-display text-xl md:text-2xl font-bold text-white">{w.title}</h3>
          </div>
          <p className="text-lg font-semibold mb-1" style={{ color: '#E5A823' }}>{w.company}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400 editor-mono uppercase tracking-wider text-[11px] mb-6">
            <span>{w.type}</span>
            <span className="text-slate-600">·</span>
            <span>{w.range}</span>
            <span className="text-slate-600">·</span>
            <span>{w.duration}</span>
          </div>
          <p className="flex items-start gap-2 text-slate-400 text-sm mb-6 normal-case"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            <MapPin size={16} className="mt-0.5 shrink-0 text-slate-500" />
            {w.location}
          </p>
          <p className="flex items-start gap-2 text-slate-300 text-sm md:text-base leading-relaxed normal-case border-t border-white/10 pt-6"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            <Clock size={16} className="mt-1 shrink-0" style={{ color: '#E5A823' }} />
            {w.description}
          </p>
        </div>
      </motion.article>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EditorFooter() {
  return (
    <footer className="relative z-10 mt-8 py-16 px-6"
      style={{ borderTop: '1px solid rgba(229, 168, 35,0.08)' }}>
      <div className="max-w-6xl mx-auto">
        {/* End credits feel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="editor-font-display text-2xl font-extrabold tracking-tight mb-2">
            <span className="text-white">Zodiac</span>
            <span className="text-slate-500 mx-2">·</span>
            <span style={{ color: '#E5A823' }}>Cuts</span>
          </div>
          <p className="text-slate-500 text-sm normal-case" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Video editor lane — separate from the full-stack portfolio.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 editor-mono text-[11px] tracking-[0.15em] uppercase text-slate-600">
          <span className="normal-case tracking-normal text-slate-500 text-center md:text-left text-xs"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            © 2025 Prasanth Zodiac · All rights reserved
          </span>
          <Link to="/" className="hover:text-[#E5A823] transition-colors duration-300"
            style={{ color: '#E5A823' }}>
            ← Back to developer portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
}

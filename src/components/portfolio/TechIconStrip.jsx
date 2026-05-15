import React from 'react';
import { motion } from 'framer-motion';

const assetUrl = (rel) => {
  const base = import.meta.env.BASE_URL || '/';
  const root = base.endsWith('/') ? base : `${base}/`;
  return `${root}${rel}`.replace(/([^:]\/)\/+/g, '$1');
};

// SVG icons inline — no external deps
const ICONS = {
  React: { color: '#61DAFB', svg: <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="3.5" fill="#61DAFB"/><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)"/></svg> },
  'Three.js': { color: '#ffffff', svg: <svg viewBox="0 0 40 40" fill="none"><polygon points="20,4 36,32 4,32" stroke="white" strokeWidth="1.5" fill="none"/><polygon points="20,14 28,28 12,28" stroke="white" strokeWidth="1" fill="rgba(255,255,255,0.08)"/></svg> },
  JavaScript: { color: '#F7DF1E', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="4" width="32" height="32" rx="3" fill="#F7DF1E" fillOpacity="0.15" stroke="#F7DF1E" strokeWidth="1.5"/><text x="9" y="28" fill="#F7DF1E" fontSize="14" fontFamily="monospace" fontWeight="bold">JS</text></svg> },
  Python: { color: '#4B8BBE', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M20 6c-4 0-7 1.5-7 4v4h7v1.5H10c-3 0-5 2-5 5v5c0 3 2 4.5 5 4.5h2V27c0-1 1-1.5 2-1.5h8c2 0 3-1 3-3v-7c0-2-1.5-3.5-5-3.5zm-2 2.5a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fill="#4B8BBE" fillOpacity="0.8"/><path d="M20 34c4 0 7-1.5 7-4v-4h-7v-1.5h10c3 0 5-2 5-5v-5c0-3-2-4.5-5-4.5h-2v3.5c0 1-1 1.5-2 1.5h-8c-2 0-3 1-3 3v7c0 2 1.5 3.5 5 3.5zm2-2.5a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" fill="#FFD43B" fillOpacity="0.8"/></svg> },
  Java: { color: '#F89820', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M17 28s-2 1.2 1.5 1.6c4.2.5 6.3.4 10.9-.5 0 0 1.2.8 2.9 1.4-10.3 4.4-23.3-.3-15.3-2.5z" fill="#F89820"/><path d="M15.5 24.2s-2.3 1.7 1.2 2.1c4.5.5 8 .6 14.1-.8 0 0 .8.9 2.2 1.3-12.5 3.7-26.5.3-17.5-2.6z" fill="#F89820"/><path d="M23 15.6c2.5 2.9.6 5.5.6 5.5s6.4-3.3 3.5-7.4c-2.7-3.8-4.8-5.7 6.5-12.2 0 0-17.8 4.4-10.6 14.1z" fill="#F89820"/><path d="M32.5 31.5s1.7 1.4-1.9 2.5c-6.8 2-28.4 2.6-34.4.1-2.1-.9 1.9-2.3 3.2-2.5 1.3-.3 2.1-.2 2.1-.2-2.4-1.7-15.6 3.3-6.7 4.8 24.3 3.9 44.3-1.8 37.7-4.7z" fill="#F89820"/></svg> },
  'Node.js': { color: '#68A063', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M20 4L4 13v14l16 9 16-9V13L20 4zm0 3l12 7v12l-12 7-12-7V14l12-7z" fill="#68A063" fillOpacity="0.7"/><path d="M20 14v12" stroke="#68A063" strokeWidth="2"/><circle cx="20" cy="20" r="3" fill="#68A063"/></svg> },
  MySQL: { color: '#00758F', svg: <svg viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="11" rx="13" ry="5" stroke="#00758F" strokeWidth="1.5" fill="#00758F" fillOpacity="0.15"/><path d="M7 11v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8" stroke="#00758F" strokeWidth="1.5" fill="none"/><path d="M7 19v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8" stroke="#00758F" strokeWidth="1.5" fill="none"/></svg> },
  Git: { color: '#F05032', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M37 18.6L21.4 3a2 2 0 00-2.8 0L15 6.6l4.8 4.8a2.4 2.4 0 013 3l4.6 4.6a2.4 2.4 0 11-1.4 1.4l-4.3-4.3v11.3a2.4 2.4 0 11-2 0V15.7a2.4 2.4 0 01-1.3-3.1L13.8 8 3 18.8a2 2 0 000 2.8l15.6 15.6a2 2 0 002.8 0L37 21.4a2 2 0 000-2.8z" fill="#F05032" fillOpacity="0.8"/></svg> },
  'HTML/CSS': { color: '#E34F26', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M6 4l3 27 11 3 11-3 3-27H6zm22 6H12l.5 5h15l-1 10-6.5 1.8-6.5-1.8-.4-5h4l.2 2.5 2.7.7 2.7-.7.3-3H11.5L10 9h20l-2 7z" fill="#E34F26" fillOpacity="0.9"/></svg> },
  'Spring Boot': { color: '#6DB33F', svg: <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#6DB33F" strokeWidth="1.5" fill="none"/><path d="M14 20c2-6 12-8 14-2" stroke="#6DB33F" strokeWidth="2" strokeLinecap="round"/><circle cx="28" cy="18" r="2" fill="#6DB33F"/><path d="M13 26c1-2 4-2 6-1" stroke="#6DB33F" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  TypeScript: { color: '#3178C6', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="4" width="32" height="32" rx="3" fill="#3178C6" fillOpacity="0.2" stroke="#3178C6" strokeWidth="1.5"/><text x="7" y="28" fill="#3178C6" fontSize="13" fontFamily="monospace" fontWeight="bold">TS</text></svg> },
  Tailwind: { color: '#38BDF8', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M20 10c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.285 1.955 1.113 2.856 2.028C22.084 17.337 23.637 19 27 19c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.285-1.955-1.113-2.856-2.028C24.916 11.663 23.363 10 20 10zm-7.5 9c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.285 1.955 1.113 2.856 2.028C15.084 26.337 16.637 28 20 28c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.285-1.955-1.113-2.856-2.028C17.416 20.663 15.863 19 12.5 19z" fill="#38BDF8" fillOpacity="0.85"/></svg> },
  C: { color: '#659AD2', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="5" y="5" width="30" height="30" rx="4" fill="#659AD218" stroke="#659AD2" strokeWidth="1.5"/><text x="20" y="26" textAnchor="middle" fill="#659AD2" fontSize="17" fontFamily="ui-monospace, monospace" fontWeight="bold">C</text></svg> },
  'C++': { color: '#00599C', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="5" width="32" height="30" rx="4" fill="#00599C18" stroke="#00599C" strokeWidth="1.5"/><text x="20" y="25" textAnchor="middle" fill="#00599C" fontSize="12" fontFamily="ui-monospace, monospace" fontWeight="bold">C++</text></svg> },
  'C#': { color: '#68217A', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="5" y="5" width="30" height="30" rx="4" fill="#68217A22" stroke="#68217A" strokeWidth="1.5"/><text x="20" y="26" textAnchor="middle" fill="#9B4DCA" fontSize="15" fontFamily="ui-monospace, monospace" fontWeight="bold">C#</text></svg> },
  WordPress: { color: '#21759b', svg: <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#21759b" strokeWidth="1.5" fill="#21759b15"/><path d="M12 20c0 4.5 3.5 8.2 8 8.8v-6.2l-3.2-8.8c-2.9 1-5 3.8-5 7.2zm16 0c0-1.4-.5-2.6-1.2-3.6l-3.5 9.6c3-.7 5.2-3.4 5.2-6.6zm-8-7.3v14.6c4.5-.6 8-4.3 8-8.8 0-3.4-2.1-6.2-5-7.2L20 12.7z" fill="#21759b"/></svg> },
  WooCommerce: { color: '#96588a', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="8" y="12" width="24" height="18" rx="2" stroke="#96588a" strokeWidth="1.5" fill="#96588a12"/><path d="M12 18h16M14 22h6" stroke="#96588a" strokeWidth="1.5" strokeLinecap="round"/><circle cx="26" cy="26" r="3" fill="#96588a"/></svg> },
  'Express.js': { color: '#eeeeee', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="5" y="8" width="30" height="24" rx="3" fill="#1a1a1a" stroke="#bbb" strokeWidth="1"/><text x="20" y="25" textAnchor="middle" fill="#eee" fontSize="9" fontFamily="ui-monospace, monospace" fontWeight="bold">ex</text><path d="M8 28h24" stroke="#F7DF1E" strokeWidth="2" strokeLinecap="round"/></svg> },
  Sequelize: { color: '#52B0C1', svg: <svg viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="12" rx="12" ry="4" stroke="#52B0C1" strokeWidth="1.5" fill="#52B0C115"/><path d="M8 12v6c0 2.2 5.4 4 12 4s12-1.8 12-4v-6" stroke="#52B0C1" strokeWidth="1.5"/><path d="M8 22v6c0 2.2 5.4 4 12 4s12-1.8 12-4v-6" stroke="#52B0C1" strokeWidth="1.5"/></svg> },
  JWT: { color: '#FBBF24', svg: <svg viewBox="0 0 40 40" fill="none"><circle cx="18" cy="22" r="6" stroke="#FBBF24" strokeWidth="2" fill="none"/><path d="M22 18l8-6v16l-8-6" fill="#FBBF24" fillOpacity="0.35" stroke="#FBBF24" strokeWidth="1.2"/></svg> },
  Firebase: { color: '#FFCA28', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M12 32l6-18 4 10 2-6 6 14H12z" fill="#FFCA28" fillOpacity="0.25" stroke="#FFCA28" strokeWidth="1.2"/><path d="M18 14l-3 8 8-2-5-6z" fill="#FFA000"/></svg> },
  'REST APIs': { color: '#00FFD1', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="13" width="14" height="6" rx="3" stroke="#00FFD1" strokeWidth="1.5" fill="none"/><rect x="22" y="13" width="14" height="6" rx="3" stroke="#00FFD1" strokeWidth="1.5" fill="none"/><path d="M18 16h4" stroke="#00FFD1" strokeWidth="1.5"/><path d="M18 22l4-6" stroke="#00FFD1" strokeWidth="1" strokeDasharray="2 2"/><rect x="4" y="24" width="14" height="6" rx="3" stroke="#FF2D78" strokeWidth="1.5" fill="none"/><path d="M20 27h2" stroke="#FF2D78" strokeWidth="1.5"/></svg> },
  'SQL / MySQL': { color: '#00758F', svg: <svg viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="11" rx="13" ry="5" stroke="#00758F" strokeWidth="1.5" fill="#00758F" fillOpacity="0.15"/><path d="M7 11v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8" stroke="#00758F" strokeWidth="1.5" fill="none"/><path d="M7 19v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8" stroke="#00758F" strokeWidth="1.5" fill="none"/></svg> },
  Figma: { color: '#F24E1E', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M14 10h6a6 6 0 016 6v0a6 6 0 01-6 6h-6V10z" fill="#F24E1E" fillOpacity="0.9"/><path d="M20 10h6a6 6 0 016 6v0a6 6 0 01-6 6h-6" fill="#FF7262" fillOpacity="0.95"/><path d="M20 22h6a6 6 0 016 6v0a6 6 0 01-6 6h-6V22z" fill="#A259FF" fillOpacity="0.95"/><path d="M14 22h6v12a6 6 0 01-6-6v-6z" fill="#1ABCFE" fillOpacity="0.95"/><path d="M14 10h6v12h-6a6 6 0 01-6-6v0a6 6 0 016-6z" fill="#0ACF83" fillOpacity="0.95"/></svg> },
  Ollama: { color: '#14B8A6', svg: <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="22" r="12" stroke="#14B8A6" strokeWidth="1.5" fill="#14B8A618"/><ellipse cx="20" cy="14" rx="7" ry="5" fill="#14B8A6" fillOpacity="0.85"/><circle cx="17" cy="13" r="1.2" fill="#0f172a"/><circle cx="23" cy="13" r="1.2" fill="#0f172a"/><path d="M16 18c1.5 2 6.5 2 8 0" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" fill="none"/></svg> },
  LLaMA: { color: '#2563EB', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="6" y="8" width="28" height="24" rx="4" fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="1.5"/><text x="20" y="26" textAnchor="middle" fill="#93C5FD" fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="bold">LLaMA</text></svg> },
  Vercel: { color: '#E8E8E8', svg: <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="4" width="32" height="32" rx="2" fill="#0a0a0a" stroke="#333" strokeWidth="1"/><polygon points="20,10 32,30 8,30" fill="#E8E8E8"/></svg> },
  Render: { color: '#46E3B6', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M12 30V12c0-2 2-4 5-4h8c4 0 7 3 7 7s-3 7-7 7h-6v8H12z" stroke="#46E3B6" strokeWidth="1.8" fill="#46E3B612" strokeLinejoin="round"/></svg> },
  Railway: { color: '#B072F0', svg: <svg viewBox="0 0 40 40" fill="none"><path d="M10 28h20M10 22h20M10 16h12" stroke="#B072F0" strokeWidth="2.5" strokeLinecap="round"/><path d="M26 12l8 8-8 8" stroke="#B072F0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  Aiven: { color: '#FF7700', imgSrc: assetUrl('logos/aiven.svg') },
};

const ROW1 = ['C', 'C++', 'C#', 'React', 'Three.js', 'JavaScript', 'Python', 'Java', 'Node.js', 'Express.js', 'MySQL'];
const ROW2 = ['WordPress', 'WooCommerce', 'Firebase', 'JWT', 'Sequelize', 'Git', 'HTML/CSS', 'Spring Boot', 'REST APIs', 'TypeScript', 'Tailwind', 'SQL / MySQL'];
const ROW3 = ['Figma', 'Ollama', 'LLaMA', 'Vercel', 'Render', 'Railway', 'Aiven'];

function TechPill({ name, delay = 0 }) {
  const info = ICONS[name] || { color: '#8892A4', svg: null };
  return (
    <div
      className="tech-icon-pill"
      style={{
        color: info.color,
        animationDelay: `${delay}s`,
        borderColor: info.color + '22',
      }}
    >
      {info.imgSrc ? (
        <img src={info.imgSrc} alt="" width={20} height={20} className="w-5 h-5 object-contain flex-shrink-0" loading="lazy" />
      ) : info.svg ? (
        <span className="w-5 h-5 flex-shrink-0" style={{ color: info.color }}>{info.svg}</span>
      ) : null}
      <span style={{ color: info.color }}>{name}</span>
    </div>
  );
}

export default function TechIconStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden py-4 space-y-2.5"
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #050510, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #050510, transparent)' }} />

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden">
        <div className="tech-scroll-track left">
          {[...ROW1, ...ROW1].map((name, i) => (
            <TechPill key={`r1-${i}`} name={name} delay={i * 0.15} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="tech-scroll-track right">
          {[...ROW2, ...ROW2].map((name, i) => (
            <TechPill key={`r2-${i}`} name={name} delay={i * 0.1} />
          ))}
        </div>
      </div>

      {/* Row 3 — design / LLM / deploy (slower left) */}
      <div className="overflow-hidden">
        <div className="tech-scroll-track left-slow">
          {[...ROW3, ...ROW3, ...ROW3].map((name, i) => (
            <TechPill key={`r3-${i}`} name={name} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
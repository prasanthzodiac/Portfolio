import React from 'react';
import { Play } from 'lucide-react';

function BannerGrain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
      aria-hidden
    />
  );
}

function PlayOverlay() {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
      <div className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.45)] group-hover:scale-110 transition-transform duration-300">
        <Play className="text-white fill-white ml-1" size={26} />
      </div>
    </div>
  );
}

function BrandMark({ children }) {
  return (
    <div className="absolute bottom-5 left-0 right-0 z-20 text-center px-3">
      <span
        className="inline-block text-[#FFE566] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {children}
      </span>
    </div>
  );
}

function Headline({ children, className = '' }) {
  return (
    <div className={`absolute inset-x-0 top-[18%] z-10 px-4 text-center pointer-events-none ${className}`}>
      <h3
        className="text-white font-black text-2xl sm:text-3xl md:text-[1.65rem] lg:text-4xl uppercase italic leading-[0.92] tracking-tighter drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        style={{
          fontFamily: "'Syne', 'Instrument Sans', sans-serif",
          textShadow: '0 0 40px rgba(255,255,255,0.15)',
        }}
      >
        {children}
      </h3>
    </div>
  );
}

function PersonSilhouette({ className = '' }) {
  return (
    <div
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[72%] h-[55%] z-[1] ${className}`}
      aria-hidden
    >
      <div className="absolute inset-x-[15%] bottom-0 h-[88%] rounded-t-[40%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[38%] w-[42%] aspect-square rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 shadow-inner" />
    </div>
  );
}

const THEMES = {
  'ai-students': () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#6B2FD6] via-[#4A1D9E] to-[#0A0614]" />
      <div className="absolute top-0 right-0 w-[70%] h-[50%] bg-[#FF4FD8]/30 blur-[60px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FF6B35]/40 to-transparent" />
      <svg className="absolute top-[12%] left-[8%] w-16 h-16 text-white/20" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 6" />
      </svg>
      <span className="absolute top-[10%] right-[10%] z-10 px-3 py-1 rounded-lg bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-wide rotate-3">
        NEW TOOL
      </span>
      <PersonSilhouette />
      <Headline>
        AI TOOL
        <br />
        <span className="text-[#FFB347]">FOR STUDENTS</span>
      </Headline>
    </>
  ),

  'edit-faster': () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D3D2E] via-[#0A2820] to-[#050A08]" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90%] h-[35%] bg-[#00FF9D]/15 blur-[50px] rounded-full" />
      <PersonSilhouette />
      {[
        { label: 'Pr', color: '#9999FF', top: '22%', left: '8%' },
        { label: 'Ae', color: '#9999FF', top: '18%', right: '10%' },
        { label: 'Dv', color: '#E87A5E', bottom: '42%', left: '6%' },
      ].map((app) => (
        <div
          key={app.label}
          className="absolute z-[5] w-11 h-11 rounded-xl flex items-center justify-center text-[11px] font-black text-white shadow-lg border border-white/20"
          style={{ backgroundColor: app.color, top: app.top, left: app.left, right: app.right, bottom: app.bottom }}
        >
          {app.label}
        </div>
      ))}
      <Headline className="top-[14%]">
        MAKE EDIT
        <br />
        <span className="text-[#00FF9D]">10X FASTER</span>
      </Headline>
    </>
  ),

  'mrbeast': () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A4A8C] via-[#063366] to-[#020810]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,180,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {['$', '€', '£'].map((sym, i) => (
        <span
          key={i}
          className="absolute text-[#4ADE80] font-black text-lg opacity-80 z-[2]"
          style={{ top: `${15 + i * 12}%`, left: `${10 + i * 25}%`, transform: `rotate(${-15 + i * 10}deg)` }}
        >
          {sym}
        </span>
      ))}
      <PersonSilhouette />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-white text-[#0A4A8C] font-black text-xs md:text-sm uppercase tracking-tight border-2 border-[#4ADE80] shadow-lg">
        MR BEAST&apos;S
      </div>
      <Headline className="top-[32%]">
        YOUTUBE
        <br />
        <span className="text-[#7DD3FC]">SECRET</span>
      </Headline>
    </>
  ),

  'podcast': () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0508] via-[#0D0204] to-[#050204]" />
      <span className="absolute top-[8%] left-1/2 -translate-x-1/2 text-[#8B0000]/80 text-[8rem] font-black leading-none select-none z-0">
        ?
      </span>
      <svg className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[85%] h-[40%] z-[2]" viewBox="0 0 200 120" aria-hidden>
        <ellipse cx="55" cy="70" rx="28" ry="35" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
        <ellipse cx="145" cy="70" rx="28" ry="35" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
        <rect x="48" y="20" width="8" height="50" rx="2" fill="#2a2a2a" />
        <rect x="144" y="20" width="8" height="50" rx="2" fill="#2a2a2a" />
        <path d="M55 55 Q30 40 20 25" stroke="#444" strokeWidth="3" fill="none" />
        <path d="M145 55 Q170 40 180 25" stroke="#444" strokeWidth="3" fill="none" />
      </svg>
      <Headline className="top-[62%] text-sm">
        <span className="text-[#E5A823]">NEGA AYNAN</span>
        <br />
        IMPULSE?
      </Headline>
    </>
  ),

  'viral-hooks': () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF006E] via-[#8338EC] to-[#0A0A0F]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
      <PersonSilhouette />
      <Headline>
        VIRAL
        <br />
        <span className="text-[#FFBE0B]">HOOKS</span>
      </Headline>
    </>
  ),

  documentary: () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1510] via-[#2d2418] to-[#0A0A0F]" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(229,168,35,0.08)_50%,transparent_60%)]" />
      <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-black/60 to-transparent z-[1]" />
      <Headline className="top-[30%] text-left pl-8 !inset-x-auto left-0 right-auto max-w-[70%]">
        <span className="text-[#E5A823] text-lg block mb-1 not-italic font-mono tracking-widest">EP. 01</span>
        DOCUMENTARY
        <br />
        CUT
      </Headline>
    </>
  ),

  'podcast-long': () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-[#2A1510] to-[#0A0806]" />
      <svg className="absolute right-[8%] top-1/2 -translate-y-1/2 w-32 h-32 opacity-40" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#E5A823" strokeWidth="2" />
        <circle cx="50" cy="50" r="20" fill="#1a1a1a" />
      </svg>
      <Headline className="top-[35%] text-left pl-8 !inset-x-auto left-0 max-w-[65%]">
        PODCAST
        <br />
        <span className="text-[#E5A823]">VISUALS</span>
      </Headline>
    </>
  ),

  'tech-review': () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0D2847] to-[#020408]" />
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-500/30 rounded-2xl rotate-12 opacity-50" />
      <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-32 h-24 bg-gradient-to-br from-cyan-900/80 to-slate-900 rounded-lg border border-cyan-400/20" />
      <Headline className="top-[32%] text-left pl-8 !inset-x-auto left-0">
        TECH
        <br />
        <span className="text-cyan-400">REVIEW</span>
      </Headline>
    </>
  ),

  travel: () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/30 via-[#1a3a5c] to-[#0A1A2E]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0A1A2E] to-transparent" />
      <div className="absolute top-[20%] right-[15%] w-24 h-24 rounded-full bg-orange-400/20 blur-2xl" />
      <Headline className="top-[38%] text-left pl-8 !inset-x-auto left-0">
        TRAVEL
        <br />
        <span className="text-orange-300">VLOG</span>
      </Headline>
    </>
  ),

  'product-launch': () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-[#2A0A1A] via-[#4A1030] to-[#0A0510]" />
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-28 h-40 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-[#E5A823]/30 shadow-[0_0_60px_rgba(229,168,35,0.2)]" />
      <Headline className="top-[30%] text-left pl-8 !inset-x-auto left-0">
        PRODUCT
        <br />
        <span className="text-[#E5A823]">LAUNCH</span>
      </Headline>
    </>
  ),

  ugc: () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#00F5D4]/20 via-[#7B2FF7]/40 to-[#0A0A0F]" />
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 px-4 py-1 bg-black/50 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white z-10">
        #UGC
      </div>
      <PersonSilhouette />
      <Headline>
        UGC
        <br />
        <span className="text-[#00F5D4]">CAMPAIGN</span>
      </Headline>
    </>
  ),

  vsl: () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A08] via-[#3D3A0A] to-[#0A0A05]" />
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <span className="text-[6rem] font-black text-[#E5A823]">VSL</span>
      </div>
      <Headline className="top-[32%]">
        MASTERCLASS
        <br />
        <span className="text-[#E5A823]">FUNNEL</span>
      </Headline>
    </>
  ),
};

export default function FeaturedWorkBanner({ work, className = '' }) {
  const ThemeArt = THEMES[work.theme] || THEMES['viral-hooks'];
  const brand = work.brand || 'ZODIAC EDITS';

  return (
    <article
      className={`featured-work-banner relative overflow-hidden rounded-3xl border border-white/10 group cursor-pointer ${work.aspect} ${className}`}
    >
      <ThemeArt />
      <BannerGrain />
      <PlayOverlay />
      <BrandMark>{brand}</BrandMark>
      {work.subtitle && (
        <p className="absolute bottom-12 left-0 right-0 z-20 text-center text-white/70 text-[10px] uppercase tracking-[0.25em] font-semibold">
          {work.subtitle}
        </p>
      )}
    </article>
  );
}

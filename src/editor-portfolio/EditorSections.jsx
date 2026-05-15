import React from 'react';
import { motion } from 'framer-motion';
import { Video, Smartphone, Sparkles, TrendingUp, Lightbulb, Scissors, MessageSquare, Package, ArrowRight } from 'lucide-react';

const SectionHeader = ({ subtitle, title, titleAccent }) => (
  <div className="mb-14">
    <p className="editor-mono text-[11px] tracking-[0.35em] uppercase mb-3 text-[#E5A823]">{subtitle}</p>
    <h2 className="editor-font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
      {title} <span className="editor-text-gradient">{titleAccent}</span>
    </h2>
  </div>
);

export function EditorTheCraft() {
  return (
    <section id="the-craft" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
      <SectionHeader subtitle="THE CRAFT" title="Frames cut with" titleAccent="intention." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed normal-case" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          I'm Zodiac — a creative video editor shaping social, promo, and ad content for brands and creators. Reels, shorts, long-form — every cut tuned for rhythm, retention, and a feeling you remember after the screen goes dark.
        </p>
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {['Reels / Shorts & social', 'Promo / Brand & product', 'Ads / Performance edits', 'Audio / Mix & enhance'].map(item => (
            <div key={item} className="editor-card-launch p-6 text-sm text-slate-300 font-semibold border border-[#E5A823]/10">
              {item.split(' / ')[0]}<br/><span className="text-[#E5A823] text-xs font-normal mt-1 block">{item.split(' / ')[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EditorServices() {
  return (
    <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 editor-font-display tracking-wide">Our Services</h2>
          <p className="text-slate-400 text-base md:text-lg normal-case" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Comprehensive video production solutions tailored to your goals
          </p>
        </div>
        <button 
          onClick={() => window.open('https://www.linkedin.com/in/prasanthzodiac/', '_blank')}
          className="px-6 py-3 rounded-full bg-[#E5A823] text-black font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
        >
          Book a Call <ArrowRight size={16} className="-rotate-45" strokeWidth={2.5} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Video, title: 'Video Editing', desc: 'Transform raw footage into polished, professional content that captivates audiences and drives engagement across all platforms.' },
          { icon: Smartphone, title: 'Shorts & Reels', desc: 'Create viral-worthy vertical content optimized for TikTok, Instagram Reels, and YouTube Shorts that maximizes reach and conversion.' },
          { icon: Sparkles, title: 'Motion Graphics', desc: 'Elevate your brand with stunning animations, dynamic text, and visual effects that make your content stand out from the competition.' },
          { icon: TrendingUp, title: 'Commercial Ads', desc: 'Produce high-converting advertisements that communicate your message clearly and inspire action from your target audience.' }
        ].map((s, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            key={i} 
            className="p-8 rounded-2xl border border-white/20 bg-[#0F0F13] hover:border-[#E5A823]/50 transition-colors flex flex-col items-start relative overflow-hidden group shadow-lg"
          >
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#E5A823] blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <s.icon className="text-white mb-6 group-hover:scale-110 transition-transform duration-300" size={32} strokeWidth={1.5} />
            <h3 className="text-white text-xl font-bold mb-4 editor-font-display tracking-wide">{s.title}</h3>
            <p className="text-slate-400 text-[15px] leading-relaxed normal-case" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function EditorProcess() {
  const steps = [
    { icon: Lightbulb, title: 'Discover & Strategy', desc: 'Understanding your goals, audience, and vision to set a clear direction for the edit.', active: true },
    { icon: Scissors, title: 'Creative Production', desc: 'Transforming raw footage into a polished, engaging video through clean cuts and storytelling.', active: false },
    { icon: MessageSquare, title: 'Review & Revisions', desc: 'Sharing previews, gathering feedback, and refining the edit for the best result.', active: false },
    { icon: Package, title: 'Final Delivery', desc: 'Delivering the final video in ready-to-publish formats, on time.', active: false },
  ];

  return (
    <section id="process" className="relative z-10 max-w-7xl mx-auto px-6 py-32 mt-12 mb-24 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(20,20,25,0) 0%, rgba(229,168,35,0.03) 100%)' }}>
      <div className="text-center mb-32">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3 editor-font-display tracking-wide">Our Process</h2>
        <p className="text-slate-400 text-base md:text-lg normal-case" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          From concept to completion in four seamless steps
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Horizontal Progress Bar */}
        <div className="absolute -bottom-8 left-0 right-0 h-4 flex items-center gap-[3px] opacity-60">
          {[...Array(80)].map((_, i) => (
            <div key={i} className={`flex-1 h-3 rounded-[1px] ${i < 20 ? 'bg-[#E5A823]' : 'bg-white/10'}`} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative pb-8">
          {steps.map((s, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              key={i} 
              className={`flex flex-col items-center text-center relative ${i % 2 === 0 ? '-mt-16' : 'mt-12'}`}
            >
              <s.icon className={`mb-5 ${s.active ? 'text-[#E5A823]' : 'text-white'}`} size={36} strokeWidth={1.5} />
              <h3 className={`text-xl font-bold mb-3 editor-font-display tracking-wide ${s.active ? 'text-[#E5A823]' : 'text-white'}`}>{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed normal-case max-w-[240px]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{s.desc}</p>
              
              {/* Vertical Drop Line */}
              <div 
                className={`hidden md:block absolute w-[1px] left-1/2 -translate-x-1/2 top-[110%] bg-gradient-to-b ${s.active ? 'from-[#E5A823] to-transparent opacity-80' : 'from-white/20 to-transparent opacity-40'}`} 
                style={{ height: i % 2 === 0 ? '160px' : '40px' }} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EditorAbout() {
  return (
    <section id="about" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
      <SectionHeader subtitle="ABOUT" title="Editor first." titleAccent="Storyteller always." />
      <div className="editor-card-launch p-10 md:p-14 border border-[#E5A823]/20">
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed normal-case mb-8" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Zodiac is a creative video editor focused on social and promotional content. Through regular production work — reels, ads, shorts, brand pieces — the practice has sharpened across transitions, sound design, captions, and visual polish, with a constant focus on making videos feel cinematic, professional, and worth watching twice.
        </p>
        <p className="text-[#E5A823] text-sm font-semibold editor-mono tracking-wide uppercase leading-loose">
          Strengths: creativity, communication, time management, and the technical chops to take a project from raw rushes to a finished cut that lands.
        </p>
      </div>
    </section>
  );
}

export function EditorContact() {
  const links = [
    { name: 'YouTube', url: 'https://www.youtube.com/@Prasanthzodiac' },
    { name: 'Instagram', url: 'https://www.instagram.com/zodiac.edits_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/prasanthzodiac/' },
    { name: 'Edits Folder', url: 'https://www.mediafire.com/folder/pfp1atb30n57l/EDITS' }
  ];

  return (
    <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-24 pb-32">
      <SectionHeader subtitle="CONTACT" title="Got footage?" titleAccent="Let's cut it." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <p className="text-slate-400 text-lg leading-relaxed normal-case" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Open for collabs, brand work, and freelance edits. Best way to reach me is a DM on Instagram or a message on LinkedIn.
        </p>
        <div className="flex flex-col gap-4">
          {links.map(l => (
            <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="editor-card-launch p-6 flex items-center justify-between group border border-[#E5A823]/10 hover:border-[#E5A823]/50 transition-colors">
              <span className="text-white font-bold editor-font-display text-xl">{l.name}</span>
              <span className="text-[#E5A823] group-hover:translate-x-2 transition-transform">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

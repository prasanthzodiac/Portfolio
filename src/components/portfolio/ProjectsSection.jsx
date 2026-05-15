import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'COLLEGE MANAGEMENT SYSTEM',
    subtitle: 'Academic Intelligence Platform',
    description:
      'A comprehensive end-to-end academic management ecosystem — handling student records, real-time attendance, grade analytics, faculty dashboards, and role-based access control. Built to scale across departments with a clean, intuitive interface that redefines how institutions manage knowledge.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'React', 'REST API'],
    year: '2025',
    category: 'FULL STACK',
    stats: [
      { label: 'Modules', value: '12+' },
      { label: 'Roles', value: '4' },
      { label: 'Stack', value: 'Full' },
    ],
    image: '/banners/college-management-system.png',
    github: 'https://github.com/prasanthzodiac/College-Management-System-CMS-',
    demo: 'https://college-management-system-cms-gamma.vercel.app/',
  },
  {
    id: 2,
    title: 'COMPANY INTELLIGENCE AI',
    subtitle: 'AI-Powered Business Insights',
    description:
      'An intelligent business analytics engine that transforms raw company data into actionable insights. Leverages machine learning models to predict trends, visualize KPIs with interactive dashboards, and generate executive-level reports — turning data noise into competitive intelligence.',
    tech: ['Python', 'React', 'Node.js', 'ML Models', 'MySQL'],
    year: '2025',
    category: 'AI / ML',
    stats: [
      { label: 'Data Points', value: '50K+' },
      { label: 'AI Models', value: '3' },
      { label: 'Views', value: '8' },
    ],
    image: '/banners/company-intelligence-ai.png',
    github: 'https://github.com/prasanthzodiac/Company-Intelligence-AI---Infynd-Hackathon',
    demo: 'https://company-intelligence-ai-infynd-hack.vercel.app/#upload',
  },
  {
    id: 3,
    title: 'VALORAE',
    subtitle: 'Limited Authenticated Collectibles',
    description:
      'A blockchain-inspired platform for limited authenticated digital collectibles and exclusive fan ownership experiences. Fans can acquire, trade, and authenticate rare digital items — merging scarcity, identity, and fandom into a seamless ownership economy with real-time rarity tracking.',
    tech: ['React', 'Node.js', 'Web3', 'REST API', 'MySQL'],
    year: '2026',
    category: 'WEB3',
    stats: [
      { label: 'Items', value: 'Limited' },
      { label: 'Auth', value: 'On-chain' },
      { label: 'Access', value: 'Exclusive' },
    ],
    image: '/banners/valorae.png',
    github: 'https://github.com/prasanthzodiac/Valorae',
    demo: 'https://valorae.vercel.app/',
  },
];

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(2,4,10,0.95)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-surface border border-white/5 overflow-hidden flex flex-col md:flex-row"
      >
        <button onClick={onClose} data-hover
          className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-electric hover:text-void text-white flex items-center justify-center transition-colors z-20"
        >
          <X size={20} />
        </button>

        <div className="w-full md:w-3/5 h-64 md:h-[600px] relative">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-void/20" />
        </div>

        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-mega-wide text-electric mb-4 uppercase">{project.category} · {project.year}</div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white uppercase tracking-wider mb-2 leading-tight">{project.title}</h3>
            <p className="font-body text-sm text-ghost font-light mb-8">{project.subtitle}</p>

            <p className="font-body text-ghost text-sm leading-relaxed font-light mb-8">{project.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {project.stats.map(({ label, value }) => (
                <div key={label}>
                  <div className="font-display font-bold text-xl text-ice">{value}</div>
                  <div className="font-mono text-[10px] text-ghost/60 mt-1 tracking-wider uppercase">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-12">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-[10px] tracking-widest uppercase border border-white/10 px-3 py-1.5 text-ghost">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a href={project.demo} target="_blank" rel="noopener noreferrer" data-hover
              className="w-full flex items-center justify-between px-6 py-4 bg-white text-void font-display font-bold text-xs tracking-mega-wide uppercase transition-colors hover:bg-electric">
              <span>Launch Platform</span>
              <ExternalLink size={16} />
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" data-hover
              className="w-full flex items-center justify-between px-6 py-4 border border-white/20 text-white font-display font-bold text-xs tracking-mega-wide uppercase transition-colors hover:border-electric hover:text-electric">
              <span>View Source</span>
              <Github size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const yRange = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden bg-transparent">
      {/* Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="vertical-line left-[10%]" />
        <div className="vertical-line right-[10%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12"
        >
          <div>
            <span className="font-mono text-electric text-[10px] tracking-mega-wide uppercase">04 / Portfolio</span>
            <h2 className="mt-6 font-display font-bold text-5xl md:text-7xl text-white tracking-widest uppercase leading-[1.1]">
              DIGITAL <span className="text-ghost">DEVELOPMENTS</span>
            </h2>
          </div>
          <div className="font-mono text-[10px] tracking-mega-wide text-ghost uppercase max-w-xs leading-relaxed">
            A curated selection of high-performance web applications and enterprise systems.
          </div>
        </motion.div>

        <div className="space-y-32">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer block w-full"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden bg-surface mb-8">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-void/30 group-hover:bg-transparent transition-colors duration-1000" />
                
                {/* Overlay hover UI */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-void/40 backdrop-blur-sm">
                  <div className="flex items-center gap-4 px-8 py-4 border border-white text-white font-display font-bold text-sm tracking-mega-wide uppercase">
                    Explore Details <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-display font-bold text-3xl text-ice tracking-wider uppercase mb-2">{project.title}</h3>
                  <div className="font-mono text-[10px] text-ghost tracking-mega-wide uppercase mb-4">{project.subtitle}</div>
                  
                  <div className="flex gap-6 mt-4">
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-[10px] font-mono tracking-mega-wide uppercase text-white drop-shadow-[0_0_8px_rgba(0,136,255,0.8)] hover:drop-shadow-[0_0_15px_rgba(0,136,255,1)] transition-all duration-300"
                    >
                      <ExternalLink size={14} /> Visit Site
                    </a>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-[10px] font-mono tracking-mega-wide uppercase text-ice drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)] transition-all duration-300"
                    >
                      <Github size={14} /> Source Code
                    </a>
                  </div>
                </div>
                <div className="font-mono text-[10px] text-electric tracking-mega-wide uppercase border border-electric/30 px-4 py-2 mt-4 md:mt-0">
                  {project.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
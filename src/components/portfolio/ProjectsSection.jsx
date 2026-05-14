import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Zap, GraduationCap, Diamond, X, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'College Management System',
    subtitle: 'Academic Intelligence Platform',
    description:
      'A comprehensive end-to-end academic management ecosystem — handling student records, real-time attendance, grade analytics, faculty dashboards, and role-based access control. Built to scale across departments with a clean, intuitive interface that redefines how institutions manage knowledge.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'React', 'REST API', 'JWT'],
    color: '#FFB347',
    accentColor: '#F5C842',
    year: '2024',
    category: 'Full Stack',
    icon: GraduationCap,
    stats: [
      { label: 'Modules', value: '12+' },
      { label: 'Role Levels', value: '4' },
      { label: 'Stack', value: 'Full' },
    ],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
    github: 'https://github.com/prasanthzodiac',
    demo: 'https://github.com/prasanthzodiac',
  },
  {
    id: 2,
    title: 'Company Intelligence AI',
    subtitle: 'AI-Powered Business Insights',
    description:
      'An intelligent business analytics engine that transforms raw company data into actionable insights. Leverages machine learning models to predict trends, visualize KPIs with interactive dashboards, and generate executive-level reports — turning data noise into competitive intelligence.',
    tech: ['Python', 'React', 'Node.js', 'ML Models', 'REST API', 'MySQL'],
    color: '#C084FC',
    accentColor: '#A855F7',
    year: '2025',
    category: 'AI / ML',
    icon: Zap,
    stats: [
      { label: 'Data Points', value: '50K+' },
      { label: 'AI Models', value: '3' },
      { label: 'Dashboards', value: '8' },
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    github: 'https://github.com/prasanthzodiac',
    demo: 'https://github.com/prasanthzodiac',
  },
  {
    id: 3,
    title: 'Valorae',
    subtitle: 'Limited Authenticated Collectibles',
    description:
      'A blockchain-inspired platform for limited authenticated digital collectibles and exclusive fan ownership experiences. Fans can acquire, trade, and authenticate rare digital items — merging scarcity, identity, and fandom into a seamless ownership economy with real-time rarity tracking.',
    tech: ['React', 'Node.js', 'Web3', 'REST API', 'JWT', 'MySQL'],
    color: '#FF6B6B',
    accentColor: '#FF8E53',
    year: '2025',
    category: 'Web3 / Fan Tech',
    icon: Diamond,
    stats: [
      { label: 'Collectibles', value: 'Limited' },
      { label: 'Auth Layer', value: 'On-chain' },
      { label: 'Ownership', value: 'Exclusive' },
    ],
    image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=1200&q=80',
    github: 'https://github.com/prasanthzodiac',
    demo: 'https://github.com/prasanthzodiac',
  },
];

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const Icon = project.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(8,6,14,0.92)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{ background: '#0D0B16', border: `1px solid ${project.color}35` }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${project.color}20, #0D0B16)` }} />
          <button onClick={onClose} data-hover
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <X size={16} className="text-white" />
          </button>
          <div className="absolute top-4 left-4 font-mono-code text-xs px-3 py-1.5 rounded-full"
            style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}50` }}>
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
              <Icon size={22} style={{ color: project.color }} />
            </div>
            <div>
              <div className="font-mono-code text-xs tracking-widest uppercase mb-1" style={{ color: project.accentColor }}>{project.subtitle}</div>
              <h3 className="font-display font-bold text-2xl text-white">{project.title}</h3>
              <span className="font-mono-code text-xs text-ghost">{project.year}</span>
            </div>
          </div>

          <p className="font-body text-ghost text-sm leading-relaxed">{project.description}</p>

          <div className="grid grid-cols-3 gap-3">
            {project.stats.map(({ label, value }) => (
              <div key={label} className="text-center p-3 rounded-xl"
                style={{ background: `${project.color}08`, border: `1px solid ${project.color}18` }}>
                <div className="font-display font-bold text-lg" style={{ color: project.color }}>{value}</div>
                <div className="font-mono-code text-xs text-ghost mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="font-mono-code text-xs px-2.5 py-1 rounded-lg"
                style={{ background: `${project.color}08`, color: project.color + 'CC', border: `1px solid ${project.color}20` }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <a href={project.demo} target="_blank" rel="noopener noreferrer" data-hover
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-display font-semibold text-sm text-void transition-all hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})` }}>
              <ArrowUpRight size={16} />
              Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" data-hover
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-display font-medium text-sm text-white transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Github size={16} />
              Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.93, 1, 1, 0.96]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 12,
    });
  };

  const Icon = project.icon;

  return (
    <motion.div ref={cardRef} style={{ opacity, scale }} className="w-full">
      <motion.div
        style={{
          y: smoothY,
          transform: hovered
            ? `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
            : 'perspective(1200px) rotateY(0deg) rotateX(0deg)',
          transition: hovered
            ? 'transform 0.08s ease, border-color 0.4s ease, box-shadow 0.4s ease'
            : 'transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease, box-shadow 0.4s ease',
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? project.color + '55' : 'rgba(255,255,255,0.06)'}`,
          backdropFilter: 'blur(24px)',
          boxShadow: hovered
            ? `0 30px 80px ${project.color}25, 0 0 0 1px ${project.color}20`
            : '0 8px 32px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
        onClick={onClick}
        data-hover
        className="group relative rounded-3xl overflow-hidden cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-60 overflow-hidden">
          <img src={project.image} alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${project.color}18 0%, #08060E 100%)` }} />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}28 0%, transparent 65%)` }} />
          <div className="absolute top-5 left-5 right-5 flex justify-between">
            <div className="font-mono-code text-xs px-3 py-1.5 rounded-full"
              style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}45` }}>
              {project.category}
            </div>
            <div className="font-mono-code text-xs px-3 py-1.5 rounded-full glass-pane" style={{ color: project.accentColor }}>
              {project.year}
            </div>
          </div>
          <div className="absolute bottom-5 left-5 w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: `${project.color}18`, border: `1px solid ${project.color}35`,
              boxShadow: hovered ? `0 0 28px ${project.color}45` : 'none', transition: 'box-shadow 0.4s ease' }}>
            <Icon size={24} style={{ color: project.color }} />
          </div>

          {/* Click-to-open hint */}
          <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1.5 font-mono-code text-xs px-3 py-1.5 rounded-full"
              style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
              <ArrowUpRight size={12} />
              View Details
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 space-y-4">
          <div>
            <div className="font-mono-code text-xs tracking-widest uppercase mb-1.5" style={{ color: project.accentColor }}>
              {project.subtitle}
            </div>
            <h3 className="font-display font-bold text-2xl text-white leading-tight">{project.title}</h3>
          </div>

          <p className="font-body text-ghost text-sm leading-relaxed line-clamp-3">{project.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5">
            {project.stats.map(({ label, value }) => (
              <div key={label} className="text-center p-2.5 rounded-xl"
                style={{ background: `${project.color}07`, border: `1px solid ${project.color}15` }}>
                <div className="font-display font-bold text-base" style={{ color: project.color }}>{value}</div>
                <div className="font-mono-code text-xs text-ghost mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => (
              <span key={t} className="font-mono-code text-xs px-2.5 py-1 rounded-lg"
                style={{ background: `${project.color}08`, color: project.color + 'BB', border: `1px solid ${project.color}18` }}>
                {t}
              </span>
            ))}
          </div>

          {/* Action row */}
          <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()} data-hover
              className="flex items-center gap-2 font-mono-code text-xs text-ghost hover:text-white transition-colors">
              <Github size={13} /> Source
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()} data-hover
              className="flex items-center gap-2 font-mono-code text-xs" style={{ color: project.color }}>
              <ExternalLink size={13} /> Live Demo
            </a>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="font-mono-code text-xs px-3 py-1 rounded-full"
                style={{ background: `${project.color}18`, color: project.color }}>
                Click to explore →
              </div>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        {[['top-3 left-3', 'border-t border-l'], ['top-3 right-3', 'border-t border-r'],
          ['bottom-3 left-3', 'border-b border-l'], ['bottom-3 right-3', 'border-b border-r']].map(([pos, border], i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5 ${border} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            style={{ borderColor: project.color + '80' }} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start start'] });
  const headerY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(192,132,252,0.04) 0%, transparent 55%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(255,179,71,0.03) 0%, transparent 55%)' }} />

      <div className="max-w-5xl mx-auto">
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-20">
          <span className="font-mono-code text-electric text-sm tracking-[0.3em] uppercase">03 / Projects</span>
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-white tracking-tight leading-none">
              The Artifact <span className="gradient-electric-nebula">Gallery</span>
            </h2>
            <p className="font-body text-ghost max-w-xs text-sm leading-relaxed md:text-right">
              Click any card to explore the full demo.
            </p>
          </div>
          <div className="mt-8 h-px w-full"
            style={{ background: 'linear-gradient(90deg, #ea580c 0%, #fbbf24 45%, #fde047 70%, transparent 100%)', opacity: 0.35 }} />
        </motion.div>

        <div className="space-y-10">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 font-mono-code text-xs text-ghost px-6 py-3 rounded-full glass-pane">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="w-2 h-2 rounded-full" style={{ background: 'conic-gradient(#ea580c, #fbbf24, #fde047, #ea580c)' }} />
            More projects in development · check GitHub
            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="w-2 h-2 rounded-full" style={{ background: 'conic-gradient(#fbbf24, #fde047, #f59e0b, #fbbf24)' }} />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
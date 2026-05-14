import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Code2, Zap, Star, BookOpen } from 'lucide-react';

const TIMELINE = [
  {
    year: '2023',
    title: 'Joined Dr. MCET',
    subtitle: 'Anna University · BE Computer Science',
    description: 'Embarked on the engineering journey at Dr. Mahalingam College of Engineering and Technology, Pollachi. Began deep-diving into data structures, algorithms, and the fundamentals of full-stack development.',
    icon: GraduationCap,
    color: '#00FFD1',
    tags: ['CSE', 'Data Structures', 'OOP', 'C Programming'],
    side: 'left',
  },
  {
    year: '2023',
    title: 'First Lines of Web',
    subtitle: 'HTML · CSS · JavaScript',
    description: 'Built the first responsive websites from scratch — learning the craft of semantic markup, CSS animations, and vanilla JavaScript DOM manipulation. Fell in love with turning code into visual experiences.',
    icon: Code2,
    color: '#FF2D78',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    side: 'right',
  },
  {
    year: '2024',
    title: 'Full Stack Leap',
    subtitle: 'Java · Spring Boot · MySQL · React',
    description: 'Leveled up to full-stack development — mastering Java Spring Boot on the backend, MySQL for data persistence, and React for dynamic frontends. Built the College Management System as a capstone project.',
    icon: Star,
    color: '#FFE566',
    tags: ['Java', 'Spring Boot', 'MySQL', 'React', 'REST API', 'JWT'],
    side: 'left',
  },
  {
    year: '2024',
    title: 'Backend & APIs',
    subtitle: 'Node.js · Python · REST Architecture',
    description: 'Expanded into Node.js and Python — building scalable REST APIs, authentication systems, and data-driven backends. Started exploring AI/ML integration with Python for business analytics.',
    icon: BookOpen,
    color: '#7B5EFF',
    tags: ['Node.js', 'Python', 'Express', 'REST API', 'Postman'],
    side: 'right',
  },
  {
    year: '2025',
    title: 'AI & Web3 Ventures',
    subtitle: 'Company Intelligence AI · Valorae',
    description: 'Launched two ambitious projects: an AI-powered business intelligence platform using ML models, and Valorae — a limited authenticated collectibles platform for exclusive fan ownership in the Web3 space.',
    icon: Zap,
    color: '#FF2D78',
    tags: ['Python', 'ML Models', 'React', 'Web3', 'Node.js'],
    side: 'left',
  },
  {
    year: '2027',
    title: 'Graduation Target',
    subtitle: 'BE CSE · Anna University',
    description: 'On track to graduate with a strong foundation in full-stack engineering, AI/ML systems, and product development. Actively seeking internship and placement opportunities to deploy real-world impact.',
    icon: GraduationCap,
    color: '#00FFD1',
    tags: ['Full Stack', 'AI/ML', 'Open to Work', '2027 Graduate'],
    side: 'right',
  },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.6],
    item.side === 'left' ? [-60, 0] : [60, 0]);
  const Icon = item.icon;

  return (
    <div ref={ref} className={`relative flex items-start gap-0 md:gap-8 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
      {/* Center dot on timeline */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: `${item.color}18`, border: `2px solid ${item.color}`, boxShadow: `0 0 20px ${item.color}40` }}
        >
          <Icon size={18} style={{ color: item.color }} />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        style={{ opacity, x }}
        className={`w-full md:w-[calc(50%-2.5rem)] ml-0 ${item.side === 'right' ? 'md:ml-auto' : ''}`}
      >
        <div className="group relative rounded-2xl p-6 transition-all duration-400 hover:scale-[1.01]"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${item.color}18`,
            backdropFilter: 'blur(20px)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = item.color + '45'}
          onMouseLeave={e => e.currentTarget.style.borderColor = item.color + '18'}
        >
          {/* Year badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-code text-xs px-3 py-1 rounded-full font-bold"
              style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
              {item.year}
            </span>
            {/* Mobile icon */}
            <div className="flex md:hidden w-8 h-8 rounded-full items-center justify-center"
              style={{ background: `${item.color}15`, border: `1px solid ${item.color}40` }}>
              <Icon size={14} style={{ color: item.color }} />
            </div>
          </div>

          <div className="font-mono-code text-xs tracking-widest uppercase mb-1" style={{ color: item.color + 'AA' }}>
            {item.subtitle}
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-3">{item.title}</h3>
          <p className="font-body text-ghost text-sm leading-relaxed mb-4">{item.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {item.tags.map(tag => (
              <span key={tag} className="font-mono-code text-xs px-2 py-0.5 rounded-md"
                style={{ background: `${item.color}08`, color: item.color + 'AA', border: `1px solid ${item.color}15` }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Glow on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: `inset 0 0 30px ${item.color}06` }} />
        </div>
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
    </div>
  );
}

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(0,255,209,0.04) 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="font-mono-code text-electric text-sm tracking-[0.3em] uppercase">02.5 / Journey</span>
          <h2 className="mt-4 font-display font-bold text-5xl md:text-6xl text-white tracking-tight">
            The <span className="gradient-electric-nebula">Chronicle</span>
          </h2>
          <p className="mt-4 font-body text-ghost max-w-md mx-auto text-sm leading-relaxed">
            Every milestone, every breakthrough — a timeline of relentless growth.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'rgba(255,255,255,0.05)' }} />
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              scaleY: lineScaleY,
              transformOrigin: 'top',
              background: 'linear-gradient(to bottom, #ea580c, #f59e0b, #fbbf24, #fde047)',
            }}
          />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TIMELINE = [
  {
    year: '2023',
    title: 'JOINED DR. MCET',
    subtitle: 'Anna University · BE Computer Science',
    description: 'Embarked on the engineering journey. Began deep-diving into data structures, algorithms, and the fundamentals of full-stack development.',
  },
  {
    year: '2023',
    title: 'FIRST LINES OF WEB',
    subtitle: 'HTML · CSS · JavaScript',
    description: 'Built the first responsive websites from scratch — learning the craft of semantic markup, CSS animations, and vanilla JavaScript DOM manipulation.',
  },
  {
    year: '2024',
    title: 'FULL STACK LEAP',
    subtitle: 'Java · Spring Boot · MySQL · React',
    description: 'Leveled up to full-stack development — mastering Java Spring Boot on the backend, MySQL for data persistence, and React for dynamic frontends.',
  },
  {
    year: '2024',
    title: 'BACKEND & APIS',
    subtitle: 'Node.js · Python · REST Architecture',
    description: 'Expanded into Node.js and Python — building scalable REST APIs, authentication systems, and data-driven backends.',
  },
  {
    year: '2025',
    title: 'AI & WEB3 VENTURES',
    subtitle: 'Company Intelligence AI · Valorae',
    description: 'Launched two ambitious projects: an AI-powered business intelligence platform and Valorae — a limited collectibles platform in the Web3 space.',
  },
  {
    year: '2027',
    title: 'GRADUATION TARGET',
    subtitle: 'BE CSE · Anna University',
    description: 'On track to graduate with a strong foundation in full-stack engineering, AI/ML systems, and product development.',
  },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative pl-12 md:pl-0 w-full md:w-[45%] md:even:ml-auto">
      {/* Connector Dot */}
      <div className="absolute left-0 md:-left-[11%] lg:-left-[11.5%] xl:-left-[12.2%] top-2 w-3 h-3 rounded-full bg-electric z-10 hidden md:block" />
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-electric z-10 md:hidden -ml-[5px]" />

      <div className="group border-t border-white/10 pt-6 transition-colors hover:border-electric">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-ghost tracking-mega-wide">{item.year}</span>
        </div>
        <h3 className="font-display font-bold text-2xl text-ice tracking-wider mb-2">{item.title}</h3>
        <div className="font-mono text-[10px] text-electric tracking-widest uppercase mb-4">
          {item.subtitle}
        </div>
        <p className="font-body text-ghost text-sm leading-relaxed font-light">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" ref={sectionRef} className="relative py-32 px-6 overflow-hidden bg-transparent">
      {/* Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="vertical-line left-[10%]" />
        <div className="vertical-line right-[10%]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <span className="font-mono text-electric text-[10px] tracking-mega-wide uppercase">02 / Journey</span>
          <h2 className="mt-6 font-display font-bold text-5xl md:text-7xl text-white tracking-widest uppercase leading-[1.1]">
            THE <span className="text-ghost">CHRONICLE</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Center Line for Desktop, Left Line for Mobile */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5" />
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-electric"
            style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
          />

          <div className="space-y-20 py-10">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
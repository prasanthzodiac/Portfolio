import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';

const resumeHref = `${import.meta.env.BASE_URL || '/'}Prasanth S - Resume.pdf`.replace(/([^:]\/)\/{2,}/g, '$1/');

const CONTACTS = [
  { label: 'EMAIL', value: 'Prasanthzodiac@gmail.com', href: 'mailto:Prasanthzodiac@gmail.com' },
  { label: 'GITHUB', value: 'prasanthzodiac', href: 'https://github.com/prasanthzodiac' },
  { label: 'LINKEDIN', value: 'Prasanth S', href: 'https://www.linkedin.com/in/prasanthzodiac/' },
  { label: 'LOCATION', value: 'Coimbatore, TN, India', href: null },
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // Minimal architectural wireframe box
    const geo = new THREE.BoxGeometry(2, 2, 2, 4, 4, 4);
    const mat = new THREE.LineBasicMaterial({ color: 0x0088FF, transparent: true, opacity: 0.15 });
    const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
    scene.add(wireframe);

    let raf, time = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.002;
      wireframe.rotation.x = time * 0.5;
      wireframe.rotation.y = time * 0.8;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', handleResize); renderer.dispose(); };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-40 overflow-hidden bg-transparent border-t border-white/5">
      {/* Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="vertical-line left-[10%]" />
        <div className="vertical-line right-[10%]" />
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-30 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div style={{ y, opacity }} className="w-full">
          <span className="font-mono text-electric text-[10px] tracking-mega-wide uppercase block mb-8">05 / Initiate Contact</span>
          
          <h2 className="font-display font-bold text-[clamp(3rem,10vw,10rem)] text-white tracking-widest uppercase leading-none mb-20">
            CONNECT.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 w-full max-w-6xl mx-auto">
            {CONTACTS.map((contact, i) => (
              <div key={i} className="bg-void p-8 group transition-colors hover:bg-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-electric scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <div className="font-mono text-[10px] text-ghost tracking-mega-wide uppercase mb-4">{contact.label}</div>
                {contact.href ? (
                  <a href={contact.href} target="_blank" rel="noopener noreferrer" className="font-display font-bold text-lg text-ice group-hover:text-electric transition-colors flex items-center justify-center gap-2">
                    {contact.value} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </a>
                ) : (
                  <div className="font-display font-bold text-lg text-ice">{contact.value}</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <a
              href={resumeHref}
              download="Prasanth-S-Resume.pdf"
              data-hover
              className="px-12 py-6 bg-white text-void font-display font-bold text-xs tracking-mega-wide uppercase transition-colors hover:bg-electric flex items-center gap-4 group"
            >
              DOWNLOAD RESUME
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
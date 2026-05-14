import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';
import { Mail, Github, Linkedin, Phone, MapPin } from 'lucide-react';

const CONTACTS = [
  { icon: Mail, label: 'Email', value: 'Prasanthzodiac@gmail.com', href: 'mailto:Prasanthzodiac@gmail.com', color: '#FFB347' },
  { icon: Github, label: 'GitHub', value: 'github.com/prasanthzodiac', href: 'https://github.com/prasanthzodiac', color: '#C084FC' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/prasanthzodiac', href: 'https://linkedin.com/in/prasanthzodiac', color: '#FFB347' },
  { icon: Phone, label: 'Phone', value: '+91 9080478462', href: 'tel:+919080478462', color: '#F5C842' },
  { icon: MapPin, label: 'Location', value: 'Pollachi, Tamil Nadu', href: '#', color: '#A09080' },
];

export default function ContactSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] });
  const coreY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const coreOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const linksY = useTransform(scrollYProgress, [0.1, 0.5], [80, 0]);
  const linksOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const smoothCoreY = useSpring(coreY, { stiffness: 50, damping: 18 });
  const smoothLinksY = useSpring(linksY, { stiffness: 50, damping: 18 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 4;

    // Multi-layered pulsing core
    const geo1 = new THREE.IcosahedronGeometry(0.9, 2);
    const mat1 = new THREE.MeshPhysicalMaterial({
      color: 0xFFB347, emissive: 0xCC7700, emissiveIntensity: 0.3,
      wireframe: true, transparent: true, opacity: 0.5,
    });
    const core1 = new THREE.Mesh(geo1, mat1);
    scene.add(core1);

    const geo2 = new THREE.IcosahedronGeometry(1.3, 1);
    const mat2 = new THREE.MeshBasicMaterial({ color: 0xC084FC, wireframe: true, transparent: true, opacity: 0.18 });
    const core2 = new THREE.Mesh(geo2, mat2);
    scene.add(core2);

    // Orbiting rings
    const addRing = (radius, color, opacity, rx, ry) => {
      const g = new THREE.TorusGeometry(radius, 0.012, 8, 100);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.x = rx; mesh.rotation.y = ry;
      scene.add(mesh);
      return mesh;
    };
    const r1 = addRing(1.9, 0xFFB347, 0.3, Math.PI * 0.3, 0);
    const r2 = addRing(2.4, 0xC084FC, 0.18, Math.PI * 0.6, Math.PI * 0.25);
    const r3 = addRing(2.8, 0xF5C842, 0.1, Math.PI * 0.1, Math.PI * 0.5);

    const l1 = new THREE.PointLight(0xFFB347, 6, 12);
    l1.position.set(3, 3, 3); scene.add(l1);
    const l2 = new THREE.PointLight(0xC084FC, 4, 12);
    l2.position.set(-3, -2, 2); scene.add(l2);

    let raf, t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.008;
      core1.rotation.x += 0.005; core1.rotation.y += 0.007;
      core2.rotation.x -= 0.004; core2.rotation.y -= 0.006;
      r1.rotation.z += 0.004; r2.rotation.z -= 0.003; r3.rotation.z += 0.002;
      mat1.emissiveIntensity = 0.25 + Math.sin(t) * 0.2;
      l1.intensity = 5 + Math.sin(t * 1.3) * 2;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); renderer.dispose(); };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #ea580c 25%, #fbbf24 50%, #fde047 75%, transparent)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(255,179,71,0.04) 0%, transparent 55%)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="font-mono-code text-electric text-sm tracking-[0.3em] uppercase">04 / Contact</span>
          <h2 className="mt-4 font-display font-bold text-5xl md:text-6xl text-white tracking-tight">
            The <span className="gradient-electric-nebula">Uplink</span>
          </h2>
          <p className="mt-4 font-body text-ghost max-w-lg mx-auto">
            Ready to architect something extraordinary together? Initiate the transmission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Core */}
          <motion.div style={{ y: smoothCoreY, opacity: coreOpacity }} className="flex justify-center">
            <div className="relative w-full max-w-sm h-[380px] rounded-3xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,179,71,0.1)', backdropFilter: 'blur(24px)' }}>
              <canvas ref={canvasRef} className="w-full h-full" />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 35%, #08060E 90%)' }} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-electric text-glow-gold">CONNECT</div>
                  <div className="font-mono-code text-xs text-ghost mt-2 tracking-[0.3em]">TRANSMISSION READY</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact cards */}
          <motion.div style={{ y: smoothLinksY, opacity: linksOpacity }} className="space-y-3">
            {CONTACTS.map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                data-hover
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-400 group"
                style={{
                  background: hovered === label ? `${color}08` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${hovered === label ? color + '40' : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: hovered === label ? `0 8px 32px ${color}15` : 'none',
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: `${color}12`,
                    boxShadow: hovered === label ? `0 0 20px ${color}40` : 'none',
                  }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono-code text-xs tracking-widest uppercase mb-0.5" style={{ color }}>{label}</div>
                  <div className="font-body text-white text-sm truncate">{value}</div>
                </div>
                <motion.div
                  animate={{ x: hovered === label ? 0 : 6, opacity: hovered === label ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color }}
                >→</motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-24 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="font-display font-bold text-2xl tracking-tight">
            <span className="text-white">Prasanth</span>
            <span className="text-gradient-brand-zodiac"> Zodiac</span>
          </div>
          <div className="font-mono-code text-xs text-ghost text-center">
            © 2025 · Crafted with Three.js, React & Framer Motion
          </div>
          <div className="font-mono-code text-xs text-ghost">
            <span className="text-electric">BE CSE</span> · Dr. Mahalingam College · Anna University
          </div>
        </motion.div>
      </div>
    </section>
  );
}
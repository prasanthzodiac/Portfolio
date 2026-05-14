import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import GlitchText from './GlitchText';
import { Download } from 'lucide-react';

export default function HeroSection() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const [ctaHover, setCtaHover] = useState(false);

  // Parallax scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const canvasY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // === CRYSTALLINE DIAMOND CLUSTER ===
    const group = new THREE.Group();
    scene.add(group);

    // Main central diamond (octahedron)
    const mainGeo = new THREE.OctahedronGeometry(1.2, 2);
    const mainMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFB347,
      emissive: 0xCC8822,
      emissiveIntensity: 0.15,
      metalness: 0.9,
      roughness: 0.05,
      transparent: true,
      opacity: 0.85,
      wireframe: false,
    });
    const mainDiamond = new THREE.Mesh(mainGeo, mainMat);
    group.add(mainDiamond);

    // Wireframe overlay on main
    const wireMainMat = new THREE.MeshBasicMaterial({
      color: 0xFFB347,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireDiamond = new THREE.Mesh(mainGeo, wireMainMat);
    group.add(wireDiamond);

    // Orbiting smaller crystals
    const crystalData = [
      { size: 0.35, distance: 2.1, speed: 0.7, tilt: 0.4, color: 0xF5C842, phase: 0 },
      { size: 0.25, distance: 2.5, speed: -0.5, tilt: 1.1, color: 0xC084FC, phase: Math.PI * 0.5 },
      { size: 0.4, distance: 1.9, speed: 0.9, tilt: -0.7, color: 0xFFB347, phase: Math.PI },
      { size: 0.2, distance: 2.8, speed: -0.6, tilt: 1.5, color: 0xC084FC, phase: Math.PI * 1.5 },
      { size: 0.3, distance: 2.2, speed: 0.4, tilt: -1.2, color: 0xF5C842, phase: Math.PI * 0.7 },
      { size: 0.18, distance: 3.0, speed: 1.1, tilt: 0.9, color: 0xFF8C42, phase: Math.PI * 1.2 },
    ];

    const crystals = crystalData.map(d => {
      const geo = new THREE.OctahedronGeometry(d.size, 0);
      const mat = new THREE.MeshPhysicalMaterial({
        color: d.color,
        emissive: d.color,
        emissiveIntensity: 0.3,
        metalness: 0.8,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = d;
      group.add(mesh);
      return mesh;
    });

    // Ring around the main diamond
    const ringGeo = new THREE.TorusGeometry(1.9, 0.015, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xFFB347, transparent: true, opacity: 0.25 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.35;
    group.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.4, 0.008, 8, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xC084FC, transparent: true, opacity: 0.15 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI * 0.6;
    ring2.rotation.y = Math.PI * 0.2;
    group.add(ring2);

    // Ambient & directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xFFB347, 6, 15);
    goldLight.position.set(3, 3, 4);
    scene.add(goldLight);

    const violetLight = new THREE.PointLight(0xC084FC, 4, 15);
    violetLight.position.set(-4, -2, 3);
    scene.add(violetLight);

    const rimLight = new THREE.DirectionalLight(0xF5C842, 1.5);
    rimLight.position.set(0, 5, -3);
    scene.add(rimLight);

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.008;

      // Smooth mouse-driven tilt
      const targetX = mouseRef.current.y * 0.4;
      const targetY = mouseRef.current.x * 0.4;
      group.rotation.x += (targetX - group.rotation.x) * 0.04;
      group.rotation.y += (targetY + time * 0.15 - group.rotation.y) * 0.04;

      // Main diamond spin
      mainDiamond.rotation.y = time * 0.3;
      mainDiamond.rotation.z = Math.sin(time * 0.5) * 0.1;
      wireDiamond.rotation.copy(mainDiamond.rotation);

      // Orbiting crystals
      crystals.forEach((mesh) => {
        const d = mesh.userData;
        const angle = time * d.speed + d.phase;
        mesh.position.x = Math.cos(angle) * d.distance;
        mesh.position.y = Math.sin(angle * 0.7) * d.distance * 0.4;
        mesh.position.z = Math.sin(angle) * d.distance * 0.5;
        mesh.rotation.x += 0.02;
        mesh.rotation.y += 0.015;
      });

      // Pulsing gold light
      goldLight.intensity = 5 + Math.sin(time * 1.5) * 2;

      ring.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden gradient-bg-hero"
    >
      {/* Three.js Canvas with parallax */}
      <motion.div
        style={{ y: canvasY }}
        className="absolute inset-0 w-full h-full"
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>

      {/* Background gradient layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(255,179,71,0.08) 0%, transparent 65%)' }} />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(192,132,252,0.05) 0%, transparent 60%)' }} />
      </div>

      {/* Scanline grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,179,71,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,179,71,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

      {/* Content with parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-6"
        >
          <span className="font-mono-code text-electric text-xs tracking-[0.4em] uppercase border border-electric/25 px-4 py-2 rounded-full"
            style={{ background: 'rgba(255,179,71,0.05)' }}>
            ⟨ Full Stack Developer · CSE · 2023–2027 /⟩
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <GlitchText
            text="PRASANTH"
            className="block font-display font-bold leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 12rem)', letterSpacing: '-0.04em' }}
            delay={0.7}
          />
        </div>
        <div className="overflow-hidden">
          <GlitchText
            text="ZODIAC"
            className="block font-display font-bold leading-none tracking-tighter text-gradient-brand-zodiac"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 12rem)', letterSpacing: '-0.04em', marginTop: '-0.05em' }}
            delay={0.95}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-8 font-body text-ghost text-lg max-w-lg mx-auto leading-relaxed"
        >
          Architecting immersive digital realities — where raw code meets cosmic artistry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.0 }}
          className="mt-12 flex items-center justify-center gap-5 flex-wrap"
        >
          <button
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            data-hover
            className="relative group px-8 py-4 font-display font-semibold text-sm tracking-widest uppercase text-void rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--gradient-cta-horizontal)',
              boxShadow: ctaHover ? '0 0 50px rgba(251,191,36,0.55), 0 0 100px rgba(245,158,11,0.22)' : '0 0 25px rgba(251,191,36,0.35)',
            }}
          >
            <span className="relative z-10">View Work</span>
            {ctaHover && <div className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: 'var(--gradient-cta-horizontal)' }} />}
          </button>

          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            data-hover
            className="px-8 py-4 font-display font-medium text-sm tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-105"
            style={{
              color: '#FFB347',
              border: '1px solid rgba(255,179,71,0.3)',
              background: 'rgba(255,179,71,0.04)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,179,71,0.7)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,179,71,0.3)'}
          >
            About Me
          </button>

          <a
            href="/resume.pdf"
            download="Prasanth_Zodiac_Resume.pdf"
            data-hover
            className="flex items-center gap-2 px-7 py-4 font-display font-medium text-sm tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-105"
            style={{
              color: '#C084FC',
              border: '1px solid rgba(192,132,252,0.3)',
              background: 'rgba(192,132,252,0.04)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(192,132,252,0.7)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(192,132,252,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(192,132,252,0.3)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Download size={15} />
            Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mt-10 flex items-center justify-center gap-10"
        >
          {[
            { label: 'GitHub', href: 'https://github.com/prasanthzodiac' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/prasanthzodiac' },
            { label: 'Email', href: 'mailto:Prasanthzodiac@gmail.com' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" data-hover
              className="font-mono-code text-xs text-ghost hover:text-electric tracking-widest uppercase transition-colors duration-200 relative group">
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: '#FFB347' }} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono-code text-xs text-ghost tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-14"
          style={{ background: 'linear-gradient(to bottom, #FFB347, transparent)' }}
        />
      </motion.div>
    </section>
  );
}
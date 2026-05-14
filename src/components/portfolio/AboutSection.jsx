import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

export default function AboutSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const leftX = useTransform(scrollYProgress, [0, 0.4], [-80, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.6]);
  const smoothLeft = useSpring(leftX, { stiffness: 60, damping: 20 });
  const smoothRight = useSpring(rightX, { stiffness: 60, damping: 20 });

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

    // Golden dodecahedron
    const geo = new THREE.DodecahedronGeometry(1.1, 0);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xFFB347,
      emissive: 0xCC7700,
      emissiveIntensity: 0.2,
      metalness: 0.95,
      roughness: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const solid = new THREE.Mesh(geo, mat);
    scene.add(solid);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0xFFB347, wireframe: true, transparent: true, opacity: 0.1 });
    const wire = new THREE.Mesh(geo, wireMat);
    scene.add(wire);

    // Inner glowing core
    const innerGeo = new THREE.IcosahedronGeometry(0.45, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xC084FC,
      emissive: 0xC084FC,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.6,
    });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    const l1 = new THREE.PointLight(0xFFB347, 6, 12);
    l1.position.set(3, 3, 3);
    scene.add(l1);
    const l2 = new THREE.PointLight(0xC084FC, 4, 12);
    l2.position.set(-3, -2, 2);
    scene.add(l2);
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    let raf, time = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.006;
      solid.rotation.x += 0.004;
      solid.rotation.y += 0.006;
      wire.rotation.copy(solid.rotation);
      l1.intensity = 5 + Math.sin(time) * 2;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); renderer.dispose(); };
  }, []);

  const stats = [
    { value: '2+', label: 'Years Coding', color: '#FFB347' },
    { value: '10+', label: 'Projects Built', color: '#C084FC' },
    { value: '7.4', label: 'CGPA', color: '#F5C842' },
    { value: '∞', label: 'Drive to Learn', color: '#FFB347' },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(255,179,71,0.04) 0%, transparent 70%)', transform: 'translateY(-50%)' }} />
      </motion.div>

      {/* Data thread line */}
      <div className="absolute left-0 right-0 top-1/2 h-px opacity-[0.08]"
        style={{ background: 'linear-gradient(90deg, transparent, #ea580c 25%, #fbbf24 50%, #fde047 75%, transparent)' }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* 3D Canvas */}
        <motion.div style={{ x: smoothLeft, opacity }} className="order-2 lg:order-1">
          <div className="relative h-[440px] rounded-3xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,179,71,0.1)', backdropFilter: 'blur(24px)' }}>
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, transparent 45%, #08060E 100%)' }} />
            {/* Corner decorations */}
            {[['top-4 left-4', 'border-t border-l'], ['top-4 right-4', 'border-t border-r'],
              ['bottom-4 left-4', 'border-b border-l'], ['bottom-4 right-4', 'border-b border-r']].map(([pos, border], i) => (
              <div key={i} className={`absolute ${pos} w-6 h-6 ${border} opacity-40`}
                style={{ borderColor: i < 2 ? '#FFB347' : '#C084FC' }} />
            ))}
          </div>
        </motion.div>

        {/* Text */}
        <motion.div style={{ x: smoothRight, opacity }} className="order-1 lg:order-2 space-y-8">
          <div>
            <span className="font-mono-code text-electric text-sm tracking-[0.3em] uppercase">
              01 / About
            </span>
            <h2 className="mt-4 font-display font-bold text-5xl md:text-6xl text-white tracking-tight leading-none">
              The <span className="gradient-electric-nebula">Architect</span>
              <br />Behind Code
            </h2>
          </div>

          <p className="font-body text-ghost text-lg leading-relaxed">
            An aspiring Software Engineer with a strong foundation in Computer Science, currently pursuing BE at{' '}
            <span className="text-electric">Dr. Mahalingam College of Engineering and Technology</span>, Pollachi — Anna University.
          </p>
          <p className="font-body text-ghost text-lg leading-relaxed">
            I build robust, full-stack web applications using Java, Python, React, and Node.js — driven by an insatiable curiosity to push what's technically possible and aesthetically extraordinary.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map(({ value, label, color }) => (
              <div key={label}
                className="group rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
                style={{ background: `${color}06`, border: `1px solid ${color}18` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color + '40'}
                onMouseLeave={e => e.currentTarget.style.borderColor = color + '18'}
              >
                <div className="font-display font-bold text-3xl" style={{ color }}>{value}</div>
                <div className="font-mono-code text-xs text-ghost mt-1 tracking-wider uppercase">{label}</div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,179,71,0.04)', border: '1px solid rgba(255,179,71,0.12)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FFB347' }} />
            <span className="font-mono-code text-xs text-ghost">
              Anna University · BE CSE · 2023–2027 · CGPA 7.4
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
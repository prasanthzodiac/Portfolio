import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import TechIconStrip from './TechIconStrip';

// Aurora color palette
const AURORA = {
  teal:   0x00FFD1,
  pink:   0xFF2D78,
  violet: 0x7B5EFF,
  solar:  0xFFE566,
  white:  0xffffff,
};

const SKILLS = [
  { name: 'React',       category: 'Frontend', level: 85, color: '#61DAFB', desc: 'Hooks, component architecture, state management, and full SPA development.' },
  { name: 'Java',        category: 'Backend',  level: 80, color: '#FFB347', desc: 'Core Java, OOP, Spring Boot, data structures and algorithms.' },
  { name: 'Python',      category: 'Backend',  level: 78, color: '#FFE566', desc: 'Scripting, automation, ML integration, and backend APIs.' },
  { name: 'Node.js',     category: 'Backend',  level: 75, color: '#00FFD1', desc: 'REST APIs, middleware, authentication, server-side logic.' },
  { name: 'JavaScript',  category: 'Frontend', level: 82, color: '#FFE566', desc: 'ES6+, async/await, DOM APIs, modern patterns.' },
  { name: 'HTML/CSS',    category: 'Frontend', level: 90, color: '#FF6B6B', desc: 'Semantic HTML5, advanced CSS3, responsive design, animations.' },
  { name: 'SQL / MySQL', category: 'Database', level: 72, color: '#7B5EFF', desc: 'Relational databases, complex queries, joins, indexing.' },
  { name: 'Git',         category: 'Tools',    level: 80, color: '#FF2D78', desc: 'Version control, branching, PRs, collaborative workflows.' },
  { name: 'REST APIs',   category: 'Backend',  level: 78, color: '#00FFD1', desc: 'Designing, building and consuming RESTful APIs.' },
  { name: 'Spring Boot', category: 'Backend',  level: 70, color: '#6DB33F', desc: 'Enterprise Java applications, security, JPA, MVC.' },
];

export default function SkillsSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const titleY  = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const titleOp = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    // ═══ CORE: layered icosahedron nebula ═══
    const makeCore = (size, color, opacity, wire = false) => {
      const g = new THREE.IcosahedronGeometry(size, wire ? 1 : 3);
      const m = new THREE.MeshPhysicalMaterial({
        color, emissive: color, emissiveIntensity: wire ? 0.6 : 0.25,
        metalness: 1, roughness: 0.04,
        transparent: true, opacity,
        wireframe: wire,
      });
      return new THREE.Mesh(g, m);
    };

    const core1 = makeCore(0.55, AURORA.teal,   0.85, false);
    const core2 = makeCore(0.72, AURORA.teal,   0.12, true);
    const core3 = makeCore(0.9,  AURORA.violet, 0.08, true);
    scene.add(core1, core2, core3);

    // ═══ RINGS — multi-tilt orbital paths ═══
    const makeRing = (r, tube, color, opacity, rx, ry, rz = 0) => {
      const g = new THREE.TorusGeometry(r, tube, 12, 180);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.set(rx, ry, rz);
      scene.add(mesh);
      return mesh;
    };

    const rings = [
      makeRing(1.6,  0.007, AURORA.teal,   0.55, Math.PI * 0.2,  0),
      makeRing(2.1,  0.005, AURORA.pink,   0.40, Math.PI * 0.5,  Math.PI * 0.15),
      makeRing(2.6,  0.004, AURORA.violet, 0.30, Math.PI * 0.75, Math.PI * 0.35),
      makeRing(3.1,  0.003, AURORA.solar,  0.18, Math.PI * 0.15, Math.PI * 0.6),
      makeRing(3.5,  0.002, AURORA.teal,   0.10, Math.PI * 0.4,  Math.PI * 0.2),
    ];

    // ═══ SKILL NODES — gem on each ring ═══
    const nodeColors = [AURORA.teal, AURORA.pink, AURORA.violet, AURORA.solar, AURORA.teal,
                        AURORA.pink, AURORA.violet, AURORA.solar, AURORA.teal, AURORA.pink];
    const meshes = SKILLS.map((skill, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const ringR = rings[i % rings.length].geometry.parameters?.radius || (1.6 + (i % 4) * 0.4);
      const hex = nodeColors[i];
      const g = new THREE.OctahedronGeometry(0.18, 0);
      const m = new THREE.MeshPhysicalMaterial({
        color: hex, emissive: hex, emissiveIntensity: 0.7,
        metalness: 0.9, roughness: 0.05,
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.userData = { skill, angle, r: 1.6 + (i % 4) * 0.38 };
      scene.add(mesh);
      return mesh;
    });

    // ═══ PARTICLE NEBULA CLOUD ═══
    const COUNT = 1200;
    const pPositions = new Float32Array(COUNT * 3);
    const pColors    = new Float32Array(COUNT * 3);
    const palette = [[0, 1, 0.82], [1, 0.17, 0.47], [0.48, 0.37, 1], [1, 0.9, 0.4]];
    for (let i = 0; i < COUNT; i++) {
      const r = 1.5 + Math.random() * 2.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.random() * Math.PI;
      pPositions[i*3]   = r * Math.sin(ph) * Math.cos(th);
      pPositions[i*3+1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
      pPositions[i*3+2] = r * Math.cos(ph) * 0.5;
      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i*3] = c[0]; pColors[i*3+1] = c[1]; pColors[i*3+2] = c[2];
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.018, vertexColors: true, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ═══ LIGHTS ═══
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const lights = [
      { color: AURORA.teal,   pos: [4, 4, 5],   i: 8 },
      { color: AURORA.pink,   pos: [-4, -3, 4],  i: 6 },
      { color: AURORA.violet, pos: [0, 5, -3],   i: 4 },
      { color: AURORA.solar,  pos: [-3, 2, 5],   i: 3 },
    ].map(({ color, pos, i }) => {
      const l = new THREE.PointLight(color, i, 18);
      l.position.set(...pos);
      scene.add(l);
      return l;
    });

    // Raycaster for click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(meshes);
      setSelected(hits.length > 0 ? hits[0].object.userData.skill : null);
    };
    canvas.addEventListener('click', onCanvasClick);

    // Mouse tilt
    const mouseTilt = { x: 0, y: 0 };
    const onMove = (e) => {
      mouseTilt.x = (e.clientX / window.innerWidth  - 0.5) * 0.6;
      mouseTilt.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', onMove);

    let time = 0, raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.005;

      // Tilt whole scene with mouse
      scene.rotation.y += (mouseTilt.x - scene.rotation.y) * 0.03;
      scene.rotation.x += (-mouseTilt.y - scene.rotation.x) * 0.03;

      // Core spin
      core1.rotation.y += 0.008; core1.rotation.x += 0.003;
      core2.rotation.y -= 0.01;  core2.rotation.z += 0.005;
      core3.rotation.x += 0.006; core3.rotation.z -= 0.007;

      // Ring spins — each at different speeds/axes
      rings[0].rotation.z += 0.006;
      rings[1].rotation.z -= 0.004;
      rings[2].rotation.z += 0.003;  rings[2].rotation.x += 0.001;
      rings[3].rotation.z -= 0.005;  rings[3].rotation.y += 0.002;
      rings[4].rotation.z += 0.002;

      // Nodes orbit
      meshes.forEach((m, i) => {
        const speed = 0.2 + (i % 3) * 0.08;
        const angle = m.userData.angle + time * speed;
        const r = m.userData.r;
        const tilt = (i % 2 === 0 ? 1 : -1) * 0.5;
        m.position.set(
          Math.cos(angle) * r,
          Math.sin(angle * 0.8) * r * 0.35 + Math.sin(time * 0.5 + i) * 0.15,
          Math.sin(angle + tilt) * r * 0.55,
        );
        m.rotation.x += 0.02; m.rotation.y += 0.015;
        // Pulse emissive
        m.material.emissiveIntensity = 0.5 + Math.sin(time * 2 + i * 0.8) * 0.3;
      });

      // Particles drift
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;

      // Light flicker
      lights[0].intensity = 7 + Math.sin(time * 1.3) * 2.5;
      lights[1].intensity = 5 + Math.sin(time * 0.9 + 1) * 2;
      lights[2].intensity = 3 + Math.sin(time * 1.7 + 2) * 1.5;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('click', onCanvasClick);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      {/* Aurora bg glow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,255,209,0.06) 0%, rgba(123,94,255,0.04) 40%, transparent 70%)' }} />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(255,45,120,0.05) 0%, transparent 65%)' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div style={{ y: titleY, opacity: titleOp }} className="text-center mb-6">
          <span className="font-mono-code text-electric text-sm tracking-[0.3em] uppercase">02 / Tech Stack</span>
          <h2 className="mt-4 font-display font-bold text-5xl md:text-6xl text-white tracking-tight">
            The <span className="gradient-electric-nebula">Knowledge</span> Sphere
          </h2>
          <p className="mt-3 font-body text-ghost max-w-md mx-auto text-sm">
            Click any orbiting crystal · hover to pause the stream below
          </p>
        </motion.div>

        {/* ═══ FLOATING TECH ICON STRIP ═══ */}
        <div className="mb-12">
          <TechIconStrip />
        </div>

        {/* ═══ 3D + PANEL ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Orrery */}
          <div className="lg:col-span-2">
            <div className="relative h-[520px] rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(5,5,16,0.6)',
                border: '1px solid rgba(0,255,209,0.1)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 0 80px rgba(0,255,209,0.04), 0 0 120px rgba(123,94,255,0.03)',
              }}>
              <canvas ref={canvasRef} className="w-full h-full" />
              {/* Vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 35%, #050510 90%)' }} />
              {/* Scanline */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0,255,209,0.5) 1px, transparent 1px)',
                  backgroundSize: '100% 4px',
                }} />
              {/* Corner brackets */}
              {[['top-4 left-4','border-t border-l'],['top-4 right-4','border-t border-r'],
                ['bottom-4 left-4','border-b border-l'],['bottom-4 right-4','border-b border-r']].map(([pos, b], i) => (
                <div key={i} className={`absolute ${pos} w-7 h-7 ${b} opacity-40`}
                  style={{ borderColor: i < 2 ? '#00FFD1' : '#FF2D78' }} />
              ))}
              {/* HUD label */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 font-mono-code text-xs text-electric opacity-30 tracking-[0.4em] uppercase">
                Skill Matrix v2.0
              </div>
            </div>
          </div>

          {/* Panel */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div key={selected.name}
                  initial={{ opacity: 0, y: 15, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                  className="rounded-2xl p-6 space-y-4 mb-3"
                  style={{
                    background: `${selected.color}0A`,
                    border: `1px solid ${selected.color}30`,
                    backdropFilter: 'blur(24px)',
                    boxShadow: `0 0 40px ${selected.color}12`,
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full animate-aurora-pulse"
                      style={{ background: selected.color, boxShadow: `0 0 14px ${selected.color}` }} />
                    <span className="font-mono-code text-xs tracking-widest uppercase text-ghost">{selected.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">{selected.name}</h3>
                  <p className="font-body text-ghost text-sm leading-relaxed">{selected.desc}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono-code text-xs">
                      <span className="text-ghost">PROFICIENCY</span>
                      <span style={{ color: selected.color }}>{selected.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${selected.level}%` }}
                        transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${selected.color}, #ffffff88)` }} />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="rounded-2xl p-6 text-center mb-3"
                  style={{ background: 'rgba(0,255,209,0.02)', border: '1px solid rgba(0,255,209,0.08)' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                    className="text-3xl mb-3 inline-block">⬡</motion.div>
                  <p className="font-mono-code text-xs text-ghost tracking-widest">CLICK A CRYSTAL NODE</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skill list */}
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#00FFD1 transparent' }}>
              {SKILLS.map(skill => {
                const active = selected?.name === skill.name;
                return (
                  <button key={skill.name} data-hover
                    onClick={() => setSelected(active ? null : skill)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      background: active ? `${skill.color}10` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${active ? skill.color + '40' : 'rgba(255,255,255,0.05)'}`,
                      boxShadow: active ? `0 0 20px ${skill.color}15` : 'none',
                    }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full transition-all"
                        style={{ background: skill.color, boxShadow: active ? `0 0 10px ${skill.color}` : 'none' }} />
                      <span className="font-display text-sm text-white">{skill.name}</span>
                      <span className="font-mono-code text-xs text-ghost">{skill.category}</span>
                    </div>
                    <span className="font-mono-code text-xs" style={{ color: skill.color }}>{skill.level}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
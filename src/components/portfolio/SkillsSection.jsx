import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import TechIconStrip from './TechIconStrip';
import { 
  SiReact, SiThreedotjs, SiFramer, SiTailwindcss, SiJavascript, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiSpringboot, SiPython, SiJsonwebtokens, SiMysql,
  SiMongodb, SiRedis, SiGit, SiGithub, SiPostman, SiVite, SiNpm,
  SiGnubash, SiWeb3Dotjs, SiC, SiJupyter
} from 'react-icons/si';
import { FaJava, FaDatabase, FaCode, FaBrain } from 'react-icons/fa';

// Hubtown Pro Max palette
const AURORA = {
  teal:   0x0088FF,
  pink:   0x2563EB,
  violet: 0x0A192F,
  solar:  0x0088FF,
  white:  0xffffff,
};

const SKILLS = [
  { id: 'react', label: 'React', category: 'frontend', icon: SiReact },
  { id: 'three', label: 'Three.js', category: 'frontend', icon: SiThreedotjs },
  { id: 'framer', label: 'Framer Motion', category: 'frontend', icon: SiFramer },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend', icon: SiTailwindcss },
  { id: 'js', label: 'JavaScript', category: 'frontend', icon: SiJavascript },
  { id: 'html', label: 'HTML5', category: 'frontend', icon: SiHtml5 },
  { id: 'css', label: 'CSS3', category: 'frontend', icon: SiCss },
  
  { id: 'node', label: 'Node.js', category: 'backend', icon: SiNodedotjs },
  { id: 'express', label: 'Express', category: 'backend', icon: SiExpress },
  { id: 'java', label: 'Java', category: 'backend', icon: FaJava },
  { id: 'spring', label: 'Spring Boot', category: 'backend', icon: SiSpringboot },
  { id: 'python', label: 'Python', category: 'backend', icon: SiPython },
  { id: 'rest', label: 'REST APIs', category: 'backend', icon: FaCode },
  { id: 'jwt', label: 'JWT Auth', category: 'backend', icon: SiJsonwebtokens },
  
  { id: 'mysql', label: 'MySQL', category: 'database', icon: SiMysql },
  { id: 'mongo', label: 'MongoDB', category: 'database', icon: SiMongodb },
  { id: 'redis', label: 'Redis', category: 'database', icon: SiRedis },
  
  { id: 'git', label: 'Git', category: 'tools', icon: SiGit },
  { id: 'github', label: 'GitHub', category: 'tools', icon: SiGithub },
  { id: 'postman', label: 'Postman', category: 'tools', icon: SiPostman },
  { id: 'vite', label: 'Vite', category: 'tools', icon: SiVite },
  { id: 'npm', label: 'NPM/Yarn', category: 'tools', icon: SiNpm },
  
  { id: 'ml', label: 'Machine Learning', category: 'other', icon: FaBrain },
  { id: 'web3', label: 'Web3', category: 'other', icon: SiWeb3Dotjs },
  { id: 'oop', label: 'OOP Concepts', category: 'other', icon: FaCode },
  { id: 'ds', label: 'Data Structures', category: 'other', icon: FaDatabase },
  { id: 'algorithms', label: 'Algorithms', category: 'other', icon: SiGnubash },
  { id: 'c', label: 'C Programming', category: 'other', icon: SiC },
];

export default function SkillsSection() {
  const mountRef = useRef(null);
  const sectionRef = useRef(null);
  const iconRefs = useRef([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const sphereY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    
    // Setup Three.js scene strictly for calculating 3D positions
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 26;

    const group = new THREE.Group();
    scene.add(group);

    // Inner wireframe sphere
    const coreGeo = new THREE.IcosahedronGeometry(8, 2);
    // Use an invisible material since we only want to project coordinates, 
    // but wait, if we don't render, we don't need a renderer! 
    // Actually, keeping the wireframe adds a nice tech background to the floating logos.
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.pointerEvents = 'none'; // Let HTML take hovers
    // Double drop-shadow for a super intense neon glow effect
    renderer.domElement.style.filter = 'drop-shadow(0 0 15px rgba(0, 136, 255, 0.9)) drop-shadow(0 0 40px rgba(0, 136, 255, 0.5))'; 

    // Increased opacity from 0.15 to 0.6 so the wireframe lines are solid neon tubes
    const coreMat = new THREE.MeshBasicMaterial({ color: AURORA.teal, wireframe: true, transparent: true, opacity: 0.6 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const nodes = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    SKILLS.forEach((skill, i) => {
      const y = 1 - (i / (SKILLS.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const r = 11 + (Math.random() * 2 - 1);
      
      // We don't need visible meshes, just 3D anchors
      const anchor = new THREE.Object3D();
      anchor.position.set(x * r, y * r, z * r);
      group.add(anchor);
      nodes.push(anchor);
    });

    let raf;
    let time = 0;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.002;

      // Smooth interpolation for mouse interaction
      targetX = THREE.MathUtils.lerp(targetX, mouseX, 0.05);
      targetY = THREE.MathUtils.lerp(targetY, mouseY, 0.05);

      // Rotate the group based on time and cursor position
      group.rotation.y = time + targetX * 0.5;
      group.rotation.x = Math.sin(time * 0.5) * 0.2 + targetY * 0.5;

      const w = container.clientWidth;
      const h = container.clientHeight;

      // Project 3D anchors to 2D HTML elements
      const worldPos = new THREE.Vector3();
      nodes.forEach((node, i) => {
        const el = iconRefs.current[i];
        if (!el) return;

        // Get actual 3D world position BEFORE projection
        node.getWorldPosition(worldPos);
        const depth = worldPos.z; // Ranges from roughly -12 to +12
        
        // Now project to 2D screen space
        worldPos.project(camera);

        const x = (worldPos.x * 0.5 + 0.5) * w;
        const y = (-(worldPos.y * 0.5) + 0.5) * h;
        
        // Linear depth mapping based on physical Z coordinate
        const normalizedDepth = Math.max(0, Math.min(1, (depth + 12) / 24)); // 0 (back) to 1 (front)
        
        const scale = 0.5 + (normalizedDepth * 0.7); // Scale from 0.5 to 1.2
        const elementOpacity = 0.15 + (normalizedDepth * 0.85); // Opacity from 0.15 to 1.0
        const zIndex = Math.round(normalizedDepth * 100);

        // Direct DOM manipulation for maximum performance
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = elementOpacity;
        el.style.zIndex = zIndex;
      });

      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden bg-transparent">
      {/* Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="vertical-line left-[10%]" />
        <div className="vertical-line right-[10%]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div style={{ opacity }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/5 pb-12">
          <div>
            <span className="font-mono text-electric text-[10px] tracking-mega-wide uppercase">03 / Technologies</span>
            <h2 className="mt-6 font-display font-bold text-5xl md:text-7xl text-white tracking-widest uppercase leading-[1.1]">
              KNOWLEDGE <span className="text-ghost">SPHERE</span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-xs">
            <p className="font-mono text-[10px] tracking-mega-wide text-ghost uppercase leading-relaxed">
              Interact with the sphere. Hover over any technology node to identify the specific framework or language.
            </p>
          </div>
        </motion.div>

        <div className="relative w-full h-[600px] flex items-center justify-center">
          <motion.div style={{ y: sphereY }} className="absolute inset-0 flex justify-center items-center">
            
            {/* Massive Glowing Ambient Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[600px] max-h-[600px] bg-electric/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen z-0" />
            
            {/* The WebGL Canvas and HTML Overlay Container */}
            <div ref={mountRef} className="w-full max-w-[800px] aspect-square relative z-10">
              
              {/* HTML Overlay for Logos */}
              {SKILLS.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.id}
                    ref={el => iconRefs.current[i] = el}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="absolute top-0 left-0 flex items-center justify-center cursor-pointer transition-colors duration-300"
                    style={{ 
                      width: '48px', 
                      height: '48px',
                      color: hoveredSkill?.id === skill.id ? '#0088FF' : '#E2E8F0',
                      filter: hoveredSkill?.id === skill.id ? 'drop-shadow(0 0 10px rgba(0, 136, 255, 0.8))' : 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))',
                    }}
                  >
                    <Icon size={32} />
                  </div>
                );
              })}
            </div>
            
            {/* Background ring */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-[600px] h-[600px] rounded-full border border-white/5" />
            </div>
          </motion.div>

          <AnimatePresence>
            {hoveredSkill && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 text-center bg-transparent backdrop-blur-md px-10 py-6 border border-electric/30 shadow-[0_0_50px_rgba(0,136,255,0.3)]"
              >
                <div className="font-mono text-[10px] tracking-mega-wide text-electric uppercase mb-3 flex items-center justify-center gap-3">
                  <span className="w-4 h-px bg-electric/50" />
                  {hoveredSkill.category}
                  <span className="w-4 h-px bg-electric/50" />
                </div>
                <div className="font-display font-bold text-4xl text-white tracking-widest uppercase flex items-center justify-center gap-4">
                  {React.createElement(hoveredSkill.icon, { size: 36, className: "text-electric" })}
                  {hoveredSkill.label}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="relative z-20 mt-16 border-t border-white/5 pt-8 bg-transparent">
         <TechIconStrip />
      </div>
    </section>
  );
}
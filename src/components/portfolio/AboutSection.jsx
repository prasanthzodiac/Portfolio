import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

export default function AboutSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const leftX = useTransform(scrollYProgress, [0, 0.4], [-80, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);
  const smoothLeft = useSpring(leftX, { stiffness: 60, damping: 20 });
  const smoothRight = useSpring(rightX, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // Hubtown style abstract geometry - clean and premium
    const geo = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x0088FF,
      emissive: 0x002244,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    // Inner solid core
    const coreGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0088FF,
      emissive: 0x0088FF,
      emissiveIntensity: 2.5, // Cranked up for maximum 3D brightness
      roughness: 0.2,
      metalness: 0.8,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const l1 = new THREE.PointLight(0x0088FF, 50, 20); // Massive internal light burst
    l1.position.set(0, 0, 0); // Placed perfectly inside the sphere
    scene.add(l1);

    const l2 = new THREE.PointLight(0x2563EB, 8, 15);
    l2.position.set(-4, -4, 2);
    scene.add(l2);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let raf, time = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.003;
      
      // Smooth interpolation for mouse movement
      targetX = THREE.MathUtils.lerp(targetX, mouseX, 0.05);
      targetY = THREE.MathUtils.lerp(targetY, mouseY, 0.05);

      // Combine base rotation with mouse interaction
      knot.rotation.x = time + targetY * 0.8;
      knot.rotation.y = time * 0.8 + targetX * 0.8;
      
      core.rotation.x = targetY * 0.4;
      core.rotation.y = -time * 0.5 + targetX * 0.4;
      
      // Shift the intense internal light slightly based on cursor
      l1.position.x = targetX * 1.5;
      l1.position.y = targetY * 1.5;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    const handleResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener('resize', handleResize); 
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose(); 
    };
  }, []);

  const stats = [
    { value: '2+', label: 'Years Coding' },
    { value: '10+', label: 'Projects Built' },
    { value: '7.4', label: 'CGPA Score' },
    { value: '∞', label: 'Drive to Learn' },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 overflow-hidden bg-transparent">
      {/* Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="vertical-line left-[10%]" />
        <div className="vertical-line left-[50%]" />
        <div className="vertical-line right-[10%]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Text */}
        <motion.div style={{ x: smoothLeft, opacity }} className="order-2 lg:order-1 space-y-12">
          <div>
            <span className="font-mono text-electric text-[10px] tracking-mega-wide uppercase">01 / Profile</span>
            <h2 className="mt-6 font-display font-bold text-5xl md:text-7xl text-white tracking-widest uppercase leading-[1.1]">
              The <span className="text-electric">Architect</span>
              <br />Behind Code
            </h2>
          </div>

          <div className="space-y-6">
            <p className="font-body text-ghost text-lg leading-relaxed font-light">
              An aspiring Software Engineer with a strong foundation in Computer Science, currently pursuing BE at{' '}
              <span className="text-white font-medium">Dr. Mahalingam College of Engineering and Technology</span>, Anna University.
            </p>
            <p className="font-body text-ghost text-lg leading-relaxed font-light">
              I build robust, full-stack web applications using Java, Python, React, and Node.js. Driven by an insatiable curiosity to push what's technically possible and aesthetically extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
            {stats.map(({ value, label }) => (
              <div key={label} className="group">
                <div className="font-display font-bold text-4xl text-ice">{value}</div>
                <div className="font-mono text-[10px] text-ghost mt-2 tracking-mega-wide uppercase">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3D Canvas / Visual */}
        <motion.div style={{ x: smoothRight, opacity }} className="order-1 lg:order-2 flex justify-end">
          <div className="relative w-full max-w-lg aspect-square">
            <div className="absolute inset-0 border border-white/5 rounded-full" />
            <div className="absolute inset-4 border border-white/5 rounded-full" />
            {/* Intense Centered Glow Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-electric blur-[60px] opacity-100 rounded-full pointer-events-none mix-blend-screen" />
            <canvas ref={canvasRef} className="w-full h-full absolute inset-0 z-10 drop-shadow-[0_0_40px_rgba(0,136,255,1)]" />
            
            {/* Decorative crosshairs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-electric" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 bg-electric" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-electric" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-px bg-electric" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
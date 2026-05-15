import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlobalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040A, 0.02); // Deep navy fog matching the site

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    // --- Star Light Effects ---
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 1500; // More particles for global effect
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60; // Wide spread
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create an elegant, glowing dot
    const createCircleTexture = () => {
      const size = 64;
      const tCanvas = document.createElement('canvas');
      tCanvas.width = size;
      tCanvas.height = size;
      const context = tCanvas.getContext('2d');
      const gradient = context.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(tCanvas);
    };

    const particlesMat = new THREE.PointsMaterial({
      size: 0.15,
      map: createCircleTexture(),
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Mouse parallax variables
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let raf, time = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.001; // Ultra slow and smooth time progression

      // Smooth, slow movement upwards
      const positions = particlesMesh.geometry.attributes.position.array;
      for(let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += 0.005; // Extremely slow vertical movement
        if (positions[i3 + 1] > 30) {
          positions[i3 + 1] = -30; // Reset smoothly
        }
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      
      // Global slow rotation
      particlesMesh.rotation.y = time * 0.05;
      particlesMesh.rotation.x = time * 0.02;

      // Extremely subtle mouse parallax
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-void">
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
    </div>
  );
}

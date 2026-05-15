import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../../lib/sound';

export default function ScrambleText({ text }) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) {
      const duration = text.length * 0.05 * 1000;
      const interval = setInterval(() => {
        soundManager.playTypewriter();
      }, 50);
      
      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isHovering, text]);

  return (
    <span
      className="inline-flex relative whitespace-nowrap"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="invisible">{text}</span>
      <motion.span 
        className="absolute top-0 left-0 bottom-0 overflow-hidden whitespace-nowrap flex text-left"
        initial={{ width: "100%" }}
        animate={{ width: isHovering ? ["0%", "100%"] : "100%" }}
        transition={isHovering ? { duration: text.length * 0.05, ease: "linear" } : { duration: 0 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

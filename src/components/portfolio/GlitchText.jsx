import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

export default function GlitchText({ text, className, style, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let started = false;
    const startDelay = setTimeout(() => {
      started = true;
      let iteration = 0;
      const totalFrames = text.length * 6;

      const interval = setInterval(() => {
        const resolved = Math.floor(iteration / 6);
        const newText = text
          .split('')
          .map((char, idx) => {
            if (idx < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
        setDisplayed(newText);
        iteration++;
        if (iteration >= totalFrames + 10) {
          clearInterval(interval);
          setDisplayed(text);
          setDone(true);
        }
      }, 40);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [text, delay]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className={className}
      style={style}
    >
      {displayed || text.replace(/./g, '\u00A0')}
    </motion.span>
  );
}
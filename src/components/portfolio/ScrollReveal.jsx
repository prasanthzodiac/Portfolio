import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollReveal — wraps any child with a scroll-triggered entrance animation.
 *
 * variant options:
 *   'fade'        — pure opacity fade in
 *   'slide-up'    — slides up + fades (default)
 *   'slide-left'  — slides from left + fades
 *   'slide-right' — slides from right + fades
 *   'scale'       — scales up from 94% + fades
 *   'blur'        — blurs in from filter: blur(12px)
 */

const VARIANTS = {
  'fade': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 52 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-down': {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  'scale': {
    hidden: { opacity: 0, scale: 0.93 },
    visible: { opacity: 1, scale: 1 },
  },
  'blur': {
    hidden: { opacity: 0, filter: 'blur(14px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
};

export default function ScrollReveal({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 0.85,
  className = '',
  once = true,
  threshold = 0.12,
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: '0px 0px -8% 0px' }}
      variants={VARIANTS[variant] || VARIANTS['slide-up']}
      style={{ willChange: 'transform, opacity' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
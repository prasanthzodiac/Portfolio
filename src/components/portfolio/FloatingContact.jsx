import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, X } from 'lucide-react';

const actions = [
  { icon: Mail, label: 'Email', href: 'mailto:Prasanthzodiac@gmail.com', color: '#0088FF' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/prasanthzodiac', color: '#BF5AF2' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/prasanthzodiac', color: '#0088FF' },
  { icon: Phone, label: 'Phone', href: 'tel:+919080478462', color: '#FF6B35' },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && actions.map((action, i) => (
          <motion.a
            key={action.label}
            href={action.href}
            target={action.href.startsWith('http') ? '_blank' : undefined}
            rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 group"
            style={{
              background: 'rgba(3,0,20,0.9)',
              border: `1px solid ${action.color}25`,
              backdropFilter: 'blur(20px)',
            }}
            data-hover
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${action.color}12` }}>
              <action.icon size={16} style={{ color: action.color }} />
            </div>
            <span className="font-mono-code text-xs text-white tracking-wider">{action.label}</span>
          </motion.a>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 ${open ? 'rounded-2xl' : 'rounded-full'} flex items-center justify-center transition-all duration-300 relative overflow-hidden`}
        style={{
          background: open
            ? 'rgba(3,0,20,0.9)'
            : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, rgba(0,136,255,0.3) 60%, rgba(191,90,242,0.2) 100%)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          border: open ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.5)',
          boxShadow: open 
            ? 'none' 
            : 'inset 0 4px 10px rgba(255,255,255,0.6), inset 0 -4px 15px rgba(0,136,255,0.5), 0 10px 30px rgba(0,136,255,0.4), 0 20px 60px rgba(191,90,242,0.2)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-hover
      >
        {open ? (
          <X size={20} className="text-white" />
        ) : (
          <Mail size={20} className="text-[#030014]" />
        )}
      </motion.button>
    </div>
  );
}
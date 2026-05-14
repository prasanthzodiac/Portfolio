import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Github, Linkedin, MessageSquare } from 'lucide-react';

const LINKS = [
  { icon: Mail, label: 'Email', href: 'mailto:Prasanthzodiac@gmail.com', color: '#FFB347' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/prasanthzodiac', color: '#C084FC' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/prasanthzodiac', color: '#F5C842' },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[9990] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <>
            {LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-hover
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.25, delay: (LINKS.length - 1 - i) * 0.06 }}
                  className="group flex items-center gap-3"
                >
                  {/* Label */}
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: (LINKS.length - 1 - i) * 0.06 + 0.1 }}
                    className="font-mono-code text-xs px-3 py-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(8,6,14,0.9)', border: `1px solid ${link.color}40` }}
                  >
                    {link.label}
                  </motion.span>

                  {/* Icon button */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: `${link.color}15`,
                      border: `1px solid ${link.color}50`,
                      backdropFilter: 'blur(12px)',
                      boxShadow: `0 4px 20px ${link.color}25`,
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 30px ${link.color}60`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = `0 4px 20px ${link.color}25`}
                  >
                    <Icon size={18} style={{ color: link.color }} />
                  </div>
                </motion.a>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        data-hover
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: open
            ? 'rgba(255,255,255,0.08)'
            : 'linear-gradient(90deg, #ea580c, #fbbf24, #fde047)',
          border: open ? '1px solid rgba(255,255,255,0.15)' : 'none',
          boxShadow: open ? 'none' : '0 0 30px rgba(255,179,71,0.5), 0 0 60px rgba(255,179,71,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={20} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare size={20} className="text-void" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(255,179,71,0.5)' }}
          />
        )}
      </motion.button>

      {/* Tooltip when closed */}
      {!open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-16 bottom-3 font-mono-code text-xs text-ghost whitespace-nowrap pointer-events-none"
        >
          Contact me
        </motion.div>
      )}
    </div>
  );
}
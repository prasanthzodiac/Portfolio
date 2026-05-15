import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LiquidEffectAnimation({ isActive, originX, originY }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 100 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed z-[99999] pointer-events-none rounded-full"
          style={{ 
            left: originX - 50,
            top: originY - 50,
            width: 100,
            height: 100,
            // Dynamically change the liquid edge color based on the current section.
            // If we are currently on the Editor side, splash with Honey Golden. Otherwise, Electric Blue.
            background: `radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, ${
              typeof window !== 'undefined' && window.location.pathname.includes('editor')
                ? 'rgba(229,168,35,0.9)'
                : 'rgba(0,136,255,0.9)'
            } 80%, rgba(0,0,0,0) 100%)`,
            willChange: "transform" // Forces GPU compositing for flawless 60+ FPS
          }}
        />
      )}
    </AnimatePresence>
  );
}

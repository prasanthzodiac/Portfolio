import React from 'react';

export default function FooterSection() {
  return (
    <footer className="w-full py-8 mt-12 border-t border-white/5 relative z-10 bg-transparent flex flex-col items-center justify-center">
      <div className="flex items-center justify-center mb-4">
        <span className="font-display font-bold text-lg md:text-xl tracking-super-wide text-white uppercase">
          PRASANTH<span className="text-electric">.</span>
        </span>
      </div>
      <p className="font-mono text-[10px] text-ghost tracking-mega-wide uppercase text-center max-w-sm px-6">
        © {new Date().getFullYear()} Prasanth S. All Rights Reserved.
      </p>
    </footer>
  );
}

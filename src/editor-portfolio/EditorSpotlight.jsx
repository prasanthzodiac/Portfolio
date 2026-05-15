import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowLeft, ArrowRight } from 'lucide-react';

const portfolioData = {
  'Short Form': [
    { id: 'sf1', title: 'AI TOOL FOR STUDENTS', subtitle: 'DOPE MOTION', gradient: 'from-purple-900 to-[#0A0A0F]', aspect: 'aspect-[9/16]' },
    { id: 'sf2', title: 'EDIT 10X FASTER', subtitle: 'DOPE MOTION', gradient: 'from-blue-900 to-[#0A0A0F]', aspect: 'aspect-[9/16]' },
    { id: 'sf3', title: "MR BEAST'S SECRET", subtitle: 'YOUTUBE SECRET', gradient: 'from-[#0A2A4A] to-[#0A0A0F]', aspect: 'aspect-[9/16]' },
    { id: 'sf4', title: 'VIRAL HOOKS', subtitle: 'SOCIAL GROWTH', gradient: 'from-red-900 to-[#0A0A0F]', aspect: 'aspect-[9/16]' },
    { id: 'sf5', title: 'MONEY MATRIX', subtitle: 'FINANCE TIPS', gradient: 'from-green-900 to-[#0A0A0F]', aspect: 'aspect-[9/16]' },
  ],
  'Long Form': [
    { id: 'lf1', title: 'DOCUMENTARY CUT', subtitle: 'ORIGINAL SERIES', gradient: 'from-[#1A1A1A] to-[#0A0A0F]', aspect: 'aspect-[16/9]' },
    { id: 'lf2', title: 'PODCAST VISUALS', subtitle: 'GUEST INTERVIEW', gradient: 'from-[#2A1A0A] to-[#0A0A0F]', aspect: 'aspect-[16/9]' },
    { id: 'lf3', title: 'TECH REVIEW', subtitle: 'IN-DEPTH LOOK', gradient: 'from-[#0A1A2A] to-[#0A0A0F]', aspect: 'aspect-[16/9]' },
    { id: 'lf4', title: 'TRAVEL VLOG', subtitle: 'CINEMATIC', gradient: 'from-orange-900 to-[#0A0A0F]', aspect: 'aspect-[16/9]' },
  ],
  'Ads & VSL': [
    { id: 'ad1', title: 'PRODUCT LAUNCH', subtitle: 'CONVERSION AD', gradient: 'from-[#2A0A1A] to-[#0A0A0F]', aspect: 'aspect-[16/9]' },
    { id: 'ad2', title: 'UGC CAMPAIGN', subtitle: 'TIKTOK AD', gradient: 'from-[#0A2A1A] to-[#0A0A0F]', aspect: 'aspect-[9/16]' },
    { id: 'ad3', title: 'MASTERCLASS VSL', subtitle: 'LEAD GEN', gradient: 'from-[#2A2A0A] to-[#0A0A0F]', aspect: 'aspect-[16/9]' },
  ]
};

const categories = ['Short Form', 'Long Form', 'Ads & VSL'];

export default function EditorSpotlight() {
  const [activeCategory, setActiveCategory] = useState('Short Form');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItems = portfolioData[activeCategory];
  const itemsToShow = 3;

  const handleNext = () => {
    if (currentIndex + itemsToShow < currentItems.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const visibleItems = currentItems.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <section id="spotlight" className="relative z-10 max-w-7xl mx-auto px-6 py-24 mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 editor-font-display tracking-wide">Featured Work</h2>
          <p className="text-slate-400 text-base md:text-lg normal-case" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            A glimpse into our recent editing work and collaborations
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-[#E5A823] text-black hover:scale-105' 
                : 'border border-white/30 text-white font-medium hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory + currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 mb-12 ${
              activeCategory === 'Short Form' ? 'grid-cols-1 md:grid-cols-3' :
              activeCategory === 'Long Form' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
              'grid-cols-1 md:grid-cols-3'
            }`}
          >
            {visibleItems.map((work, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                key={work.id} 
                className={`relative ${work.aspect} rounded-3xl overflow-hidden bg-gradient-to-b ${work.gradient} flex items-center justify-center group cursor-pointer border border-white/10`}
              >
                {/* Play Button */}
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300 z-20">
                  <Play className="text-white fill-white ml-1" size={24} />
                </div>
                
                {/* Mock Content Text inside thumbnail */}
                <div className="absolute inset-x-0 top-1/4 text-center z-10 px-6 opacity-30 pointer-events-none flex justify-center">
                  <h3 className="text-white font-black text-3xl md:text-4xl lg:text-5xl uppercase italic tracking-tighter leading-tight transform -rotate-3 overflow-visible px-2 py-4">
                    {work.title}
                  </h3>
                </div>

                <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                  <h3 className="text-white font-black text-xs md:text-sm uppercase tracking-wider opacity-90 drop-shadow-md">{work.subtitle}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            currentIndex === 0 
            ? 'border border-white/10 text-white/30 cursor-not-allowed' 
            : 'border border-white/30 text-white hover:bg-white/10'
          }`}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <button 
          onClick={handleNext}
          disabled={currentIndex + itemsToShow >= currentItems.length}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            currentIndex + itemsToShow >= currentItems.length 
            ? 'bg-[#E5A823]/50 text-black/50 cursor-not-allowed' 
            : 'bg-[#E5A823] text-black hover:bg-[#E5A823]/90 hover:scale-105'
          }`}
        >
          <ArrowRight size={20} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}

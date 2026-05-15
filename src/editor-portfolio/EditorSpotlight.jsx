import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import FeaturedWorkBanner from './FeaturedWorkBanner';
import { portfolioData, spotlightCategories } from './featuredWorkBanners';

export default function EditorSpotlight() {
  const [activeCategory, setActiveCategory] = useState('Short Form');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItems = portfolioData[activeCategory];
  const itemsToShow = activeCategory === 'Short Form' ? 4 : 3;

  const handleNext = () => {
    if (currentIndex + itemsToShow < currentItems.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const visibleItems = currentItems.slice(currentIndex, currentIndex + itemsToShow);

  const gridClass =
    activeCategory === 'Short Form'
      ? 'grid-cols-2 lg:grid-cols-4'
      : activeCategory === 'Long Form'
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-2 lg:grid-cols-3';

  return (
    <section id="spotlight" className="relative z-10 max-w-7xl mx-auto px-6 py-24 mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 editor-font-display tracking-wide">Featured Work</h2>
          <p
            className="text-slate-400 text-base md:text-lg normal-case"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            A glimpse into our recent editing work and collaborations
          </p>
        </div>
        <motion.div className="flex flex-wrap items-center gap-3">
          {spotlightCategories.map((cat) => (
            <button
              key={cat}
              type="button"
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
        </motion.div>
      </div>

      <div className="min-h-[420px] md:min-h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`grid gap-4 md:gap-5 mb-12 ${gridClass}`}
          >
            {visibleItems.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <FeaturedWorkBanner work={work} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div className="flex justify-center gap-4">
        <button
          type="button"
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
          type="button"
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
      </motion.div>
    </section>
  );
}

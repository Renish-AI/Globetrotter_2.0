import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroContentProps {
  onExploreClick: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onExploreClick }) => {
  return (
    <div className="flex flex-col items-start text-left max-w-xl z-20" id="hero-content-section">
      {/* Top Glassmorphic Pill: [New] Travel Beyond Expectations */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id="hero-badge"
        className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-2 py-1.5 rounded-full mb-6 shadow-sm hover:bg-white/15 transition-all select-none"
      >
        <span 
          id="hero-badge-pill"
          className="bg-white text-[#11161d] text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm"
        >
          New
        </span>
        <span 
          id="hero-badge-text"
          className="text-white/90 text-xs sm:text-sm font-medium tracking-wide pr-2.5"
        >
          Travel Beyond Expectations
        </span>
      </motion.div>

      {/* Main Display Script Headline: Travel Beyond the Ordinary */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        id="hero-headline"
        className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.12] text-white tracking-normal mb-5 drop-shadow-sm select-none"
      >
        Travel Beyond the Ordinary
      </motion.h1>

      {/* Description Paragraph */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        id="hero-description"
        className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-normal"
      >
        Explore extraordinary places, compare travel options, and uncover experiences that match your travel style. Travel smarter, discover more, and make every moment count.
      </motion.p>

      {/* Explore Destinations Pill Button with Arrow Up-Right */}
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        id="btn-explore-destinations"
        type="button"
        onClick={onExploreClick}
        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-md border border-white/25 hover:border-white/40 text-white font-medium text-sm sm:text-base shadow-lg transition-all cursor-pointer select-none"
      >
        <span>Explore Destinations</span>
        <ArrowUpRight className="w-4 h-4 text-white/90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.button>
    </div>
  );
};

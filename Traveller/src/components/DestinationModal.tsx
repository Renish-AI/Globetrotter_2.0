import React from 'react';
import { X, MapPin, Calendar, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DestinationItem } from '../types';

interface DestinationModalProps {
  destination: DestinationItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !destination) return null;

  return (
    <AnimatePresence>
      <div 
        id="destination-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          id="destination-modal-card"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#18202d] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl text-white"
        >
          {/* Close button */}
          <button
            id="modal-close-btn"
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden">
            <img
              src={destination.imageUrl}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18202d] via-black/30 to-transparent" />
            
            {/* Pill on Image */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {destination.location}
              </span>
              <span className="bg-amber-500/30 backdrop-blur-md border border-amber-400/30 text-amber-200 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {destination.rating}
              </span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <h2 className="font-serif-italic text-2xl sm:text-3xl font-semibold tracking-wide text-white">
                {destination.name}
              </h2>
              <span className="text-xs sm:text-sm text-white/60 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-white/50" />
                Best season: {destination.bestSeason}
              </span>
            </div>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {destination.description}
            </p>

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white/50 mb-3">
                Key Experience Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.highlights.map((highlight, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-2 text-sm text-white/90 bg-white/5 px-3 py-2 rounded-xl border border-white/10"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Thank you! An inquiry for ${destination.name} (${destination.location}) has been initiated.`);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-white text-[#11161d] hover:bg-white/90 active:scale-95 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Plan This Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

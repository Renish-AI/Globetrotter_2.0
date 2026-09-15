import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { DestinationItem } from '../types';

interface DestinationArcProps {
  destinations: DestinationItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const DestinationArc: React.FC<DestinationArcProps> = ({
  destinations,
  selectedIndex,
  onSelect,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Normal size for all items when not selected
  const NORMAL_DESKTOP_SIZE = 108;
  const NORMAL_MOBILE_SIZE = 80;
  // Expanded size for whichever item is selected
  const SELECTED_DESKTOP_SIZE = 156;
  const SELECTED_MOBILE_SIZE = 124;

  // Arc horizontal offsets to replicate the convex curve in the screenshot
  const arcConfigs = [
    { desktopX: -12, mobileX: 0 },
    { desktopX: 28, mobileX: 10 },
    { desktopX: 48, mobileX: 18 },
    { desktopX: 24, mobileX: 8 },
    { desktopX: -16, mobileX: 0 },
  ];

  return (
    <div 
      id="destinations-arc-container" 
      className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[560px] flex flex-col items-end select-none py-2 pr-6 sm:pr-8 lg:pr-10"
    >
      {/* Arc Layout with responsive curve */}
      <div className="w-full flex flex-col gap-3 sm:gap-3.5 lg:gap-4 relative">
        {destinations.map((dest, idx) => {
          const isSelected = selectedIndex === idx;
          const config = arcConfigs[idx] || { desktopX: 0, mobileX: 0 };
          
          const offsetX = isMobile ? config.mobileX : config.desktopX;
          const targetSize = isSelected 
            ? (isMobile ? SELECTED_MOBILE_SIZE : SELECTED_DESKTOP_SIZE) 
            : (isMobile ? NORMAL_MOBILE_SIZE : NORMAL_DESKTOP_SIZE);

          return (
            <div
              key={dest.id}
              id={`destination-row-${dest.id}`}
              style={{
                transform: `translateX(${offsetX}px)`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="flex items-center justify-end gap-3 sm:gap-5 group"
            >
              {/* Text Label to the left of circle */}
              <div 
                id={`destination-label-${dest.id}`}
                onClick={() => onSelect(idx)}
                className="text-right cursor-pointer transition-transform duration-300 group-hover:-translate-x-1"
              >
                <h3 className="font-serif-italic text-sm sm:text-base lg:text-xl font-medium tracking-wide text-white drop-shadow-md leading-tight">
                  {dest.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/70 font-light tracking-wide mt-0.5">
                  {dest.location}
                </p>
              </div>

              {/* Circular Destination Thumbnail */}
              <div className="relative flex items-center">
                <motion.button
                  id={`destination-circle-${dest.id}`}
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelect(idx)}
                  aria-label={`Select destination ${dest.name}, ${dest.location}`}
                  style={{
                    width: `${targetSize}px`,
                    height: `${targetSize}px`,
                  }}
                  className={`relative rounded-full overflow-hidden shrink-0 cursor-pointer transition-all duration-500 shadow-2xl bg-[#1e2736] focus:outline-none ${
                    isSelected
                      ? 'ring-4 sm:ring-[6px] ring-white/35 border-[3px] border-white/70 shadow-[0_0_25px_rgba(255,255,255,0.25)]'
                      : 'border-2 border-white/30 hover:border-white/60 ring-0 opacity-90 hover:opacity-100'
                  }`}
                >
                  <img
                    src={dest.imageUrl}
                    alt={`${dest.name}, ${dest.location}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Glass gloss overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10 pointer-events-none" />
                </motion.button>


              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroContent } from './components/HeroContent';
import { DestinationArc } from './components/DestinationArc';
import { DestinationModal } from './components/DestinationModal';
import { OtherViews } from './components/OtherViews';
import { AuthModal } from './components/AuthModal';
import { DESTINATIONS } from './data/destinations';
import { DestinationItem } from './types';
import { Eye, EyeOff } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  // Default to index 2 (Lago di Braies / Dolomites boathouse) which is active in the screenshot!
  const [selectedDestinationIndex, setSelectedDestinationIndex] = useState<number>(2);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [selectedModalDestination, setSelectedModalDestination] = useState<DestinationItem | null>(null);

  // Background toggle set to true by default to show dynamic background images
  const [previewBackground, setPreviewBackground] = useState<boolean>(true);

  const currentDestination = DESTINATIONS[selectedDestinationIndex];

  const handleOpenExplore = () => {
    setSelectedModalDestination(currentDestination);
    setModalOpen(true);
  };

  const handleSelectModalDestination = (dest: DestinationItem) => {
    setSelectedModalDestination(dest);
    setModalOpen(true);
  };

  // Convert the 800w crop to a larger one for the background if possible, or just use the imageUrl directly.
  // We'll replace w=800 with w=2000
  const bgImageUrl = currentDestination.imageUrl.replace('w=800', 'w=2000');

  return (
    <div 
      id="app-root" 
      className="min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden bg-[#11161d]"
    >
      <AnimatePresence>
        {previewBackground && (
          <motion.div
            key={bgImageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(15, 23, 42, 0.7) 100%), url('${bgImageUrl}')`
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col flex-1 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Top Navigation Component */}
          <Navbar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onOpenExplore={handleOpenExplore}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center w-full px-6 md:px-12 lg:px-16 py-6 md:py-10 pointer-events-auto" id="main-content">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {activeTab === 'home' ? (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full"
                >
                  {/* Left: Hero Typography & Action Button */}
                  <div className="w-full lg:w-1/2 flex justify-start">
                    <HeroContent onExploreClick={handleOpenExplore} />
                  </div>

                  {/* Right: Curved Arc of Circular Destination Thumbnails */}
                  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end overflow-visible">
                    <DestinationArc
                      destinations={DESTINATIONS}
                      selectedIndex={selectedDestinationIndex}
                      onSelect={(idx) => {
                        setSelectedDestinationIndex(idx);
                      }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <OtherViews
                    activeTab={activeTab}
                    onSelectDestination={handleSelectModalDestination}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Minimal Footer with status & optional background toggle */}
        <footer className="w-full py-4 px-6 md:px-12 lg:px-16 border-t border-white/5 z-20 text-xs text-white/50 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Travelplanner. All rights reserved.</span>
          </div>
        </footer>
      </div>

      {/* Destination Detail Modal */}
      <div className="pointer-events-auto relative z-50">
        <DestinationModal
          destination={selectedModalDestination}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    </div>
  );
}

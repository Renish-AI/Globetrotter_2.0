import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from '../data/destinations';
import { DestinationItem } from '../types';
import { Star, MapPin, Plus, Calendar, Clock, Users, Shield, Send, Check } from 'lucide-react';
import { AIPlannerView } from './AIPlannerView';
import { MyTripsView } from './MyTripsView';
import { useTrip } from '../context/TripContext';

interface OtherViewsProps {
  activeTab: string;
  onSelectDestination: (dest: DestinationItem) => void;
}

export const OtherViews: React.FC<OtherViewsProps> = ({ activeTab, onSelectDestination }) => {
  const [inquirySent, setInquirySent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const { activeTrip, createTrip, addStopToTrip, addActivityToStop } = useTrip();

  if (activeTab === 'mytrips') {
    return <MyTripsView />;
  }

  if (activeTab === 'planner') {
    return <AIPlannerView />;
  }

  if (activeTab === 'destinations') {
    return (
      <section id="destinations-view" className="py-12 px-6 max-w-7xl mx-auto w-full animate-in fade-in duration-300">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-2 block">
            Curated Escapes
          </span>
          <h2 className="font-serif-italic text-3xl sm:text-4xl text-white font-medium mb-3">
            Handpicked Destinations
          </h2>
          <p className="text-white/70 text-sm sm:text-base">
            From secluded Greek islets to towering Thai limestone cliffs and Venetian waterways, explore world-class journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              id={`destination-card-${dest.id}`}
              onClick={() => onSelectDestination(dest)}
              className="group relative bg-[#18202d]/80 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1.5 shadow-xl cursor-pointer flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18202d] via-transparent to-black/20" />
                <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white/80" />
                  {dest.location}
                </span>
                <span className="absolute top-3 right-3 bg-amber-500/30 backdrop-blur-md border border-amber-400/30 text-amber-200 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {dest.rating}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-italic text-xl text-white font-medium mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                    {dest.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-white/60 mt-auto">
                  <span>Season: {dest.bestSeason}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium group-hover:underline">Explore Details</span>
                    {activeTrip && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addStopToTrip(activeTrip.id, dest.name);
                          alert(`Added ${dest.name} to ${activeTrip.title}!`);
                        }}
                        className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors text-white"
                        title="Add to Active Trip"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (activeTab === 'packages') {
    const packages = [
      {
        id: 'pkg-1',
        title: 'Ionian Islands & Zakynthos Escape',
        duration: '7 Days / 6 Nights',
        places: 'Cameo Island, Navagio Beach, Blue Caves',
        price: 'From $1,850',
        highlights: 'Private speedboat charter, sunset cliff dinners, luxury boutique villa',
        badge: 'Popular',
        fullItinerary: [
          { day: 1, stop: 'Zakynthos Town', desc: 'Arrival & check-in to boutique villa. Evening welcome dinner.' },
          { day: 2, stop: 'Navagio Beach', desc: 'Private speedboat charter to Shipwreck Cove and Blue Caves.' },
          { day: 3, stop: 'Cameo Island', desc: 'Relaxing day at Cameo Island with private cabana.' },
          { day: 4, stop: 'Keri Cliffs', desc: 'Sunset dinner at Keri Cliffs overlooking the Ionian Sea.' }
        ]
      },
      {
        id: 'pkg-2',
        title: 'Dolomites Alpine & Lake Expedition',
        duration: '6 Days / 5 Nights',
        places: 'Lago di Braies, Tre Cime, Val Gardena',
        price: 'From $2,100',
        highlights: 'Alpine wellness spa, sunrise rowboat session, guided via ferrata',
        badge: 'Recommended',
        fullItinerary: [
          { day: 1, stop: 'Val Gardena', desc: 'Arrival, acclimatization, and spa wellness evening.' },
          { day: 2, stop: 'Tre Cime', desc: 'Guided via ferrata expedition and high alpine picnic.' },
          { day: 3, stop: 'Lago di Braies', desc: 'Sunrise rowboat session and lakeside breakfast.' }
        ]
      },
      {
        id: 'pkg-3',
        title: 'Ligurian Riviera & Venice Discovery',
        duration: '8 Days / 7 Nights',
        places: 'Cinque Terre, Vernazza, Grand Canal, San Marco',
        price: 'From $2,490',
        highlights: 'First-class high-speed rail, private gondola tour, wine tasting',
        badge: 'Signature',
        fullItinerary: [
          { day: 1, stop: 'Vernazza', desc: 'Check into cliffside boutique hotel. Evening wine tasting.' },
          { day: 2, stop: 'Cinque Terre', desc: 'Hike the coastal trails with a private local guide.' },
          { day: 3, stop: 'Venice', desc: 'High-speed rail to Venice. Private sunset gondola tour.' }
        ]
      },
      {
        id: 'pkg-4',
        title: 'Andaman Sea Karst & Archipelago Tour',
        duration: '9 Days / 8 Nights',
        places: 'Koh Phi Phi Don, Maya Bay, Railay Beach',
        price: 'From $1,720',
        highlights: 'Island hopping by luxury yacht, snorkeling sanctuary, eco-lodge',
        badge: 'Adventure',
        fullItinerary: [
          { day: 1, stop: 'Phuket', desc: 'Transfer to luxury eco-lodge in the archipelago.' },
          { day: 2, stop: 'Maya Bay', desc: 'Early morning private yacht tour of Maya Bay.' },
          { day: 3, stop: 'Railay Beach', desc: 'Rock climbing intro and snorkeling sanctuary.' }
        ]
      }
    ];

    const handleSaveToMyTrips = async () => {
      const numericPrice = parseInt(selectedPackage.price.replace(/[^0-9]/g, ''), 10) || 0;
      const trip = await createTrip(selectedPackage.title, numericPrice);
      if (trip) {
        // Because addStopToTrip doesn't return the stop ID, we might need to modify TripContext to return it if we wanted activities linked exactly.
        // For now, since TripContext addStopToTrip inserts and we don't get ID back here, we'll just add stops.
        for (const item of selectedPackage.fullItinerary) {
          await addStopToTrip(trip.id, item.stop);
        }
        alert('Package saved to My Trips! Check your My Trips tab.');
      } else {
        alert('Please log in first to save trips.');
      }
    };

    return (
      <AnimatePresence mode="wait">
        {selectedPackage ? (
          <motion.section 
            key="package-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="py-12 px-6 max-w-4xl mx-auto w-full"
          >
            <button 
              onClick={() => setSelectedPackage(null)}
              className="mb-6 text-white/60 hover:text-white text-sm flex items-center gap-2"
            >
              ← Back to Packages
            </button>
            <div className="bg-[#18202d]/90 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/10">
                <div>
                  <span className="bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 inline-block">
                    {selectedPackage.badge}
                  </span>
                  <h2 className="font-serif-italic text-3xl text-white mb-2">{selectedPackage.title}</h2>
                  <p className="text-white/60 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {selectedPackage.duration}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-xs uppercase tracking-wider text-white/50 font-semibold">Starting At</span>
                  <span className="block text-2xl font-bold text-emerald-400">{selectedPackage.price}</span>
                </div>
              </div>

              <div className="space-y-6">
                {selectedPackage.fullItinerary?.map((item: any, idx: number) => (
                  <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-white/10 pb-2">
                    <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#18202d] border-2 border-emerald-400/50 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <h4 className="text-lg text-white font-medium mb-1">
                      Day {item.day}: {item.stop}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSaveToMyTrips}
                  className="flex-1 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center shadow-lg"
                >
                  Save to My Trips
                </button>
                <button
                  onClick={() => alert('Contacting specialist to book this package...')}
                  className="flex-1 py-3 rounded-full bg-white text-[#11161d] font-semibold text-sm hover:bg-white/90 transition-all flex items-center justify-center shadow-lg"
                >
                  Book this Package
                </button>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section 
            key="package-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            id="packages-view" 
            className="py-12 px-6 max-w-7xl mx-auto w-full"
          >
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-2 block">
                Signature Itineraries
              </span>
              <h2 className="font-serif-italic text-3xl sm:text-4xl text-white font-medium mb-3">
                Handcrafted Travel Packages
              </h2>
              <p className="text-white/70 text-sm sm:text-base">
                All-inclusive luxury itineraries designed for seamless travel, unforgettable moments, and authentic cultural immersion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  id={`package-card-${pkg.id}`}
                  className="bg-[#18202d]/85 border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-white/30 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {pkg.badge}
                      </span>
                      <span className="text-xs text-white/60 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {pkg.duration}
                      </span>
                    </div>
                    <h3 className="font-serif-italic text-2xl text-white font-medium mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm mb-4">
                      <span className="text-white/80 font-medium">Route: </span>
                      {pkg.places}
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-6 text-xs text-white/80">
                      {pkg.highlights}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-xs text-white/50 block">Pricing</span>
                      <span className="text-lg font-bold text-white">{pkg.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className="px-5 py-2.5 rounded-full bg-white text-[#11161d] text-xs sm:text-sm font-semibold hover:bg-white/90 transition-all shadow-md"
                    >
                      View Itinerary
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    );
  }

  if (activeTab === 'about') {
    return (
      <section id="about-view" className="py-12 px-6 max-w-4xl mx-auto w-full animate-in fade-in duration-300">
        <div className="bg-[#18202d]/80 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <span className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-2 block">
            Our Story & Philosophy
          </span>
          <h2 className="font-serif-italic text-3xl sm:text-4xl text-white font-medium mb-6">
            Travel Beyond the Ordinary
          </h2>
          <div className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed">
            <p>
              Travelplanner was founded with a singular conviction: travel should transcend checklist tourism. We seek out the hidden wooden footbridges of the Ionian Sea, the quiet dawn mist over high alpine boathouses in the Dolomites, and the twilight glow of ancient Venetian palazzi.
            </p>
            <p>
              Every itinerary we shape is curated with local insider knowledge, sustainable eco-practices, and an unyielding commitment to elegance, safety, and personalized comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
            <div className="flex flex-col items-center text-center">
              <Users className="w-6 h-6 text-white/70 mb-2" />
              <span className="text-xl font-bold text-white">12,000+</span>
              <span className="text-xs text-white/60">Delighted Explorers</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-6 h-6 text-white/70 mb-2" />
              <span className="text-xl font-bold text-white">45+</span>
              <span className="text-xs text-white/60">Curated Destinations</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-6 h-6 text-white/70 mb-2" />
              <span className="text-xl font-bold text-white">100%</span>
              <span className="text-xs text-white/60">Verified Experience</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activeTab === 'contact') {
    return (
      <section id="contact-view" className="py-12 px-6 max-w-2xl mx-auto w-full animate-in fade-in duration-300">
        <div className="bg-[#18202d]/90 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-left">
          <h2 className="font-serif-italic text-3xl text-white font-medium mb-2">
            Get in Touch
          </h2>
          <p className="text-white/70 text-sm mb-6">
            Have questions about a destination or want to craft a custom bespoke package? Let us know.
          </p>

          {inquirySent ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center">
              <Check className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-1">Message Received</h3>
              <p className="text-white/70 text-sm">
                Our concierge travel specialist will be in touch within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setInquirySent(false)}
                className="mt-4 px-4 py-1.5 text-xs text-white/80 hover:text-white underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setInquirySent(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Elena Rostova"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="elena@example.com"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">
                  Your Travel Inquiries
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="I would love to arrange a 5-day journey exploring Lago di Braies and Venice..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-white text-[#11161d] font-semibold text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }

  return null;
};

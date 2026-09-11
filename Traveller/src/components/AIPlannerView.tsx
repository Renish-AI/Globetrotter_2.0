import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { MapPin, DollarSign, Clock } from 'lucide-react';

export const AIPlannerView: React.FC = () => {
  const { generateAIItinerary, saveGeneratedItinerary, isLoading, createTrip } = useTrip();
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('Moderate');
  const [interests, setInterests] = useState('');
  
  // State to hold the AI's response
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedItinerary(null);
    const interestsList = interests.split(',').map((i) => i.trim()).filter((i) => i);
    
    // 1. Fetch AI plan FIRST
    const result = await generateAIItinerary(destination, days, budget, interestsList);
    if (result) {
      setGeneratedItinerary(result);
      
      // 2. Create trip in DB and save stops/activities
      const totalEstimated = calculateTotal(result.stops || []);
      const trip = await createTrip(`AI Trip: ${destination}`, totalEstimated); 
      if (trip) {
        await saveGeneratedItinerary(trip.id, result);
      }
    }
  };

  // Financial Cockpit logic based on AI data
  const calculateTotal = (stops: any[]) => {
    let total = 0;
    stops.forEach(stop => {
      stop.activities?.forEach((act: any) => {
        total += Number(act.estimatedCost) || 0;
      });
    });
    return total;
  };

  return (
    <section className="py-12 px-6 max-w-4xl mx-auto w-full animate-in fade-in duration-300">
      
      {/* AI Form */}
      <div className="bg-[#18202d]/80 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl mb-8">
        <h2 className="font-serif-italic text-3xl sm:text-4xl text-white font-medium mb-6">
          AI Trip Planner
        </h2>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">Destination</label>
            <input required type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Kyoto, Japan" className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">Days</label>
              <input required type="number" min="1" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-white/50" />
            </div>
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">Budget</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-white/50 appearance-none">
                <option value="Backpacker">Backpacker</option>
                <option value="Moderate">Moderate</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">Interests (comma separated)</label>
            <input required type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Culture, Food, Hiking" className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-3 rounded-full bg-white text-[#11161d] font-semibold text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-4">
            {isLoading ? 'Generating AI Itinerary...' : 'Plan My Trip'}
          </button>
        </form>
      </div>

      {/* Generated Itinerary Display */}
      {generatedItinerary && generatedItinerary.stops && (
        <div className="bg-[#18202d]/90 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl animate-in slide-in-from-bottom-10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-serif-italic text-2xl text-white font-medium mb-1">Your AI Itinerary</h3>
              <p className="text-white/60 text-sm">Custom crafted for {destination}</p>
            </div>
            {/* Financial Cockpit Widget */}
            <div className="mt-4 sm:mt-0 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/50 font-semibold">Total Cost</span>
                <span className="block text-lg font-bold text-white">${calculateTotal(generatedItinerary.stops)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {generatedItinerary.stops.map((stop: any, idx: number) => (
              <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-white/10">
                <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#18202d] border-2 border-amber-400/50 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                
                <h4 className="text-xl text-white font-medium mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white/50" /> {stop.name}
                </h4>
                <p className="text-xs text-white/50 uppercase tracking-widest mb-4">
                  {stop.type} • {stop.days} Days
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stop.activities?.map((act: any, actIdx: number) => (
                    <div key={actIdx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-white/90 text-sm">{act.name}</h5>
                        <span className="text-emerald-400 font-semibold text-sm shrink-0 ml-2">
                          ${act.estimatedCost}
                        </span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </section>
  );
};

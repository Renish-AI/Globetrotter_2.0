import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { MapPin, Calendar, CreditCard, Compass, Plus, Clock } from 'lucide-react';

export const MyTripsView: React.FC = () => {
  const { trips, activeTrip, setActiveTrip, stops, activities, totalCost, addActivityToStop, deleteTrip } = useTrip();
  const [addingToStop, setAddingToStop] = useState<string | null>(null);
  const [newAct, setNewAct] = useState({ name: '', time: '', cost: '' });

  const handleAddActivity = async (stopId: string) => {
    if (!newAct.name || !newAct.time) return;
    await addActivityToStop(stopId, newAct.name, Number(newAct.cost) || 0, newAct.time);
    setAddingToStop(null);
    setNewAct({ name: '', time: '', cost: '' });
  };

  if (!trips || trips.length === 0) {
    return (
      <section className="py-12 px-6 max-w-4xl mx-auto w-full animate-in fade-in duration-300 text-center">
        <div className="bg-[#18202d]/80 border border-white/10 rounded-3xl p-12 shadow-2xl">
          <Compass className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="font-serif-italic text-2xl text-white mb-2">No Trips Yet</h2>
          <p className="text-white/60 text-sm">
            You haven't planned any trips. Use the AI Planner or add destinations manually to get started!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto w-full animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar: List of Trips */}
        <div className="w-full md:w-1/3 space-y-4">
          <h3 className="text-sm uppercase tracking-widest text-white/60 font-semibold mb-4 px-2">Your Itineraries</h3>
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setActiveTrip(trip)}
              className={`relative p-5 rounded-2xl cursor-pointer border transition-all group ${
                activeTrip?.id === trip.id
                  ? 'bg-white/15 border-white/30 shadow-lg'
                  : 'bg-[#18202d]/60 border-white/5 hover:border-white/20 hover:bg-[#18202d]/80'
              }`}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Are you sure you want to delete this trip?')) {
                    deleteTrip(trip.id);
                  }
                }}
                className="absolute top-4 right-4 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Trip"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
              <h4 className="font-serif-italic text-xl text-white mb-1 pr-6">{trip.title}</h4>
              <div className="flex items-center justify-between text-xs text-white/50 mt-4">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> {new Date(trip.created_at || Date.now()).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5"/> Budget: ${trip.budget}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Content: Active Trip Details */}
        <div className="w-full md:w-2/3">
          {activeTrip ? (
            <div className="bg-[#18202d]/90 border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/10">
                <div>
                  <h2 className="font-serif-italic text-3xl text-white mb-2">{activeTrip.title}</h2>
                  <p className="text-white/60 text-sm">Review your itinerary and estimated costs.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-right">
                  <span className="block text-xs uppercase tracking-wider text-white/50 font-semibold">Financial Cockpit</span>
                  <span className="block text-2xl font-bold text-emerald-400">${totalCost}</span>
                </div>
              </div>

              {stops.length > 0 ? (
                <div className="space-y-8">
                  {stops.map((stop) => {
                    const stopActivities = activities.filter(a => a.stop_id === stop.id);
                    const isAdding = addingToStop === stop.id;
                    return (
                      <div key={stop.id} className="relative pl-6 sm:pl-8 border-l-2 border-white/10">
                        <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#18202d] border-2 border-amber-400/50 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-amber-400" />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-xl text-white font-medium mb-1 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-white/50" /> {stop.name}
                            </h4>
                            <p className="text-xs text-white/50 uppercase tracking-widest">
                              {stop.type}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setAddingToStop(isAdding ? null : stop.id);
                              setNewAct({ name: '', time: '', cost: '' });
                            }}
                            className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors text-white text-xs flex items-center gap-1.5"
                          >
                            <Plus className="w-3 h-3" /> Activity
                          </button>
                        </div>
                        
                        {isAdding && (
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 animate-in fade-in slide-in-from-top-2">
                            <h5 className="text-white text-sm font-semibold mb-3">New Activity</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                              <input required type="text" placeholder="Activity Name" value={newAct.name} onChange={(e) => setNewAct({...newAct, name: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/30 text-xs focus:outline-none focus:border-white/50" />
                              <input required type="text" placeholder="Time (e.g., 10:00 AM)" value={newAct.time} onChange={(e) => setNewAct({...newAct, time: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/30 text-xs focus:outline-none focus:border-white/50" />
                              <input type="number" placeholder="Cost ($)" value={newAct.cost} onChange={(e) => setNewAct({...newAct, cost: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/30 text-xs focus:outline-none focus:border-white/50" />
                            </div>
                            <div className="flex justify-end gap-2">
                              <button onClick={() => setAddingToStop(null)} className="px-4 py-1.5 rounded-full border border-white/10 text-white/70 text-xs hover:text-white hover:bg-white/5">Cancel</button>
                              <button onClick={() => handleAddActivity(stop.id)} className="px-4 py-1.5 rounded-full bg-white text-[#11161d] text-xs font-semibold hover:bg-white/90">Add Activity</button>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {stopActivities.length > 0 ? stopActivities.map((act) => (
                            <div key={act.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between">
                                  <h5 className="font-medium text-white/90 text-sm mb-1">{act.name}</h5>
                                  <span className="text-emerald-400 font-semibold text-sm ml-2 shrink-0">${act.cost}</span>
                                </div>
                                {act.description && (
                                  <p className="text-white/60 text-xs flex items-center gap-1.5 mt-2">
                                    <Clock className="w-3.5 h-3.5" /> {act.description.replace('Time: ', '')}
                                  </p>
                                )}
                              </div>
                            </div>
                          )) : (
                            !isAdding && <p className="text-white/40 text-xs italic">No activities added yet.</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-white/50 text-sm">No stops added to this trip yet.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#18202d]/40 border border-white/5 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center">
              <Compass className="w-12 h-12 text-white/10 mb-4" />
              <p className="text-white/40 text-sm">Select a trip from the left to view its itinerary.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

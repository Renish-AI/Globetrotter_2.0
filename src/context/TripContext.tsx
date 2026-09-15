import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

export interface Trip {
  id: string;
  title: string;
  budget: number;
  start_date: string;
  end_date: string;
}

export interface Stop {
  id: string;
  trip_id: string;
  name: string;
  type: string;
  order_index: number;
}

export interface Activity {
  id: string;
  stop_id: string;
  name: string;
  cost: number;
}

interface TripContextType {
  trips: Trip[];
  activeTrip: Trip | null;
  stops: Stop[];
  activities: Activity[];
  totalCost: number;
  isLoading: boolean;
  setActiveTrip: (trip: Trip | null) => void;
  fetchTrips: () => Promise<void>;
  createTrip: (title: string, budget: number) => Promise<Trip | null>;
  addStopToTrip: (tripId: string, name: string) => Promise<void>;
  addActivityToStop: (stopId: string, name: string, cost: number, time: string) => Promise<void>;
  generateAIItinerary: (destination: string, days: number, budget: string, interests: string[]) => Promise<any>;
  saveGeneratedItinerary: (tripId: string, itineraryData: any) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Financial Cockpit derived state
  const totalCost = activities.reduce((sum, act) => sum + (Number(act.cost) || 0), 0);

  const fetchTrips = async () => {
    if (!user) return;
    setIsLoading(true);
    const { data, error } = await supabase.from('trips').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setTrips(data);
    }
    setIsLoading(false);
  };

  const fetchTripDetails = async (tripId: string) => {
    const { data: stopsData } = await supabase.from('stops').select('*').eq('trip_id', tripId).order('order_index');
    if (stopsData) {
      setStops(stopsData);
      const stopIds = stopsData.map(s => s.id);
      if (stopIds.length > 0) {
        const { data: actsData } = await supabase.from('activities').select('*').in('stop_id', stopIds);
        if (actsData) setActivities(actsData);
      } else {
        setActivities([]);
      }
    }
  };

  const createTrip = async (title: string, budget: number) => {
    if (!user) return null;
    const { data, error } = await supabase.from('trips').insert([{ user_id: user.id, title, budget }]).select().single();
    if (data) {
      setTrips([data, ...trips]);
      return data;
    }
    return null;
  };

  const addStopToTrip = async (tripId: string, name: string) => {
    const { data, error } = await supabase.from('stops').insert([{
      trip_id: tripId,
      name,
      type: 'city',
      order_index: stops.length + 1
    }]).select().single();
    
    if (data && activeTrip?.id === tripId) {
      setStops([...stops, data]);
    }
  };

  const addActivityToStop = async (stopId: string, name: string, cost: number, time: string) => {
    // We can store 'time' in the description or ideally in start_time. 
    // Since our schema has start_time as TIMESTAMP WITH TIME ZONE, it's easier to just append time to description for simplicity, or we can just send it. Let's assume description holds the time or we use start_time.
    // For UI simplicity right now, let's just put it in description if start_time requires full dates.
    const { data, error } = await supabase.from('activities').insert([{
      stop_id: stopId,
      name,
      cost,
      description: `Time: ${time}`
    }]).select().single();

    if (data) {
      setActivities([...activities, data]);
    }
  };

  const generateAIItinerary = async (destination: string, days: number, budget: string, interests: string[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, days, budget, interests })
      });
      const data = await response.json();
      console.log('AI Generated Itinerary:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch AI itinerary:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const saveGeneratedItinerary = async (tripId: string, itineraryData: any) => {
    if (!itineraryData || !itineraryData.stops) return;
    
    for (let i = 0; i < itineraryData.stops.length; i++) {
      const stop = itineraryData.stops[i];
      const { data: stopData, error: stopError } = await supabase.from('stops').insert([{
        trip_id: tripId,
        name: stop.name,
        type: stop.type || 'city',
        order_index: i + 1
      }]).select().single();

      if (stopData && stop.activities) {
        for (const act of stop.activities) {
          await supabase.from('activities').insert([{
            stop_id: stopData.id,
            name: act.name,
            cost: Number(act.estimatedCost) || 0,
            description: act.description
          }]);
        }
      }
    }
  };

  const deleteTrip = async (tripId: string) => {
    const { error } = await supabase.from('trips').delete().eq('id', tripId);
    if (!error) {
      setTrips(trips.filter(t => t.id !== tripId));
      if (activeTrip?.id === tripId) {
        setActiveTrip(null);
      }
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [user]);

  useEffect(() => {
    if (activeTrip) {
      fetchTripDetails(activeTrip.id);
    } else {
      setStops([]);
      setActivities([]);
    }
  }, [activeTrip]);

  return (
    <TripContext.Provider value={{ trips, activeTrip, stops, activities, totalCost, isLoading, setActiveTrip, fetchTrips, createTrip, addStopToTrip, addActivityToStop, generateAIItinerary, saveGeneratedItinerary, deleteTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrip must be used within a TripProvider');
  return context;
};

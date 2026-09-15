import { DestinationItem } from '../types';

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'cameo-island',
    name: 'Cameo Island',
    location: 'Zakynthos, Greece',
    country: 'Greece',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#0ea5e9',
    description: 'An idyllic private islet connected to Agios Sostis by a scenic wooden rope bridge over crystal-clear Ionian seas.',
    highlights: ['Wooden Suspension Footbridge', 'Turtle Spotting in Laganas Bay', 'Secluded Cliffside Lounge'],
    bestSeason: 'May - October',
    rating: 4.9
  },
  {
    id: 'koh-phi-phi-don',
    name: 'Koh Phi Phi Don',
    location: 'Islands, Thailand',
    country: 'Thailand',
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#059669',
    description: 'Towering limestone karsts rising dramatically from turquoise lagoons, fringed by powdery white sand and vibrant marine life.',
    highlights: ['Maya Bay & Pileh Lagoon', 'Longtail Boat Excursions', 'Panoramic Viewpoint Hike'],
    bestSeason: 'November - April',
    rating: 4.8
  },
  {
    id: 'lago-di-braies',
    name: 'Lago di Braies',
    location: 'Dolomites, Italy',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#3b82f6',
    description: 'The iconic "Pearl of the Alps" nestled in the Braies Dolomites, famous for its historic wooden boathouse and mirror-like alpine waters.',
    highlights: ['Historic Wooden Boathouse', 'Alpine Rowboat Hire', 'Croda del Becco Hiking Loop'],
    bestSeason: 'June - October',
    rating: 5.0
  },
  {
    id: 'cinque-terre',
    name: 'Cinque Terre',
    location: 'Vernazza, Italy',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#f97316',
    description: 'A vibrant pastel-hued fishing village clinging to precipitous cliffs along the Ligurian Riviera with breathtaking sunset panoramas.',
    highlights: ['Castello Doria Overlook', 'Sentiero Azzurro Coastal Path', 'Harbor Seafood Dining'],
    bestSeason: 'April - October',
    rating: 4.9
  },
  {
    id: 'grand-canal',
    name: 'Grand Canal',
    location: 'Venice, Italy',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#8b5cf6',
    description: 'Venice’s ancient watery boulevard winding past magnificent Byzantine, Gothic, and Renaissance palazzi illuminated at twilight.',
    highlights: ['Rialto Bridge Views', 'Sunset Gondola Serenade', 'Doge’s Palace & San Marco'],
    bestSeason: 'Year-round',
    rating: 4.9
  }
];

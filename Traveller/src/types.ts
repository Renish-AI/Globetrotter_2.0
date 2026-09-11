export interface DestinationItem {
  id: string;
  name: string;
  location: string;
  country: string;
  imageUrl: string;
  fallbackColor: string;
  description: string;
  highlights: string[];
  bestSeason: string;
  rating: number;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

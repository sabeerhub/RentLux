export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  type: 'Self-Con' | 'Flat' | 'Duplex' | 'Shared' | 'Studio';
  tags: string[];
  imageUrl: string;
  rating: number;
  description: string;
  proximity?: string; // e.g., "5 mins to UNILAG"
  amenities: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface FilterState {
  search: string;
  minPrice: number;
  maxPrice: number;
  type: string | null;
  city: string | null;
}

export interface UserProfile {
  name: string;
  email: string;
  status: 'verified' | 'pending';
  nin?: string;
}
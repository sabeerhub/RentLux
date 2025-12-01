import { Property } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'FUD Scholars Lodge',
    location: 'Ibrahim Aliyu Bypass',
    city: 'Dutse',
    price: 150000,
    type: 'Self-Con',
    tags: ['FUD Students', 'Campus Proximity'],
    imageUrl: 'https://picsum.photos/800/600?random=1',
    rating: 4.5,
    description: 'Affordable self-contained room just 5 minutes walk from Federal University Dutse main gate. Ideal for serious students.',
    proximity: '5 mins to FUD Gate',
    amenities: ['Borehole Water', 'Fenced', 'Security', 'Study Area']
  },
  {
    id: '2',
    title: 'Takur Awa Corpers Lodge',
    location: 'Takur Awa',
    city: 'Dutse',
    price: 300000,
    type: 'Flat',
    tags: ['NYSC Friendly', 'Modern'],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    rating: 4.7,
    description: 'A clean 1-bedroom flat perfect for Corpers serving in ministries. Quiet environment with good road access.',
    proximity: 'Near State Secretariat',
    amenities: ['Tiled Floors', 'Kitchen Cabinet', 'Running Water', 'Veranda']
  },
  {
    id: '3',
    title: 'Poly Road Studio',
    location: 'Kiyawa Road',
    city: 'Dutse',
    price: 120000,
    type: 'Studio',
    tags: ['Budget', 'Poly Students'],
    imageUrl: 'https://picsum.photos/800/600?random=3',
    rating: 4.2,
    description: 'Compact studio apartment near Jigawa State Polytechnic. Ideal for students on a strict budget.',
    proximity: 'Opposite Jigawa Poly',
    amenities: ['Water Tank', 'Electricity', 'Local Security']
  },
  {
    id: '4',
    title: 'GRA Executive Suite',
    location: 'GRA',
    city: 'Dutse',
    price: 600000,
    type: 'Flat',
    tags: ['Premium', 'Secure'],
    imageUrl: 'https://picsum.photos/800/600?random=4',
    rating: 4.9,
    description: 'Luxury 2-bedroom apartment in the Government Reservation Area. 24/7 security and serene atmosphere.',
    proximity: 'Central Business District',
    amenities: ['AC', 'Generator', 'Uniformed Security', 'Car Park']
  },
  {
    id: '5',
    title: 'Gida Dubu Villa',
    location: 'Gida Dubu Estate',
    city: 'Dutse',
    price: 250000,
    type: 'Self-Con',
    tags: ['Quiet', 'Spacious'],
    imageUrl: 'https://picsum.photos/800/600?random=5',
    rating: 4.4,
    description: 'Spacious self-con in the popular Gida Dubu housing estate. Good community vibe and regular power supply.',
    proximity: '10 mins to Dutse Market',
    amenities: ['Stable Power', 'Water Board', 'Fenced']
  },
  {
    id: '6',
    title: 'Yadi Student Compound',
    location: 'Yadi',
    city: 'Dutse',
    price: 90000,
    type: 'Shared',
    tags: ['Social', 'Cheap'],
    imageUrl: 'https://picsum.photos/800/600?random=6',
    rating: 4.3,
    description: 'Shared room option in a lively student compound at Yadi. Very social environment, make friends easily.',
    proximity: 'Near FUD Back Gate',
    amenities: ['Common Room', 'Well Water', 'Big Compound']
  }
];

export const CITIES = ['Dutse'];
export const PROPERTY_TYPES = ['Self-Con', 'Flat', 'Studio', 'Shared'];
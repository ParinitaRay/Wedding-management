import { Room } from '../types';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Grand Ballroom',
    description: 'Our largest and most elegant space, perfect for grand celebrations with stunning chandeliers and premium decor.',
    image: 'https://images.unsplash.com/photo-1761110787206-2cc164e4913c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGhhbGwlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzAxODA2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    size: 5000,
    capacity: 500,
    pricePerHour: 800,
    amenities: ['Dance Floor', 'Stage', 'Premium Sound System', 'Lighting', 'Catering Kitchen', 'Bridal Suite'],
    available: true
  },
  {
    id: '2',
    name: 'Crystal Hall',
    description: 'A luxurious banquet room with crystal chandeliers and modern amenities for sophisticated weddings.',
    image: 'https://images.unsplash.com/photo-1675247488725-22d1b78e75db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYW5xdWV0JTIwcm9vbSUyMHdlZGRpbmd8ZW58MXx8fHwxNzcwMTgwNjk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    size: 3500,
    capacity: 300,
    pricePerHour: 600,
    amenities: ['Sound System', 'Dance Floor', 'Bar Area', 'Outdoor Terrace', 'Premium Lighting'],
    available: true
  },
  {
    id: '3',
    name: 'Royal Reception',
    description: 'A beautiful reception hall with elegant decor and versatile setup options for medium-sized celebrations.',
    image: 'https://images.unsplash.com/photo-1759519238029-689e99c6d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwYmFsbHJvb218ZW58MXx8fHwxNzcwMTgwNzAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    size: 2500,
    capacity: 200,
    pricePerHour: 450,
    amenities: ['Dance Floor', 'Sound System', 'Lighting', 'Bar Counter', 'Dressing Room'],
    available: true
  },
  {
    id: '4',
    name: 'Intimate Garden Room',
    description: 'A cozy and charming space with garden views, perfect for intimate gatherings and small weddings.',
    image: 'https://images.unsplash.com/photo-1729237261091-bae8eba0c60c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRpbWF0ZSUyMHdlZGRpbmclMjB2ZW51ZSUyMHNtYWxsfGVufDF8fHx8MTc3MDE4MDcwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    size: 1200,
    capacity: 80,
    pricePerHour: 250,
    amenities: ['Garden Access', 'Sound System', 'Natural Lighting', 'Kitchenette'],
    available: true
  }
];

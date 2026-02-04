export interface Room {
  id: string;
  name: string;
  description: string;
  image: string;
  size: number; // in square feet
  capacity: number; // max number of people
  pricePerHour: number;
  amenities: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  clientName: string;
  clientEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}

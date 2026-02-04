import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, Maximize2, DollarSign, Check } from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onViewDetails: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onViewDetails }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={room.image} 
          alt={room.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {room.available && (
          <Badge className="absolute top-3 right-3 bg-green-500">
            Available
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription className="line-clamp-2">{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Up to {room.capacity} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="w-4 h-4" />
            <span>{room.size.toLocaleString()} sq ft</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-lg font-semibold text-purple-600">
          <DollarSign className="w-5 h-5" />
          <span>{room.pricePerHour}/hour</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              <Check className="w-3 h-3 mr-1" />
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{room.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onViewDetails(room)}
        >
          View Details & Book
        </Button>
      </CardFooter>
    </Card>
  );
};

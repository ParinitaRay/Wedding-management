import React, { useState } from 'react';
import { RoomCard } from './RoomCard';
import { Room } from '../types';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

interface RoomCatalogProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

export const RoomCatalog: React.FC<RoomCatalogProps> = ({ rooms, onSelectRoom }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('all');

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCapacity = capacityFilter === 'all' || 
                           (capacityFilter === 'small' && room.capacity <= 100) ||
                           (capacityFilter === 'medium' && room.capacity > 100 && room.capacity <= 300) ||
                           (capacityFilter === 'large' && room.capacity > 300);
    
    return matchesSearch && matchesCapacity;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 sm:w-64">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <Select value={capacityFilter} onValueChange={setCapacityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by capacity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Capacities</SelectItem>
              <SelectItem value="small">Small (Up to 100)</SelectItem>
              <SelectItem value="medium">Medium (101-300)</SelectItem>
              <SelectItem value="large">Large (300+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredRooms.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No rooms found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} onViewDetails={onSelectRoom} />
          ))}
        </div>
      )}
    </div>
  );
};

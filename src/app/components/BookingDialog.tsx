import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Room, Booking } from '../types';
import { useAuth } from './AuthContext';
import { Users, Maximize2, DollarSign, Calendar as CalendarIcon, Clock, Check } from 'lucide-react';
import { format } from 'date-fns';

interface BookingDialogProps {
  room: Room | null;
  open: boolean;
  onClose: () => void;
  onBookingComplete: (booking: Booking) => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

export const BookingDialog: React.FC<BookingDialogProps> = ({ room, open, onClose, onBookingComplete }) => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [guests, setGuests] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    if (!room || !date || !startTime || !endTime || !guests || !user) return;

    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    const hours = end - start;
    const totalPrice = hours * room.pricePerHour;

    const booking: Booking = {
      id: Date.now().toString(),
      roomId: room.id,
      roomName: room.name,
      clientName: user.name,
      clientEmail: user.email,
      date: format(date, 'yyyy-MM-dd'),
      startTime,
      endTime,
      guests: parseInt(guests),
      status: 'pending',
      totalPrice
    };

    onBookingComplete(booking);
    resetForm();
  };

  const resetForm = () => {
    setDate(undefined);
    setStartTime('');
    setEndTime('');
    setGuests('');
    setStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const calculateTotal = () => {
    if (!startTime || !endTime || !room) return 0;
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    const hours = end - start;
    return hours > 0 ? hours * room.pricePerHour : 0;
  };

  const isFormValid = date && startTime && endTime && guests && parseInt(guests) > 0 && calculateTotal() > 0;

  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {room.name}</DialogTitle>
          <DialogDescription>
            Select your preferred date and time for your event
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Room Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <div className="flex gap-4">
              <img src={room.image} alt={room.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">{room.name}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Up to {room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-4 h-4" />
                    <span>{room.size.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-600 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    <span>{room.pricePerHour}/hour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Select Date
              </Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>

            {/* Time and Guest Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Start Time
                </Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  End Time
                </Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time} disabled={startTime && time <= startTime}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Number of Guests
                </Label>
                <Input
                  type="number"
                  placeholder="Enter number of guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  max={room.capacity}
                  min="1"
                />
                {guests && parseInt(guests) > room.capacity && (
                  <p className="text-sm text-red-500">
                    This room can accommodate up to {room.capacity} guests
                  </p>
                )}
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <Label>Included Amenities</Label>
                <div className="flex flex-wrap gap-1.5">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      <Check className="w-3 h-3 mr-1" />
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          {calculateTotal() > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Rate per hour:</span>
                <span>${room.pricePerHour}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Duration:</span>
                <span>{parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0])} hours</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-purple-600">${calculateTotal()}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid || (guests && parseInt(guests) > room.capacity)}
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

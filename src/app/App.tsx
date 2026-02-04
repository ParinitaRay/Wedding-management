import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { RoomCatalog } from './components/RoomCatalog';
import { BookingDialog } from './components/BookingDialog';
import { AdminDashboard } from './components/AdminDashboard';
import { ClientDashboard } from './components/ClientDashboard';
import { rooms } from './data/rooms';
import { Room, Booking } from './types';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

function AppContent() {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const [currentView, setCurrentView] = useState<'rooms' | 'dashboard'>('rooms');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleBookingComplete = (booking: Booking) => {
    setBookings([...bookings, booking]);
    setSelectedRoom(null);
    toast.success('Booking request submitted!', {
      description: 'Your booking is pending admin approval. You will be notified once confirmed.'
    });
  };

  const handleUpdateBookingStatus = (bookingId: string, status: 'confirmed' | 'cancelled') => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status } : b
    ));
    toast.success(
      status === 'confirmed' ? 'Booking confirmed!' : 'Booking cancelled',
      {
        description: status === 'confirmed' 
          ? 'The client has been notified of the confirmation.'
          : 'The booking has been cancelled.'
      }
    );
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setCurrentView('rooms')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'rooms' ? (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-2">Find Your Perfect Venue</h2>
              <p className="text-gray-600">
                Browse our collection of beautiful wedding halls and banquet rooms. 
                Each space is designed to make your special day unforgettable.
              </p>
            </div>
            <RoomCatalog rooms={rooms} onSelectRoom={setSelectedRoom} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">
                {isAdmin ? 'Admin Dashboard' : 'My Bookings'}
              </h2>
              <p className="text-gray-600">
                {isAdmin 
                  ? 'Manage rooms, bookings, and view analytics'
                  : 'Track your wedding venue reservations'}
              </p>
            </div>
            {isAdmin ? (
              <AdminDashboard 
                rooms={rooms} 
                bookings={bookings}
                onUpdateBookingStatus={handleUpdateBookingStatus}
              />
            ) : (
              <ClientDashboard 
                bookings={bookings}
                clientEmail={user?.email || ''}
              />
            )}
          </div>
        )}
      </main>

      <BookingDialog
        room={selectedRoom}
        open={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onBookingComplete={handleBookingComplete}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

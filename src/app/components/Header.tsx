import React from 'react';
import { Button } from './ui/button';
import { Heart, LogOut, LayoutDashboard, Home } from 'lucide-react';
import { useAuth } from './AuthContext';

interface HeaderProps {
  currentView: 'rooms' | 'dashboard';
  onNavigate: (view: 'rooms' | 'dashboard') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Wedding Hall Manager</h1>
              <p className="text-sm text-gray-500">Your perfect venue awaits</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 border-r pr-4">
              <Button
                variant={currentView === 'rooms' ? 'default' : 'ghost'}
                onClick={() => onNavigate('rooms')}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Browse Rooms
              </Button>
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => onNavigate('dashboard')}
                className="gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                {isAdmin ? 'Admin Dashboard' : 'My Bookings'}
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{isAdmin ? 'Administrator' : 'Client'}</p>
              </div>
              <Button variant="outline" onClick={logout} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex sm:hidden gap-2 mt-3">
          <Button
            variant={currentView === 'rooms' ? 'default' : 'ghost'}
            onClick={() => onNavigate('rooms')}
            className="flex-1 gap-2"
            size="sm"
          >
            <Home className="w-4 h-4" />
            Rooms
          </Button>
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => onNavigate('dashboard')}
            className="flex-1 gap-2"
            size="sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            {isAdmin ? 'Dashboard' : 'Bookings'}
          </Button>
        </div>
      </div>
    </header>
  );
};

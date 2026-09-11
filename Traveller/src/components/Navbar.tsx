import React, { useState } from 'react';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { NavItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenExplore?: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenExplore, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const NAV_ITEMS: NavItem[] = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'planner', label: 'AI Planner', href: '#' },
    { id: 'destinations', label: 'Destinations', href: '#' },
    ...(user ? [{ id: 'mytrips', label: 'My Trips', href: '#' }] : []),
    { id: 'packages', label: 'Travel Packages', href: '#' },
    { id: 'about', label: 'About Us', href: '#' },
  ];

  return (
    <header className="relative z-30 w-full pt-6 pb-4 px-6 md:px-12 lg:px-16" id="main-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-lg">
        {/* Logo matching Travelplanner in screenshot */}
        <div 
          id="brand-logo"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          {/* Logo Mark: Squircle badge with 4-point star/spark cutout */}
          <div className="w-8 h-8 rounded-[10px] bg-white text-[#11161d] flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
            <svg 
              className="w-5 h-5 fill-current" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-sans">
            GlobeTrotter
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9" id="desktop-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                )}
              </button>
            );
          })}
          
          <div className="ml-4 pl-4 border-l border-white/20">
            {user ? (
              <button onClick={signOut} className="text-sm font-medium text-white/80 hover:text-white flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <button onClick={onOpenAuth} className="text-sm font-medium text-white/80 hover:text-white flex items-center gap-2">
                <UserIcon className="w-4 h-4" /> Login / Signup
              </button>
            )}
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/90 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-menu"
          className="md:hidden mt-3 p-4 bg-[#18202c]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

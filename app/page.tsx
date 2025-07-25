'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authService } from '../lib/auth';
import { useRouter } from 'next/navigation';


type User = {
  name: string;
  email: string;
  emergencyContacts?: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    priority: string;
  }[];
};

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }

    setUser(authService.getCurrentUser());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-pink-100 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <i className="ri-shield-check-line text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Pacifico, serif' }}>
                Rakshika
              </h1>
              <p className="text-xs text-gray-600">Hi, {user.name}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Live</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-24 px-4">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <img
              src="https://readdy.ai/api/search-image?query=Beautiful%20young%20woman%20feeling%20safe%20and%20protected%2C%20holding%20smartphone%20with%20security%20app%2C%20soft%20pastel%20colors%2C%20gentle%20lighting%2C%20empowering%20and%20confident%20pose%2C%20modern%20illustration%20style%2C%20peaceful%20expression&width=300&height=200&seq=hero1&orientation=landscape"
              alt="Hero"
              className="w-full h-48 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Digital Guardian</h2>
          <p className="text-gray-600 text-sm px-4">AI-powered real-time protection against threats and cyberstalking</p>
          <div className="mt-4 text-xs text-gray-500" suppressHydrationWarning={true}>
            Protected since: {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link href="/panic" className="!rounded-button bg-gradient-to-r from-red-400 to-pink-500 text-white p-4 text-center shadow-lg">
            <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
              <i className="ri-alarm-warning-line text-xl"></i>
            </div>
            <span className="text-sm font-medium">Panic Button</span>
          </Link>
          <Link href="/monitoring" className="!rounded-button bg-gradient-to-r from-purple-400 to-blue-500 text-white p-4 text-center shadow-lg">
            <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
              <i className="ri-shield-check-line text-xl"></i>
            </div>
            <span className="text-sm font-medium">Live Monitor</span>
          </Link>
        </div>

        {/* Main Features */}
        {/* [unchanged features list...] */}

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-pink-100">
            <div className="text-2xl font-bold text-green-600">24/7</div>
            <div className="text-xs text-gray-600">Active Protection</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-xs text-gray-600">Threats Detected</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-pink-100 z-50">
        <div className="grid grid-cols-4 py-2">
          <Link href="/" className="flex flex-col items-center justify-center py-2 text-pink-600">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-home-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/monitoring" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-shield-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Monitor</span>
          </Link>
          <Link href="/evidence" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-folder-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Evidence</span>
          </Link>
          <Link href="/settings" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-settings-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

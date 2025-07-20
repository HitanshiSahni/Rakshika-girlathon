'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function EvidencePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const evidenceItems = [
    {
      id: 1,
      type: 'Screenshot',
      category: 'threat',
      title: 'Threatening WhatsApp Message',
      date: '2024-01-15',
      time: '14:30',
      size: '2.3 MB',
      source: 'WhatsApp',
      encrypted: true,
      tags: ['harassment', 'threat']
    },
    {
      id: 2,
      type: 'Email',
      category: 'cyberstalking',
      title: 'Suspicious Email Chain',
      date: '2024-01-14',
      time: '09:15',
      size: '156 KB',
      source: 'Gmail',
      encrypted: true,
      tags: ['stalking', 'fake account']
    },
    {
      id: 3,
      type: 'Report',
      category: 'legal',
      title: 'Auto-Generated Abuse Report',
      date: '2024-01-13',
      time: '16:45',
      size: '89 KB',
      source: 'Rakshika AI',
      encrypted: true,
      tags: ['report', 'police']
    },
    {
      id: 4,
      type: 'Screenshot',
      category: 'cyberstalking',
      title: 'Instagram Story Views Pattern',
      date: '2024-01-12',
      time: '11:20',
      size: '1.8 MB',
      source: 'Instagram',
      encrypted: true,
      tags: ['story stalking', 'pattern']
    }
  ];

  const filteredEvidence = selectedCategory === 'all' 
    ? evidenceItems 
    : evidenceItems.filter(item => item.category === selectedCategory);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Screenshot': return 'ri-image-line';
      case 'Email': return 'ri-mail-line';
      case 'Report': return 'ri-file-text-line';
      default: return 'ri-file-line';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Screenshot': return 'bg-blue-100 text-blue-600';
      case 'Email': return 'bg-green-100 text-green-600';
      case 'Report': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-blue-100 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            <span className="font-medium text-gray-700">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-blue-600">Evidence Locker</h1>
          <button className="w-8 h-8 flex items-center justify-center">
            <i className="ri-add-line text-xl text-gray-700"></i>
          </button>
        </div>
      </nav>

      <div className="pt-20 pb-24 px-4">
        {/* Storage Status */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-blue-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <i className="ri-cloud-line text-blue-500 mr-2"></i>
              Secure Cloud Storage
            </h2>
            <div className="flex items-center space-x-1">
              <i className="ri-lock-line text-green-500 text-sm"></i>
              <span className="text-xs text-green-600">Encrypted</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">4</div>
              <div className="text-xs text-gray-600">Items Stored</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">4.5 MB</div>
              <div className="text-xs text-gray-600">Total Size</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">256-bit</div>
              <div className="text-xs text-gray-600">Encryption</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`!rounded-button px-4 py-2 text-sm font-medium whitespace-nowrap ${
              selectedCategory === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/70 text-gray-600 border border-gray-200'
            }`}
          >
            All Evidence
          </button>
          <button 
            onClick={() => setSelectedCategory('threat')}
            className={`!rounded-button px-4 py-2 text-sm font-medium whitespace-nowrap ${
              selectedCategory === 'threat' 
                ? 'bg-red-500 text-white' 
                : 'bg-white/70 text-gray-600 border border-gray-200'
            }`}
          >
            Threats
          </button>
          <button 
            onClick={() => setSelectedCategory('cyberstalking')}
            className={`!rounded-button px-4 py-2 text-sm font-medium whitespace-nowrap ${
              selectedCategory === 'cyberstalking' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/70 text-gray-600 border border-gray-200'
            }`}
          >
            Cyberstalking
          </button>
          <button 
            onClick={() => setSelectedCategory('legal')}
            className={`!rounded-button px-4 py-2 text-sm font-medium whitespace-nowrap ${
              selectedCategory === 'legal' 
                ? 'bg-green-500 text-white' 
                : 'bg-white/70 text-gray-600 border border-gray-200'
            }`}
          >
            Legal Docs
          </button>
        </div>

        {/* Evidence List */}
        <div className="space-y-4 mb-6">
          {filteredEvidence.map((item) => (
            <div key={item.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(item.type)}`}>
                  <i className={`${getTypeIcon(item.type)} text-lg`}></i>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-800 text-sm truncate">{item.title}</h3>
                    {item.encrypted && (
                      <i className="ri-lock-line text-green-500 text-sm ml-2"></i>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-2">
                    <span>{item.source}</span> • <span>{item.date} {item.time}</span> • <span>{item.size}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="!rounded-button bg-blue-500 text-white px-3 py-1 text-xs">
                      View
                    </button>
                    <button className="!rounded-button bg-green-500 text-white px-3 py-1 text-xs">
                      Share
                    </button>
                    <button className="!rounded-button bg-purple-500 text-white px-3 py-1 text-xs">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="!rounded-button bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 text-center">
            <i className="ri-camera-line text-2xl mb-2"></i>
            <div className="text-sm font-medium">Take Screenshot</div>
          </button>
          <button className="!rounded-button bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-center">
            <i className="ri-file-add-line text-2xl mb-2"></i>
            <div className="text-sm font-medium">Upload Evidence</div>
          </button>
        </div>

        {/* Auto-Report Generator */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <i className="ri-robot-line text-green-500 mr-2"></i>
            AI Report Generator
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate professional reports for police, platform complaints, or legal proceedings using your stored evidence.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button className="!rounded-button bg-red-500 text-white px-4 py-2 text-sm">
              Police Report
            </button>
            <button className="!rounded-button bg-blue-500 text-white px-4 py-2 text-sm">
              Platform Report
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-pink-100 z-50">
        <div className="grid grid-cols-4 py-2">
          <Link href="/" className="flex flex-col items-center justify-center py-2 text-gray-400">
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
          <Link href="/evidence" className="flex flex-col items-center justify-center py-2 text-blue-600">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-folder-fill text-lg"></i>
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
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ThreatDetectionPage() {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [threats, setThreats] = useState([
    {
      id: 1,
      type: 'Abusive Language',
      source: 'WhatsApp Chat',
      sender: 'Unknown Number',
      timestamp: '2 mins ago',
      severity: 'High',
      content: 'Threatening message detected',
      status: 'active'
    },
    {
      id: 2,
      type: 'Harassment',
      source: 'Email',
      sender: 'fake.account@email.com',
      timestamp: '1 hour ago',
      severity: 'Medium',
      content: 'Suspicious email pattern',
      status: 'resolved'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          setIsScanning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-pink-100 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            <span className="font-medium text-gray-700">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-pink-600">Threat Detection</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Live</span>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-24 px-4">
        {/* Scanning Status */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-6 border border-pink-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">AI Scanner Status</h2>
            {isScanning && <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>}
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Scanning Progress</span>
              <span className="text-pink-600 font-medium">{scanProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-pink-600">127</div>
              <div className="text-xs text-gray-600">Messages Scanned</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-600">23</div>
              <div className="text-xs text-gray-600">Emails Checked</div>
            </div>
            <div>
              <div className="text-xl font-bold text-red-600">2</div>
              <div className="text-xs text-gray-600">Threats Found</div>
            </div>
          </div>
        </div>

        {/* Active Monitoring */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-purple-100">
          <h3 className="font-semibold text-gray-800 mb-3">Active Monitoring</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className="ri-message-3-line text-green-500"></i>
                <span className="text-sm">WhatsApp Messages</span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className="ri-mail-line text-green-500"></i>
                <span className="text-sm">Email Content</span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className="ri-instagram-line text-green-500"></i>
                <span className="text-sm">Instagram DMs</span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className="ri-facebook-line text-yellow-500"></i>
                <span className="text-sm">Facebook Messages</span>
              </div>
              <span className="text-xs text-gray-500">Connecting...</span>
            </div>
          </div>
        </div>

        {/* Threat Alerts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Recent Threats</h3>
            <span className="text-xs text-gray-500">{threats.length} alerts</span>
          </div>
          
          <div className="space-y-3">
            {threats.map((threat) => (
              <div key={threat.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-red-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800 text-sm">{threat.type}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{threat.source} • {threat.sender}</div>
                    <div className="text-xs text-gray-500">{threat.timestamp}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="!rounded-button bg-pink-500 text-white px-3 py-1 text-xs">
                      Block
                    </button>
                    <button className="!rounded-button bg-gray-500 text-white px-3 py-1 text-xs">
                      Save
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                  {threat.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Confidence */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3">AI Detection Accuracy</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Threat Recognition</span>
              <span className="text-sm font-medium text-green-600">98.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">False Positive Rate</span>
              <span className="text-sm font-medium text-blue-600">0.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Response Time</span>
              <span className="text-sm font-medium text-purple-600">&lt; 1 sec</span>
            </div>
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
          <Link href="/monitoring" className="flex flex-col items-center justify-center py-2 text-pink-600">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-shield-fill text-lg"></i>
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
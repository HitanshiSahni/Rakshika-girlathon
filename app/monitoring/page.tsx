'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MonitoringPage() {
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const monitoringData = {
    messagesScanned: 1247,
    emailsChecked: 89,
    socialMediaPosts: 156,
    threatsDetected: 3,
    blockedUsers: 12,
    activeAlerts: 2
  };

  const recentActivity = [
    {
      id: 1,
      type: 'threat_detected',
      message: 'Abusive language detected in WhatsApp',
      time: '2 mins ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'story_stalking',
      message: 'User viewed your story 8 times today',
      time: '15 mins ago',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'fake_account',
      message: 'Suspicious follow request blocked',
      time: '1 hour ago',
      severity: 'low'
    },
    {
      id: 4,
      type: 'evidence_saved',
      message: 'Screenshot saved to evidence locker',
      time: '2 hours ago',
      severity: 'info'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'threat_detected': return 'ri-alarm-warning-line';
      case 'story_stalking': return 'ri-eye-line';
      case 'fake_account': return 'ri-user-unfollow-line';
      case 'evidence_saved': return 'ri-save-line';
      default: return 'ri-information-line';
    }
  };

  const getActivityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-orange-500 bg-orange-100';
      case 'low': return 'text-yellow-500 bg-yellow-100';
      case 'info': return 'text-blue-500 bg-blue-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-indigo-100 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            <span className="font-medium text-gray-700">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-indigo-600">Live Monitoring</h1>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLiveMonitoring ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-gray-600">{isLiveMonitoring ? 'Live' : 'Offline'}</span>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-24 px-4">
        {/* Real-time Status */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-6 border border-indigo-100">
          <div className="text-center mb-4">
            <img 
              src="https://readdy.ai/api/search-image?query=Real-time%20monitoring%20dashboard%2C%20AI%20security%20system%2C%20digital%20protection%20shield%2C%20live%20data%20streams%2C%20purple%20and%20blue%20colors%2C%20futuristic%20interface%20design%2C%20cyber%20security%20visualization&width=300&height=180&seq=monitor1&orientation=landscape" 
              alt="Live Monitoring"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Protection Active</h2>
            <div className="text-sm text-gray-600" suppressHydrationWarning={true}>
              Monitoring since {currentTime.toLocaleTimeString()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{monitoringData.messagesScanned}</div>
              <div className="text-xs text-gray-600">Messages Scanned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{monitoringData.threatsDetected}</div>
              <div className="text-xs text-gray-600">Threats Detected</div>
            </div>
          </div>
        </div>

        {/* Monitor Toggle */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Real-time Protection</h3>
              <p className="text-xs text-gray-600">AI continuously scans for threats</p>
            </div>
            <button 
              onClick={() => setIsLiveMonitoring(!isLiveMonitoring)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                isLiveMonitoring ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                isLiveMonitoring ? 'transform translate-x-7' : 'transform translate-x-1'
              }`}></div>
            </button>
          </div>
        </div>

        {/* Monitoring Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-100">
            <i className="ri-mail-line text-2xl text-blue-500 mb-2"></i>
            <div className="text-lg font-bold text-blue-600">{monitoringData.emailsChecked}</div>
            <div className="text-xs text-gray-600">Emails Checked</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
            <i className="ri-instagram-line text-2xl text-purple-500 mb-2"></i>
            <div className="text-lg font-bold text-purple-600">{monitoringData.socialMediaPosts}</div>
            <div className="text-xs text-gray-600">Social Posts</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-red-100">
            <i className="ri-user-unfollow-line text-2xl text-red-500 mb-2"></i>
            <div className="text-lg font-bold text-red-600">{monitoringData.blockedUsers}</div>
            <div className="text-xs text-gray-600">Blocked Users</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-orange-100">
            <i className="ri-notification-line text-2xl text-orange-500 mb-2"></i>
            <div className="text-lg font-bold text-orange-600">{monitoringData.activeAlerts}</div>
            <div className="text-xs text-gray-600">Active Alerts</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.severity)}`}>
                    <i className={`${getActivityIcon(activity.type)} text-sm`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 mb-1">{activity.message}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                  <button className="!rounded-button bg-gray-500 text-white px-2 py-1 text-xs">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/threat-detection" className="!rounded-button bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 text-center">
            <i className="ri-search-eye-line text-2xl mb-2"></i>
            <div className="text-sm font-medium">View Threats</div>
          </Link>
          <Link href="/cyberstalking" className="!rounded-button bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 text-center">
            <i className="ri-user-search-line text-2xl mb-2"></i>
            <div className="text-sm font-medium">Check Stalking</div>
          </Link>
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
          <Link href="/monitoring" className="flex flex-col items-center justify-center py-2 text-indigo-600">
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
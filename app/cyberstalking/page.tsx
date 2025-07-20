
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CyberStalkingPage() {
  const [selectedTab, setSelectedTab] = useState('activity');
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const suspiciousActivity = [
    {
      id: 1,
      type: 'Story Views',
      user: '@mystery_user_123',
      count: 15,
      timespan: 'Last 3 days',
      risk: 'High',
      details: 'Viewed all your stories multiple times'
    },
    {
      id: 2,
      type: 'Old Posts',
      user: '@fake_profile_99',
      count: 8,
      timespan: 'Last week',
      risk: 'Medium',
      details: 'Liked posts from 6 months ago'
    },
    {
      id: 3,
      type: 'Excessive Likes',
      user: '@suspicious_acc',
      count: 25,
      timespan: 'Yesterday',
      risk: 'High',
      details: 'Liked 25 posts in 10 minutes'
    }
  ];

  const fakeAccounts = [
    {
      id: 1,
      username: '@fake_girl_2024',
      followers: 12,
      following: 2.4,
      posts: 3,
      flags: ['No profile pic', 'Recent signup', 'Low activity'],
      risk: 'High'
    },
    {
      id: 2,
      username: '@random_user_789',
      followers: 45,
      following: 1.2,
      posts: 0,
      flags: ['No posts', 'Generic name', 'Mass following'],
      risk: 'Medium'
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Low': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleBlockUser = (user) => {
    setSelectedUser(user);
    setShowBlockModal(true);
  };

  const confirmBlock = () => {
    if (selectedUser) {
      setBlockedUsers([...blockedUsers, selectedUser]);
      setShowBlockModal(false);
      setSelectedUser(null);
    }
  };

  const cancelBlock = () => {
    setShowBlockModal(false);
    setSelectedUser(null);
  };

  const handleReportAndSave = (activity) => {
    // Auto-save evidence and generate report
    console.log('Report and save:', activity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-purple-100 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            <span className="font-medium text-gray-700">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-purple-600">Cyberstalking Protection</h1>
          <div className="w-8"></div>
        </div>
      </nav>

      <div className="pt-20 pb-24 px-4">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <img 
            src="https://readdy.ai/api/search-image?query=Digital%20security%20shield%20protecting%20woman%20from%20cyberstalking%2C%20social%20media%20privacy%20protection%2C%20online%20safety%20illustration%2C%20purple%20and%20blue%20colors%2C%20modern%20minimalist%20design%2C%20cyber%20security%20concept&width=300&height=180&seq=cyber1&orientation=landscape" 
            alt="Cyberstalking Protection"
            className="w-full h-36 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Stay Protected Online</h2>
          <p className="text-gray-600 text-xs px-4">AI monitors your social media for suspicious behavior patterns</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/70 backdrop-blur-sm rounded-full p-1 mb-6 border border-purple-100">
          <button 
            onClick={() => setSelectedTab('activity')}
            className={`flex-1 py-2 px-1 rounded-full text-sm font-medium transition-all ${
              selectedTab === 'activity' 
                ? 'bg-purple-500 text-white' 
                : 'text-gray-600'
            }`}
          >
            Suspicious Activity
          </button>
          <button 
            onClick={() => setSelectedTab('accounts')}
            className={`flex-1 py-2 px-1 rounded-full text-sm font-medium transition-all ${
              selectedTab === 'accounts' 
                ? 'bg-purple-500 text-white' 
                : 'text-gray-600'
            }`}
          >
            Fake Accounts
          </button>
        </div>

        {/* Suspicious Activity Tab */}
        {selectedTab === 'activity' && (
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-eye-line text-purple-500 mr-2"></i>
                Detection Summary
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-red-600">3</div>
                  <div className="text-xs text-gray-600">High Risk</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-orange-600">2</div>
                  <div className="text-xs text-gray-600">Medium Risk</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{blockedUsers.length}</div>
                  <div className="text-xs text-gray-600">Blocked</div>
                </div>
              </div>
            </div>

            {suspiciousActivity.map((activity) => (
              <div key={activity.id} className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-red-100 ${
                blockedUsers.includes(activity.user) ? 'opacity-50' : ''
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800 text-sm">{activity.type}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(activity.risk)}`}>
                        {activity.risk} Risk
                      </span>
                      {blockedUsers.includes(activity.user) && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                          Blocked
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{activity.user}</div>
                    <div className="text-xs text-gray-500">{activity.timespan}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-purple-600">{activity.count}</div>
                    <div className="text-xs text-gray-500">times</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mb-3">
                  {activity.details}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleBlockUser(activity.user)}
                    disabled={blockedUsers.includes(activity.user)}
                    className={`!rounded-button px-3 py-1 text-xs flex-1 ${
                      blockedUsers.includes(activity.user) 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {blockedUsers.includes(activity.user) ? 'Blocked' : 'Block User'}
                  </button>
                  <button 
                    onClick={() => handleReportAndSave(activity)}
                    className="!rounded-button bg-gray-500 text-white px-3 py-1 text-xs flex-1"
                  >
                    Report & Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fake Accounts Tab */}
        {selectedTab === 'accounts' && (
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-user-search-line text-orange-500 mr-2"></i>
                AI Detection Results
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-orange-600">2</div>
                  <div className="text-xs text-gray-600">Suspicious Requests</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">97%</div>
                  <div className="text-xs text-gray-600">Detection Accuracy</div>
                </div>
              </div>
            </div>

            {fakeAccounts.map((account) => (
              <div key={account.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-white text-lg"></i>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{account.username}</div>
                      <div className="text-xs text-gray-600">
                        {account.followers} followers • {account.following}k following • {account.posts} posts
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(account.risk)}`}>
                    {account.risk}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-2">Red Flags:</div>
                  <div className="flex flex-wrap gap-1">
                    {account.flags.map((flag, index) => (
                      <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="!rounded-button bg-red-500 text-white px-3 py-1 text-xs flex-1">
                    Decline & Block
                  </button>
                  <button className="!rounded-button bg-blue-500 text-white px-3 py-1 text-xs flex-1">
                    Report Profile
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-100">
              <div className="text-center">
                <i className="ri-shield-check-line text-3xl text-green-500 mb-2"></i>
                <div className="font-medium text-gray-800 text-sm mb-1">Auto-Protection Active</div>
                <div className="text-xs text-gray-600">Suspicious requests are automatically filtered</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Block Confirmation Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-unfollow-line text-2xl text-red-500"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Block User?</h3>
              <p className="text-sm text-gray-600">
                Block <span className="font-medium text-red-600">{selectedUser}</span> from viewing your content and contacting you?
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <i className="ri-check-line text-green-500"></i>
                <span>User will be blocked on all platforms</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <i className="ri-check-line text-green-500"></i>
                <span>Evidence will be saved automatically</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <i className="ri-check-line text-green-500"></i>
                <span>You can unblock later from settings</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={cancelBlock}
                className="!rounded-button flex-1 bg-gray-200 text-gray-700 py-3 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={confirmBlock}
                className="!rounded-button flex-1 bg-red-500 text-white py-3 font-medium"
              >
                Block User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-pink-100 z-50">
        <div className="grid grid-cols-4 py-2">
          <Link href="/" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-home-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/monitoring" className="flex flex-col items-center justify-center py-2 text-purple-600">
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

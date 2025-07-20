
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authService } from '../../lib/auth';
import { db } from '../../lib/database';
import { alertService } from '../../lib/alertService';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [trustedContacts, setTrustedContacts] = useState([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    priority: 1
  });
  const [settings, setSettings] = useState({
    realTimeMonitoring: true,
    instantAlerts: true,
    autoEvidence: true,
    locationSharing: true,
    aiSensitivity: 'medium',
    alertSound: true,
    vibration: true
  });
  const [testingAlerts, setTestingAlerts] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(currentUser);
    setTrustedContacts(currentUser.emergencyContacts || []);
    setSettings({ ...settings, ...currentUser.settings });
  }, [router]);

  const toggleSetting = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    setSettings(newSettings);
    
    // Update in database
    if (user) {
      const updatedUser = { ...user, settings: newSettings };
      db.users[user.email] = updatedUser;
      db.saveToStorage('rakshika_users', db.users);
    }
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone || !newContact.email) return;

    const contact = db.addEmergencyContact(user.email, newContact);
    if (contact) {
      setTrustedContacts([...trustedContacts, contact]);
      setNewContact({ name: '', phone: '', email: '', priority: 1 });
      setShowAddContact(false);
    }
  };

  const removeContact = (contactId) => {
    const updatedContacts = trustedContacts.filter(c => c.id !== contactId);
    setTrustedContacts(updatedContacts);
    db.updateEmergencyContacts(user.email, updatedContacts);
  };

  const testAlerts = async () => {
    setTestingAlerts(true);
    try {
      const result = await alertService.testAlerts(user.email);
      if (result.success) {
        alert('Test alerts sent successfully!');
      } else {
        alert('Failed to send test alerts: ' + result.error);
      }
    } catch (error) {
      alert('Error testing alerts');
    } finally {
      setTestingAlerts(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            <span className="font-medium text-gray-700">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Settings</h1>
          <div className="w-8"></div>
        </div>
      </nav>

      <div className="pt-20 pb-24 px-4 max-w-md mx-auto">
        {/* Profile Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <i className="ri-user-line text-white text-2xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500">Protected since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">{Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days</div>
              <div className="text-xs text-gray-600">Protected</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">{trustedContacts.length}</div>
              <div className="text-xs text-gray-600">Contacts</div>
            </div>
          </div>
        </div>

        {/* Trusted Contacts */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-pink-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Emergency Contacts</h3>
            <button 
              onClick={() => setShowAddContact(true)}
              className="!rounded-button bg-pink-500 text-white px-3 py-1 text-xs"
            >
              Add Contact
            </button>
          </div>
          
          {trustedContacts.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <i className="ri-user-add-line text-2xl mb-2"></i>
              <p className="text-sm">No emergency contacts added yet</p>
              <p className="text-xs">Add contacts to receive alerts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {trustedContacts.map((contact, index) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{contact.priority}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-800">{contact.name}</div>
                      <div className="text-xs text-gray-600">{contact.phone}</div>
                      <div className="text-xs text-gray-500">{contact.email}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeContact(contact.id)}
                    className="!rounded-button bg-red-500 text-white px-2 py-1 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {trustedContacts.length > 0 && (
            <button 
              onClick={testAlerts}
              disabled={testingAlerts}
              className="w-full mt-4 !rounded-button bg-blue-500 text-white py-2 text-sm disabled:opacity-50"
            >
              {testingAlerts ? 'Testing...' : 'Test Emergency Alerts'}
            </button>
          )}
        </div>

        {/* Protection Settings */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-purple-100">
          <h3 className="font-semibold text-gray-800 mb-4">Protection Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-gray-800">Real-time Monitoring</div>
                <div className="text-xs text-gray-600">Continuously scan messages and emails</div>
              </div>
              <button 
                onClick={() => toggleSetting('realTimeMonitoring')}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  settings.realTimeMonitoring ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  settings.realTimeMonitoring ? 'transform translate-x-7' : 'transform translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-gray-800">Instant Alerts</div>
                <div className="text-xs text-gray-600">Notify trusted contacts immediately</div>
              </div>
              <button 
                onClick={() => toggleSetting('instantAlerts')}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  settings.instantAlerts ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  settings.instantAlerts ? 'transform translate-x-7' : 'transform translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-gray-800">Auto Evidence Collection</div>
                <div className="text-xs text-gray-600">Automatically save threats as evidence</div>
              </div>
              <button 
                onClick={() => toggleSetting('autoEvidence')}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  settings.autoEvidence ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  settings.autoEvidence ? 'transform translate-x-7' : 'transform translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-gray-800">Location Sharing</div>
                <div className="text-xs text-gray-600">Share location during emergencies</div>
              </div>
              <button 
                onClick={() => toggleSetting('locationSharing')}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  settings.locationSharing ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  settings.locationSharing ? 'transform translate-x-7' : 'transform translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-4">AI Detection Settings</h3>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-800">Sensitivity Level</span>
              <span className="text-xs text-blue-600 capitalize">{settings.aiSensitivity}</span>
            </div>
            <div className="flex space-x-2">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSettings(prev => ({ ...prev, aiSensitivity: level }))}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium ${
                    settings.aiSensitivity === level
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">Alert Sound</span>
              <button 
                onClick={() => toggleSetting('alertSound')}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  settings.alertSound ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  settings.alertSound ? 'transform translate-x-7' : 'transform translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">Vibration</span>
              <button 
                onClick={() => toggleSetting('vibration')}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  settings.vibration ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  settings.vibration ? 'transform translate-x-7' : 'transform translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Support & Info */}
        <div className="space-y-3 mb-6">
          <Link href="/help" className="block bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className="ri-question-line text-blue-500 text-lg"></i>
                <span className="text-sm font-medium text-gray-800">Help & Support</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </div>
          </Link>

          <Link href="/privacy" className="block bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className="ri-shield-check-line text-green-500 text-lg"></i>
                <span className="text-sm font-medium text-gray-800">Privacy Policy</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </div>
          </Link>

          <button onClick={handleLogout} className="w-full bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-red-100">
            <div className="flex items-center justify-center space-x-2">
              <i className="ri-logout-box-line text-red-500 text-lg"></i>
              <span className="text-sm font-medium text-red-600">Sign Out</span>
            </div>
          </button>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add Emergency Contact</h3>
            
            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Contact name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="contact@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newContact.priority}
                  onChange={(e) => setNewContact({...newContact, priority: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value={1}>1 - Highest (immediate alerts)</option>
                  <option value={2}>2 - High (all alerts)</option>
                  <option value={3}>3 - Medium (major alerts only)</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="!rounded-button flex-1 bg-gray-200 text-gray-700 py-3 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="!rounded-button flex-1 bg-pink-500 text-white py-3 font-medium"
                >
                  Add Contact
                </button>
              </div>
            </form>
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
          <Link href="/settings" className="flex flex-col items-center justify-center py-2 text-gray-600">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-settings-fill text-lg"></i>
            </div>
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

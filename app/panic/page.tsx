'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authService } from '../../lib/auth';
import { alertService } from '../../lib/alertService';
import { useRouter } from 'next/navigation';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  priority: string;
}

interface User {
  name: string;
  email: string;
  emergencyContacts: EmergencyContact[];
}

interface AlertResult {
  name: string;
  email?: { success: boolean; error?: string };
  sms?: { success: boolean; error?: string };
}

export default function PanicPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [alertSent, setAlertSent] = useState(false);
  const [alertResults, setAlertResults] = useState<AlertResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  const handlePanicActivation = async () => {
    if (!isActivated) {
      setIsActivated(true);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            sendEmergencyAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const sendEmergencyAlert = async () => {
    try {
      if (!user) return;

const result = await alertService.sendEmergencyAlert(user, 'panic', {

          location: await getCurrentLocation(),
          timestamp: new Date().toISOString(),
          message: 'Panic button activated - immediate assistance needed',
        }
      );

      setAlertResults(result.results || []);
      setAlertSent(true);
    } catch (error) {
      console.error('Failed to send emergency alert:', error);
      setAlertSent(true);
      setAlertResults([]);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(`${position.coords.latitude}, ${position.coords.longitude}`);
          },
          () => {
            resolve('Location unavailable');
          }
        );
      } else {
        resolve('Geolocation not supported');
      }
    });
  };

  const handleCancel = () => {
    setIsActivated(false);
    setCountdown(5);
    setAlertSent(false);
    setAlertResults([]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-red-100 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            <span className="font-medium text-gray-700">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-red-600">Emergency</h1>
          <div className="w-8"></div>
        </div>
      </nav>

      <div className="pt-20 pb-24 px-4 max-w-md mx-auto">
        {!isActivated && !alertSent && (
          <>
            {/* Panic Button */}
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="mb-8 text-center">
                <img 
                  src="https://readdy.ai/api/search-image?query=Emergency%20help%20button%20icon%2C%20red%20alert%20symbol%2C%20safety%20protection%2C%20urgent%20assistance%2C%20clean%20minimalist%20design%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20professional%20emergency%20services%20style&width=200&height=200&seq=panic1&orientation=squarish" 
                  alt="Emergency"
                  className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Emergency Help</h2>
                <p className="text-gray-600 text-sm px-8">Press and hold the button below to send silent alerts to your trusted contacts</p>
              </div>

              <button 
                onClick={handlePanicActivation}
                className="w-48 h-48 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform"
              >
                <div className="text-center">
                  <i className="ri-alarm-warning-fill text-6xl text-white mb-2"></i>
                  <div className="text-white font-bold text-lg">PANIC</div>
                  <div className="text-white/80 text-xs">Press & Hold</div>
                </div>
              </button>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-red-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-contacts-line text-red-500 mr-2"></i>
                Emergency Contacts ({user.emergencyContacts?.length || 0})
              </h3>
              {user.emergencyContacts?.length > 0 ? (
                <div className="space-y-3">
                  {user.emergencyContacts.slice(0, 3).map((contact: EmergencyContact, index: number) => (
                    <div key={contact.id} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{contact.priority}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{contact.name}</div>
                        <div className="text-xs text-gray-600">{contact.phone}</div>
                      </div>
                      <div className="text-xs text-green-600">✓ Active</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="ri-user-add-line text-2xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-600">No emergency contacts added</p>
                  <Link href="/settings" className="text-xs text-red-600 underline">
                    Add contacts in Settings
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/settings" className="!rounded-button bg-white/70 backdrop-blur-sm border border-gray-200 p-4 text-center">
                <i className="ri-settings-line text-xl text-gray-600 mb-2"></i>
                <div className="text-sm font-medium text-gray-700">Settings</div>
              </Link>
              <Link href="/evidence" className="!rounded-button bg-white/70 backdrop-blur-sm border border-gray-200 p-4 text-center">
                <i className="ri-camera-line text-xl text-gray-600 mb-2"></i>
                <div className="text-sm font-medium text-gray-700">Evidence</div>
              </Link>
            </div>
          </>
        )}

        {isActivated && !alertSent && (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <span className="text-6xl font-bold text-white">{countdown}</span>
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Sending Alert...</h2>
              <p className="text-gray-600 text-sm">Notifying trusted contacts in {countdown} seconds</p>
              <div className="mt-4 text-xs text-gray-500">
                <div>• SMS alerts will be sent</div>
                <div>• Email notifications will be sent</div>
                <div>• Location will be shared</div>
              </div>
            </div>

            <button 
              onClick={handleCancel}
              className="!rounded-button bg-gray-600 text-white px-8 py-3 font-medium"
            >
              Cancel Alert
            </button>
          </div>
        )}

        {alertSent && (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line text-4xl text-white"></i>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Alert Sent!</h2>
              <p className="text-gray-600 text-sm mb-6">Your trusted contacts have been notified</p>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-green-100">
                <h4 className="font-medium text-gray-800 mb-3">Alert Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>SMS Alerts</span>
                    <span className="text-green-600">
                      ✓ Sent ({alertResults.filter((r) => r.sms?.success).length})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email Alerts</span>
                    <span className="text-green-600">
                      ✓ Sent ({alertResults.filter((r) => r.email?.success).length})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location Shared</span>
                    <span className="text-green-600">✓ Active</span>
                  </div>
                </div>

                {alertResults.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-xs font-medium text-gray-700 mb-2">Contacts Notified:</h5>
                    {alertResults.map((result, index) => (
                      <div key={index} className="text-xs text-gray-600">
                        • {result.name} {result.email?.error || result.sms?.error ? '(Failed)' : '(Success)'}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={handleCancel}
                className="!rounded-button bg-pink-500 text-white px-8 py-3 font-medium"
              >
                I'm Safe Now
              </button>
            </div>
          </div>
        )}
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
          <Link href="/evidence" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-folder-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Evidence</span>
          </Link>
          <Link href="/settings" className="flex flex-col items-center justify-center py-2 text-red-600">
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

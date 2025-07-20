'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { threatAI } from '../../lib/threatDetection';
import { alertService } from '../../lib/alertService';
import { authService } from '../../lib/auth';
import { db } from '../../lib/database';

export default function InstagramSimPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: '@mystery_user_123',
      content: 'Hey beautiful, I saw your story. You look amazing today.',
      timestamp: new Date().toISOString(),
      platform: 'Instagram',
      isRead: false
    },
    {
      id: 2,
      sender: '@unknown_follower',
      content: 'I know where you live. I drive by your house every day.',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      platform: 'Instagram',
      isRead: false
    },
    {
      id: 3,
      sender: '@fake_profile_99',
      content: 'Send me your number baby, I want to talk to you privately.',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      platform: 'Instagram',
      isRead: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [threats, setThreats] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Scan existing messages on load
    scanAllMessages();
  }, []);

  const scanAllMessages = async () => {
    setIsScanning(true);
    const detectedThreats = [];

    for (const message of messages) {
      const threat = threatAI.detectThreat(message.content, {
        sender: message.sender,
        timestamp: message.timestamp,
        platform: message.platform
      });

      if (threat.isThreat) {
        detectedThreats.push({
          ...threat,
          messageId: message.id,
          message: message
        });

        // Save threat to database
        const user = authService.getCurrentUser();
        if (user) {
          db.saveThreat(user.email, {
            type: 'message_threat',
            platform: message.platform,
            sender: message.sender,
            content: message.content,
            threat: threat,
            messageId: message.id
          });

          // Send alert for high severity threats
          if (threat.severity === 'high') {
            await alertService.sendThreatAlert(user.email, threat, message);
          }
        }
      }
    }

    setThreats(detectedThreats);
    setIsScanning(false);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: '@test_user',
      content: newMessage,
      timestamp: new Date().toISOString(),
      platform: 'Instagram',
      isRead: false
    };

    setMessages([...messages, message]);

    // Scan the new message
    const threat = threatAI.detectThreat(message.content, {
      sender: message.sender,
      timestamp: message.timestamp,
      platform: message.platform
    });

    if (threat.isThreat) {
      const newThreat = {
        ...threat,
        messageId: message.id,
        message: message
      };
      setThreats([...threats, newThreat]);

      // Save and alert
      const user = authService.getCurrentUser();
      if (user) {
        db.saveThreat(user.email, {
          type: 'message_threat',
          platform: message.platform,
          sender: message.sender,
          content: message.content,
          threat: threat,
          messageId: message.id
        });

        if (threat.severity === 'high') {
          await alertService.sendThreatAlert(user.email, threat, message);
        }
      }
    }

    setNewMessage('');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getMessageStyle = (messageId) => {
    const threat = threats.find(t => t.messageId === messageId);
    if (!threat) return 'border-gray-200';
    
    switch (threat.severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-200';
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
          <h1 className="text-lg font-bold text-pink-600">Instagram Simulator</h1>
          <div className="flex items-center space-x-2">
            {isScanning && <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>}
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-24 px-4 max-w-md mx-auto">
        {/* Threat Summary */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-red-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <i className="ri-alarm-warning-line text-red-500 mr-2"></i>
            AI Threat Analysis
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-red-600">{threats.filter(t => t.severity === 'high').length}</div>
              <div className="text-xs text-gray-600">High Risk</div>
            </div>
            <div>
              <div className="text-xl font-bold text-orange-600">{threats.filter(t => t.severity === 'medium').length}</div>
              <div className="text-xs text-gray-600">Medium Risk</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">{messages.length - threats.length}</div>
              <div className="text-xs text-gray-600">Safe</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <i className="ri-message-3-line text-purple-500 mr-2"></i>
            Direct Messages
          </h3>
          
          {messages.map((message) => {
            const threat = threats.find(t => t.messageId === message.id);
            return (
              <div key={message.id} className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 border-2 ${getMessageStyle(message.id)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-white text-sm"></i>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-800">{message.sender}</div>
                      <div className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>
                  {threat && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-700 mb-3">
                  {message.content}
                </div>
                
                {threat && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-xs font-medium text-red-800 mb-1">
                      ⚠️ Threat Detected: {threat.type}
                    </div>
                    <div className="text-xs text-red-700">
                      Confidence: {Math.round(threat.confidence * 100)}%
                    </div>
                    {threat.patterns.length > 0 && (
                      <div className="text-xs text-red-600 mt-1">
                        Patterns: {threat.patterns.slice(0, 2).join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-3">Test Message Detection</h4>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message to test AI detection..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="!rounded-button bg-pink-500 text-white px-4 py-2 text-sm"
            >
              Send
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            Try messages like: "I know where you live", "Send nudes", "You're so beautiful"
          </div>
        </div>

        {/* Sample Social Activity */}
        <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <i className="ri-eye-line text-purple-500 mr-2"></i>
            Suspicious Activity
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-800">@mystery_user_123</div>
                <div className="text-xs text-red-600">Viewed your story 15 times in 2 hours</div>
              </div>
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">HIGH RISK</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-800">@fake_profile_99</div>
                <div className="text-xs text-orange-600">Liked 8 old posts from last year</div>
              </div>
              <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">MEDIUM</span>
            </div>
          </div>
        </div>

        {/* Real-time Monitor Status */}
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">Real-time Protection Active</span>
          </div>
          <div className="text-xs text-green-700 text-center mt-1">
            All messages are being scanned by AI • Alerts sent automatically
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
          <Link href="/evidence" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-folder-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Evidence</span>
          </Link>
          <Link href="/settings" className="flex flex-col items-center justify-center py-2 text-pink-600">
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
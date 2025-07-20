'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LegalAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi! I'm your legal assistant. I can help you understand your rights, draft complaints, and guide you through legal procedures. What would you like assistance with today?",
      timestamp: '10:30'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const quickActions = [
    { id: 'harassment', title: 'Harassment Complaint', icon: 'ri-user-unfollow-line' },
    { id: 'cybercrime', title: 'Cybercrime Report', icon: 'ri-computer-line' },
    { id: 'stalking', title: 'Stalking Case', icon: 'ri-eye-off-line' },
    { id: 'threats', title: 'Threat Report', icon: 'ri-alarm-warning-line' }
  ];

  const legalTemplates = [
    {
      id: 1,
      title: 'Police Complaint - Harassment',
      description: 'File a complaint with local police for harassment cases',
      fields: ['Personal Details', 'Incident Description', 'Evidence List', 'Witness Information']
    },
    {
      id: 2,
      title: 'Cybercrime Portal Report',
      description: 'Report cybercrime to national cybercrime portal',
      fields: ['Victim Details', 'Cyber Crime Type', 'Financial Loss', 'Digital Evidence']
    },
    {
      id: 3,
      title: 'Court Application - Restraining Order',
      description: 'Apply for protection order from court',
      fields: ['Applicant Details', 'Respondent Details', 'Grounds for Order', 'Relief Sought']
    }
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        message: inputMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          message: "I understand your concern. Based on what you've described, I recommend filing a formal complaint. I can help you draft the necessary documents. Would you like me to prepare a template for you?",
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1500);
    }
  };

  const handleQuickAction = (actionId) => {
    const actionMessages = {
      harassment: "I can help you file a harassment complaint. This typically involves documenting the incidents, gathering evidence, and filing with the appropriate authorities. What specific type of harassment are you experiencing?",
      cybercrime: "For cybercrime cases, we need to report to the National Cybercrime Reporting Portal. I'll help you gather the required information and evidence. What type of cybercrime occurred?",
      stalking: "Stalking cases require detailed documentation of the stalker's behavior patterns. I can help you prepare a comprehensive complaint with timeline and evidence. Have you documented the stalking incidents?",
      threats: "Threat cases are serious and require immediate action. I'll help you file both police complaint and court application if needed. Do you have evidence of the threats?"
    };

    const newMessage = {
      id: messages.length + 1,
      type: 'bot',
      message: actionMessages[actionId],
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-green-100 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            <span className="font-medium text-gray-700">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-green-600">Legal Assistant</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">AI</span>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-32 px-4">
        {/* Chat Messages */}
        <div className="space-y-4 mb-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.type === 'user' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/70 backdrop-blur-sm border border-green-100'
              }`}>
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-2 ${msg.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Quick Legal Help</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button 
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className="!rounded-button bg-white/70 backdrop-blur-sm border border-green-100 p-3 text-left"
              >
                <i className={`${action.icon} text-green-500 text-lg mb-2`}></i>
                <div className="text-sm font-medium text-gray-800">{action.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Legal Templates */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Document Templates</h3>
          <div className="space-y-3">
            {legalTemplates.map((template) => (
              <div key={template.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm">{template.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                  </div>
                  <button className="!rounded-button bg-green-500 text-white px-3 py-1 text-xs">
                    Use Template
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  Includes: {template.fields.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Know Your Rights */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <i className="ri-scales-line text-blue-500 mr-2"></i>
            Know Your Rights
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start space-x-2">
              <i className="ri-check-line text-green-500 mt-0.5"></i>
              <span>Right to file complaint without harassment</span>
            </div>
            <div className="flex items-start space-x-2">
              <i className="ri-check-line text-green-500 mt-0.5"></i>
              <span>Right to protection from further harm</span>
            </div>
            <div className="flex items-start space-x-2">
              <i className="ri-check-line text-green-500 mt-0.5"></i>
              <span>Right to legal aid and counseling</span>
            </div>
            <div className="flex items-start space-x-2">
              <i className="ri-check-line text-green-500 mt-0.5"></i>
              <span>Right to privacy during proceedings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-green-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about legal procedures, rights, or get help with documents..."
            className="flex-1 bg-white/70 border border-green-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-green-400"
          />
          <button 
            onClick={handleSendMessage}
            className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center"
          >
            <i className="ri-send-plane-line"></i>
          </button>
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
          <Link href="/settings" className="flex flex-col items-center justify-center py-2 text-green-600">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-scales-fill text-lg"></i>
            </div>
            <span className="text-xs mt-1">Legal</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
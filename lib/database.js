'use client';

// Simulated database using localStorage for demo purposes
// In production, replace with real database like Firebase/Supabase

export class Database {
  constructor() {
    
    this.users = this.getFromStorage('rakshika_users') || {};
    this.sessions = this.getFromStorage('rakshika_sessions') || {};
    this.messages = this.getFromStorage('rakshika_messages') || {};
    this.threats = this.getFromStorage('rakshika_threats') || {};
    this.evidence = this.getFromStorage('rakshika_evidence') || {};
}

  getFromStorage(key) {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  saveToStorage(key, data) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  saveEvidence(userEmail, evidenceData) {
  const evidenceId = Date.now().toString();
  const evidenceItem = {
    id: evidenceId,
    userEmail,
    ...evidenceData,
    uploadedAt: new Date().toISOString(),
  };

  if (!this.evidence[userEmail]) {
    this.evidence[userEmail] = [];
  }
  this.evidence[userEmail].push(evidenceItem);
  this.saveToStorage('rakshika_evidence', this.evidence);
  return evidenceItem;
}

getEvidence(userEmail) {
  return this.evidence[userEmail] || [];
}

  // User Management
  createUser(email, password, name) {
    const userId = Date.now().toString();
    const user = {
      id: userId,
      email,
      password, // In production, hash this
      name,
      emergencyContacts: [],
      settings: {
        realTimeMonitoring: true,
        instantAlerts: true,
        autoEvidence: true,
        locationSharing: true,
        aiSensitivity: 'medium'
      },
      createdAt: new Date().toISOString()
    };
    
    this.users[email] = user;
    this.saveToStorage('rakshika_users', this.users);
    return user;
  }

  authenticateUser(email, password) {
    const user = this.users[email];
    if (user && user.password === password) {
      const sessionId = Date.now().toString();
      this.sessions[sessionId] = { userId: user.id, email, createdAt: new Date().toISOString() };
      this.saveToStorage('rakshika_sessions', this.sessions);
      return { user, sessionId };
    }
    return null;
  }

  getUser(email) {
    return this.users[email];
  }

  // Emergency Contacts
  addEmergencyContact(userEmail, contact) {
    const user = this.users[userEmail];
    if (user) {
      const contactId = Date.now().toString();
      const newContact = {
        id: contactId,
        ...contact,
        addedAt: new Date().toISOString()
      };
      user.emergencyContacts.push(newContact);
      this.saveToStorage('rakshika_users', this.users);
      return newContact;
    }
    return null;
  }

  updateEmergencyContacts(userEmail, contacts) {
    const user = this.users[userEmail];
    if (user) {
      user.emergencyContacts = contacts;
      this.saveToStorage('rakshika_users', this.users);
      return true;
    }
    return false;
  }

  // Messages and Threats
  saveMessage(userEmail, message) {
    const messageId = Date.now().toString();
    const messageData = {
      id: messageId,
      userEmail,
      ...message,
      timestamp: new Date().toISOString()
    };
    
    if (!this.messages[userEmail]) {
      this.messages[userEmail] = [];
    }
    this.messages[userEmail].push(messageData);
    this.saveToStorage('rakshika_messages', this.messages);
    return messageData;
  }

  saveThreat(userEmail, threat) {
    const threatId = Date.now().toString();
    const threatData = {
      id: threatId,
      userEmail,
      ...threat,
      timestamp: new Date().toISOString()
    };
    
    if (!this.threats[userEmail]) {
      this.threats[userEmail] = [];
    }
    this.threats[userEmail].push(threatData);
    this.saveToStorage('rakshika_threats', this.threats);
    return threatData;
  }

  getThreats(userEmail) {
    return this.threats[userEmail] || [];
  }

  getMessages(userEmail) {
    return this.messages[userEmail] || [];
  }
}

export const db = new Database();
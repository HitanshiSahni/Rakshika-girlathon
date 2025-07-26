'use client';

import { db } from './database';

export class AuthService {
  constructor() {
    this.currentUser = null;
    this.sessionId = null;
    this.loadSession();
  }

  loadSession() {
    if (typeof window !== 'undefined') {
      const sessionData = localStorage.getItem('rakshika_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        this.currentUser = {
          ...session.user,
          emergencyContacts: session.user.emergencyContacts || this.getDefaultEmergencyContacts()
        };
        this.sessionId = session.sessionId;
      }
    }
  }

  saveSession(user, sessionId) {
    if (typeof window !== 'undefined') {
      const userWithContacts = {
        ...user,
        emergencyContacts: user.emergencyContacts || this.getDefaultEmergencyContacts()
      };
      const sessionData = { user: userWithContacts, sessionId };
      localStorage.setItem('rakshika_session', JSON.stringify(sessionData));
      this.currentUser = userWithContacts;
      this.sessionId = sessionId;
    }
  }

  getDefaultEmergencyContacts() {
    return [
      {
        id: '1',
        name: 'Test Contact',
        phone: '+919999999999', 
        email: 'ashvini.bhure23@vit.edu', 
        priority: '1'
      }
    ];
  }

  async login(email, password) {
    try {
      const result = db.authenticateUser(email, password);
      if (result) {
        this.saveSession(result.user, result.sessionId);
        return { success: true, user: result.user };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  }

  async register(email, password, name) {
    try {
      const existingUser = db.getUser(email);
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }

      const user = db.createUser(email, password, name);
      const result = db.authenticateUser(email, password);

      if (result) {
        this.saveSession(result.user, result.sessionId);
        return { success: true, user: result.user };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rakshika_session');
      this.currentUser = null;
      this.sessionId = null;
    }
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

export const authService = new AuthService();

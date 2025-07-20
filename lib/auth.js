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
        this.currentUser = session.user;
        this.sessionId = session.sessionId;
      }
    }
  }

  saveSession(user, sessionId) {
    if (typeof window !== 'undefined') {
      const sessionData = { user, sessionId };
      localStorage.setItem('rakshika_session', JSON.stringify(sessionData));
      this.currentUser = user;
      this.sessionId = sessionId;
    }
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
      // Check if user already exists
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
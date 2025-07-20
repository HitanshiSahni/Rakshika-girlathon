'use client';

import { db } from './database';

export class AlertService {
  constructor() {
    this.apiKey = 'your-twilio-api-key'; // Replace with real API key
    this.emailService = 'your-email-service'; // Replace with real email service
  }

  // Send emergency alerts to all contacts
  async sendEmergencyAlert(userEmail, alertType, details = {}) {
    try {
      const user = db.getUser(userEmail);
      if (!user || !user.emergencyContacts.length) {
        console.error('No emergency contacts found');
        return { success: false, error: 'No emergency contacts' };
      }

      const results = [];
      
      // Send to each emergency contact
      for (const contact of user.emergencyContacts) {
        try {
          // Send SMS
          const smsResult = await this.sendSMS(contact.phone, this.createSMSMessage(user.name, alertType, details));
          
          // Send Email
          const emailResult = await this.sendEmail(contact.email, user.name, alertType, details);
          
          results.push({
            contactId: contact.id,
            name: contact.name,
            sms: smsResult,
            email: emailResult
          });
        } catch (error) {
          console.error(`Failed to alert ${contact.name}:`, error);
          results.push({
            contactId: contact.id,
            name: contact.name,
            error: error.message
          });
        }
      }

      // Log the alert
      db.saveThreat(userEmail, {
        type: 'emergency_alert',
        alertType,
        details,
        contactsAlerted: results.length,
        timestamp: new Date().toISOString()
      });

      return { success: true, results };
    } catch (error) {
      console.error('Emergency alert failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Send threat detection alert
  async sendThreatAlert(userEmail, threat, message) {
    try {
      const user = db.getUser(userEmail);
      if (!user || !user.settings.instantAlerts) {
        return { success: false, error: 'Alerts disabled' };
      }

      const alertMessage = `🚨 THREAT DETECTED for ${user.name}

Type: ${threat.type}
Severity: ${threat.severity}
Confidence: ${Math.round(threat.confidence * 100)}%

Message: "${message.content.substring(0, 100)}..."
From: ${message.sender}
Time: ${new Date(message.timestamp).toLocaleString()}

This is an automated alert from Rakshika Safety App.`;

      const results = [];
      
      // Send to priority contacts only for high severity
      const contactsToAlert = threat.severity === 'high' 
        ? user.emergencyContacts.filter(c => c.priority <= 2)
        : user.emergencyContacts.filter(c => c.priority === 1);

      for (const contact of contactsToAlert) {
        const smsResult = await this.sendSMS(contact.phone, alertMessage);
        results.push({
          contactId: contact.id,
          name: contact.name,
          result: smsResult
        });
      }

      return { success: true, results };
    } catch (error) {
      console.error('Threat alert failed:', error);
      return { success: false, error: error.message };
    }
  }

  // SMS sending function (simulated)
  async sendSMS(phoneNumber, message) {
    try {
      // In production, integrate with Twilio or similar service
      console.log(`SMS to ${phoneNumber}: ${message}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success/failure
      if (Math.random() > 0.1) { // 90% success rate
        return { success: true, messageId: Date.now().toString() };
      } else {
        throw new Error('SMS delivery failed');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Email sending function (simulated)
  async sendEmail(email, userName, alertType, details) {
    try {
      console.log(`Email to ${email}: ${alertType} alert for ${userName}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success/failure
      if (Math.random() > 0.05) { // 95% success rate
        return { success: true, messageId: Date.now().toString() };
      } else {
        throw new Error('Email delivery failed');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  createSMSMessage(userName, alertType, details) {
    const baseMessage = `🚨 EMERGENCY ALERT: ${userName} needs help!`;
    
    switch (alertType) {
      case 'panic':
        return `${baseMessage}

PANIC BUTTON ACTIVATED
Time: ${new Date().toLocaleString()}
${details.location ? `Location: ${details.location}` : ''}

This is an automated emergency alert from Rakshika Safety App. Please contact ${userName} immediately or call emergency services if you cannot reach them.`;

      case 'threat':
        return `${baseMessage}

THREAT DETECTED
Type: ${details.type}
Severity: ${details.severity}
Time: ${new Date().toLocaleString()}

${userName} may be in danger. Please check on them immediately.`;

      case 'cyberstalking':
        return `${baseMessage}

CYBERSTALKING DETECTED
Platform: ${details.platform}
Time: ${new Date().toLocaleString()}

Suspicious online activity detected. Please contact ${userName} to ensure their safety.`;

      default:
        return `${baseMessage}

Time: ${new Date().toLocaleString()}
Details: ${details.message || 'No additional details'}

Please contact ${userName} immediately to ensure their safety.`;
    }
  }

  // Test alert system
  async testAlerts(userEmail) {
    return await this.sendEmergencyAlert(userEmail, 'test', {
      message: 'This is a test alert to verify the emergency contact system is working.'
    });
  }
}

export const alertService = new AlertService();
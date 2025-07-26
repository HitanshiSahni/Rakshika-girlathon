// lib/alertService.js

export const alertService = {
  sendEmergencyAlert: async (user, alertType, data) => {
    try {
      const fixedAdminEmail = 'hingerutu05@gmail.com';

      // Get emergency contacts
      const contactEmails = user.emergencyContacts?.map(c => c.email).filter(Boolean) || [];
      const contactPhones = user.emergencyContacts?.map(c => c.phone).filter(Boolean) || [];

      const response = await fetch('/api/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails: [fixedAdminEmail, ...contactEmails],
          phones: contactPhones,
          message: `${data.message}\nLocation: ${data.location}\nTime: ${data.timestamp}`,
        }),
      });

      const result = await response.json();
      return {
        success: result.success,
        results: result.result || [],
      };
    } catch (error) {
      console.error('Error sending alert:', error);
      return {
        success: false,
        results: [],
      };
    }
  },
};

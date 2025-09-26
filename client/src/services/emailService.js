import { contactService } from './api';

// Email service for frontend
export const emailService = {
  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await contactService.submitContact(formData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to send email');
    }
  },

  // Send newsletter subscription
  subscribeNewsletter: async (email) => {
    try {
      const response = await contactService.submitContact({
        firstName: 'Newsletter',
        lastName: 'Subscriber',
        email: email,
        subject: 'Newsletter Subscription',
        message: 'User subscribed to newsletter',
        serviceInterest: 'newsletter'
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to subscribe to newsletter');
    }
  },

  // Send valuation request
  submitValuationRequest: async (valuationData) => {
    try {
      const response = await contactService.submitContact({
        firstName: valuationData.firstName,
        lastName: valuationData.lastName,
        email: valuationData.email,
        phone: valuationData.phone,
        company: valuationData.company,
        subject: 'Valuation Request',
        message: `Valuation Request Details:
        
Company: ${valuationData.company}
Industry: ${valuationData.industry}
Revenue: ${valuationData.revenue}
Employees: ${valuationData.employees}
Valuation Purpose: ${valuationData.purpose}
Timeline: ${valuationData.timeline}

Additional Notes: ${valuationData.notes || 'None'}`,
        serviceInterest: 'business-valuations-409a',
        budget: valuationData.budget,
        timeline: valuationData.timeline
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to submit valuation request');
    }
  }
};

// Email templates
export const emailTemplates = {
  contactConfirmation: (firstName, subject) => ({
    subject: 'Thank you for contacting YD Advisory',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #14b8a6; margin-bottom: 10px;">YD Advisory</h1>
          <p style="color: #666; font-size: 16px;">Your trusted partner in financial excellence</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #2d7a2d; margin-bottom: 20px;">Thank you for contacting us!</h2>
          <p>Dear ${firstName},</p>
          <p>Thank you for reaching out to YD Advisory. We have received your inquiry regarding <strong>"${subject}"</strong> and will get back to you within 24 hours.</p>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #14b8a6; margin-bottom: 15px;">What happens next?</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Our team will review your inquiry</li>
              <li>We'll prepare a personalized response</li>
              <li>You'll receive detailed information within 24 hours</li>
            </ul>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; background: #14b8a6; color: white; border-radius: 8px;">
          <h3 style="margin-bottom: 15px;">Need immediate assistance?</h3>
          <p style="margin: 5px 0;">📞 <strong>+971-528477349</strong></p>
          <p style="margin: 5px 0;">📧 <strong>Yashaswi.das@ydadvisory.ae</strong></p>
          <p style="margin: 5px 0;">🌐 <strong>www.ydadvisory.ae</strong></p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px;">
          <p>This email was sent from YD Advisory. If you didn't request this, please ignore this message.</p>
        </div>
      </div>
    `
  }),

  valuationConfirmation: (firstName, company) => ({
    subject: 'Valuation Request Received - YD Advisory',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #14b8a6; margin-bottom: 10px;">YD Advisory</h1>
          <p style="color: #666; font-size: 16px;">Business Valuation & Financial Advisory</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #2d7a2d; margin-bottom: 20px;">Valuation Request Received</h2>
          <p>Dear ${firstName},</p>
          <p>Thank you for your interest in our business valuation services for <strong>${company}</strong>. We have received your request and will begin the initial assessment.</p>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #14b8a6; margin-bottom: 15px;">Our Valuation Process:</h3>
            <ol style="color: #555; line-height: 1.6;">
              <li><strong>Initial Assessment</strong> - Review your requirements</li>
              <li><strong>Data Collection</strong> - Gather necessary financial information</li>
              <li><strong>Analysis</strong> - Apply DCF, market, and precedent transaction methods</li>
              <li><strong>Report Delivery</strong> - Comprehensive valuation report</li>
            </ol>
          </div>
          
          <p>Our valuation team will contact you within 24 hours to discuss your specific needs and provide a detailed proposal.</p>
        </div>
        
        <div style="text-align: center; padding: 20px; background: #14b8a6; color: white; border-radius: 8px;">
          <h3 style="margin-bottom: 15px;">Contact Our Valuation Team</h3>
          <p style="margin: 5px 0;">📞 <strong>+971-528477349</strong></p>
          <p style="margin: 5px 0;">📧 <strong>Yashaswi.das@ydadvisory.ae</strong></p>
        </div>
      </div>
    `
  })
};

export default emailService;

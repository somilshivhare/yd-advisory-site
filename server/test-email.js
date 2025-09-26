// Email Test Script
// Run with: node test-email.js

require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('🧪 Testing Email Configuration...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log(`EMAIL_SERVICE: ${process.env.EMAIL_SERVICE || 'Not set'}`);
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER || 'Not set'}`);
  console.log(`ADMIN_EMAIL: ${process.env.ADMIN_EMAIL || 'Not set'}`);
  console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? 'Set (hidden)' : 'Not set'}\n`);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ Email configuration incomplete!');
    console.log('Please set EMAIL_USER and EMAIL_PASS in your .env file\n');
    return;
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE || 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log('🔗 Testing email connection...');

    // Verify connection
    await transporter.verify();
    console.log('✅ Email connection successful!\n');

    // Send test email
    console.log('📧 Sending test email...');
    
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'YD Advisory - Outlook Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0078d4;">✅ Outlook Email Integration Test Successful!</h2>
          <p>This is a test email from your YD Advisory website using Outlook.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Service:</strong> ${process.env.EMAIL_SERVICE || 'hotmail'}</p>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            If you received this email, your Outlook email integration is working correctly!
          </p>
        </div>
      `
    };

    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log(`📬 Message ID: ${result.messageId}\n`);

    console.log('🎉 Email integration is working perfectly!');
    console.log('You can now use the contact form on your website.\n');

  } catch (error) {
    console.log('❌ Email test failed:');
    console.log(`Error: ${error.message}\n`);
    
    if (error.code === 'EAUTH') {
      console.log('🔐 Authentication failed. Please check:');
      console.log('- Email username and password are correct');
      console.log('- For Outlook: Use App Password (not regular password)');
      console.log('- 2-Factor Authentication is enabled on Microsoft account');
      console.log('- SMTP authentication is enabled\n');
    } else if (error.code === 'ECONNECTION') {
      console.log('🌐 Connection failed. Please check:');
      console.log('- Internet connection');
      console.log('- Outlook/Hotmail service is available');
      console.log('- Firewall allows port 587\n');
    }
  }
}

// Run the test
testEmail().catch(console.error);

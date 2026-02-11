const nodemailer = require('nodemailer');

// Debug: Check if nodemailer is loaded correctly
console.log('📦 Nodemailer loaded:', typeof nodemailer);
console.log('📦 createTransport exists:', typeof nodemailer.createTransport);

// Create reusable transporter
const createTransporter = () => {
  // Validate email configuration
  if (!process.env.EMAIL_USER) {
    console.error('❌ Email configuration missing!');
    console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'NOT SET');
    throw new Error('EMAIL_USER environment variable is required.');
  }

  // Check if using SendGrid or Gmail
  const useSendGrid = process.env.SENDGRID_API_KEY;

  if (useSendGrid) {
    console.log('📧 Using SendGrid for email delivery');
    console.log('📧 SendGrid API Key:', process.env.SENDGRID_API_KEY ? `Set (${process.env.SENDGRID_API_KEY.substring(0, 10)}...)` : 'NOT SET');

    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'apikey', // This is literal 'apikey', not a variable
        pass: process.env.SENDGRID_API_KEY
      }
    });
  } else {
    // Fallback to Gmail (works locally, may not work on Render)
    if (!process.env.EMAIL_PASS) {
      console.error('❌ EMAIL_PASS not set!');
      throw new Error('EMAIL_PASS environment variable is required for Gmail.');
    }

    console.log('📧 Using Gmail for email delivery (may not work on cloud hosting)');
    console.log('📧 Creating email transporter with:', {
      service: 'gmail',
      user: process.env.EMAIL_USER,
      passLength: process.env.EMAIL_PASS?.length || 0
    });

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
};

// Send contact form email
const sendContactEmail = async (contactData) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `Portfolio Contact: ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4a90e2; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
          ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
          <p><strong>Subject:</strong> ${contactData.subject}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message:</h3>
          <p style="background-color: #fff; padding: 15px; border-left: 4px solid #4a90e2; margin: 10px 0;">
            ${contactData.message}
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>Received on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };

  try {
    console.log('📤 Sending contact email to:', process.env.EMAIL_USER);

    // Verify transporter configuration (skip for SendGrid as it may timeout)
    if (!process.env.SENDGRID_API_KEY) {
      console.log('🔍 Verifying transporter...');
      await transporter.verify();
      console.log('✅ Transporter verified successfully!');
    }

    // Send email with timeout
    console.log('📨 Attempting to send email...');
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Email sending timeout after 30 seconds')), 30000)
    );

    const info = await Promise.race([sendPromise, timeoutPromise]);

    console.log('✅ Email sent successfully! Message ID:', info.messageId);
    console.log('📧 Email info:', {
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error command:', error.command);
    console.error('❌ Error response:', error.response);
    console.error('❌ Error responseCode:', error.responseCode);

    // Provide helpful error messages
    if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
      console.error('\n⚠️  CONNECTION TIMEOUT ERROR');
      console.error('Possible causes:');
      console.error('1. Invalid SendGrid API key');
      console.error('2. Sender email not verified in SendGrid');
      console.error('3. Network connectivity issues');
      console.error('4. SendGrid service issues');
      console.error('\n💡 Solutions:');
      console.error('- Verify sender email at: https://app.sendgrid.com/settings/sender_auth');
      console.error('- Check API key at: https://app.sendgrid.com/settings/api_keys');
      console.error('- Ensure API key has "Mail Send" permissions\n');
    }

    if (error.code === 'EAUTH' || error.responseCode === 401) {
      console.error('\n⚠️  AUTHENTICATION ERROR');
      console.error('Your SendGrid API key is invalid or expired.');
      console.error('Generate a new API key at: https://app.sendgrid.com/settings/api_keys\n');
    }

    if (error.responseCode === 403) {
      console.error('\n⚠️  SENDER NOT VERIFIED');
      console.error('You must verify your sender email in SendGrid.');
      console.error('Go to: https://app.sendgrid.com/settings/sender_auth\n');
    }

    throw error;
  }
};

// Send auto-reply to sender
const sendAutoReply = async (recipientEmail, recipientName) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Thank you for reaching out!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${recipientName},</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          Thank you for contacting me through my portfolio website. 
          I have received your message and will get back to you as soon as possible.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          I typically respond within 24-48 hours. If your matter is urgent, 
          feel free to reach out to me directly.
        </p>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0; color: #666;">Best regards,</p>
          <p style="margin: 5px 0; font-weight: bold; color: #333;">Harsh Sharma</p>
          <p style="margin: 0; color: #666;">Software Engineer</p>
        </div>
      </div>
    `
  };

  try {
    console.log('📤 Sending auto-reply to:', recipientEmail);
    await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply sent successfully to:', recipientEmail);
  } catch (error) {
    console.error('❌ Auto-reply sending error:', error.message);
    // Don't throw error for auto-reply failure
  }
};

module.exports = {
  sendContactEmail,
  sendAutoReply
};

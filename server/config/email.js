const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
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
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
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
    await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent to:', recipientEmail);
  } catch (error) {
    console.error('Auto-reply sending error:', error);
    // Don't throw error for auto-reply failure
  }
};

module.exports = {
  sendContactEmail,
  sendAutoReply
};

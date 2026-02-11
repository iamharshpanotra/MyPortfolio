const nodemailer = require('nodemailer');
const axios = require('axios');

const EMAIL_SEND_TIMEOUT_MS = Number(process.env.EMAIL_SEND_TIMEOUT_MS || 15000);

// Create reusable transporter (SMTP fallback only)
const createTransporter = () => {
  if (!process.env.EMAIL_USER) {
    throw new Error('EMAIL_USER environment variable is required.');
  }

  if (!process.env.EMAIL_PASS) {
    throw new Error('EMAIL_PASS environment variable is required for SMTP fallback.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    connectionTimeout: EMAIL_SEND_TIMEOUT_MS,
    greetingTimeout: EMAIL_SEND_TIMEOUT_MS,
    socketTimeout: EMAIL_SEND_TIMEOUT_MS
  });
};

const sendWithSendGridApi = async ({ to, subject, html, replyTo }) => {
  if (!process.env.EMAIL_USER) {
    throw new Error('EMAIL_USER environment variable is required.');
  }

  const payload = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: process.env.EMAIL_USER },
    subject,
    content: [{ type: 'text/html', value: html }]
  };

  if (replyTo) {
    payload.reply_to = { email: replyTo };
  }

  const response = await axios.post(
    'https://api.sendgrid.com/v3/mail/send',
    payload,
    {
      timeout: EMAIL_SEND_TIMEOUT_MS,
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return {
    success: true,
    messageId: response.headers['x-message-id'] || null
  };
};

const sendWithSmtpFallback = async (mailOptions) => {
  const transporter = createTransporter();
  const sendPromise = transporter.sendMail(mailOptions);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error(`Email sending timeout after ${EMAIL_SEND_TIMEOUT_MS}ms`)),
      EMAIL_SEND_TIMEOUT_MS
    );
  });

  return Promise.race([sendPromise, timeoutPromise]);
};

const normalizeEmailError = (error) => {
  if (error.response) {
    error.responseCode = error.response.status;
    error.responseBody = error.response.data;
  }
  return error;
};

const logEmailError = (error) => {
  console.error('Email sending error:', error.message);
  console.error('Error code:', error.code);
  console.error('Error responseCode:', error.responseCode);
  if (error.responseBody) {
    console.error('Error responseBody:', JSON.stringify(error.responseBody));
  }

  if (error.code === 'ETIMEDOUT' || (error.message || '').toLowerCase().includes('timeout')) {
    console.error('Connection timeout while sending email.');
  }

  if (error.code === 'EAUTH' || error.responseCode === 401) {
    console.error('Authentication failed. Check SENDGRID_API_KEY permissions/validity.');
  }

  if (error.responseCode === 403) {
    console.error('Sender not verified in SendGrid. Verify EMAIL_USER sender identity.');
  }
};

// Send contact form email to site owner
const sendContactEmail = async (contactData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact: ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4a90e2; padding-bottom: 10px;">New Contact Form Submission</h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
          ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
          <p><strong>Subject:</strong> ${contactData.subject}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message:</h3>
          <p style="background-color: #fff; padding: 15px; border-left: 4px solid #4a90e2; margin: 10px 0;">${contactData.message}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>Received on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };

  try {
    console.log('Sending contact email to:', process.env.EMAIL_USER);

    if (process.env.SENDGRID_API_KEY) {
      console.log('Using SendGrid Web API for email delivery');
      return await sendWithSendGridApi({
        to: process.env.EMAIL_USER,
        subject: mailOptions.subject,
        html: mailOptions.html,
        replyTo: contactData.email
      });
    }

    console.log('Using SMTP fallback for email delivery');
    const info = await sendWithSmtpFallback(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    normalizeEmailError(error);
    logEmailError(error);
    throw error;
  }
};

// Send auto-reply to sender
const sendAutoReply = async (recipientEmail, recipientName) => {
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
    console.log('Sending auto-reply to:', recipientEmail);

    if (process.env.SENDGRID_API_KEY) {
      await sendWithSendGridApi({
        to: recipientEmail,
        subject: mailOptions.subject,
        html: mailOptions.html
      });
    } else {
      await sendWithSmtpFallback(mailOptions);
    }

    console.log('Auto-reply sent successfully to:', recipientEmail);
  } catch (error) {
    normalizeEmailError(error);
    logEmailError(error);
    // Do not fail contact flow if auto-reply fails.
  }
};

module.exports = {
  sendContactEmail,
  sendAutoReply
};

const nodemailer = require('nodemailer');
const axios = require('axios');

const EMAIL_SEND_TIMEOUT_MS = Number(process.env.EMAIL_SEND_TIMEOUT_MS || 15000);
const OWNER_EMAIL = 'iamharshpanotra@gmail.com';

const buildContactHtml = (contactData) => `
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
`;

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER and EMAIL_PASS are required for SMTP fallback.');
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

const sendWithSendGridApi = async ({ to, subject, html, contactEmail, contactName }) => {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is required for SendGrid delivery.');
  }

  const payload = {
    personalizations: [{ to: [{ email: to }] }],
    from: {
      email: OWNER_EMAIL,
      name: contactName ? `${contactName} via Portfolio` : 'Portfolio Contact Form'
    },
    subject,
    content: [{ type: 'text/html', value: html }],
    reply_to: contactEmail ? { email: contactEmail } : undefined,
    headers: contactEmail ? { 'X-Contact-Email': contactEmail } : undefined
  };

  const response = await axios.post('https://api.sendgrid.com/v3/mail/send', payload, {
    timeout: EMAIL_SEND_TIMEOUT_MS,
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

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

const sendContactEmail = async (contactData) => {
  const ownerEmail = OWNER_EMAIL;
  const subject = `Portfolio Contact: ${contactData.subject}`;
  const html = buildContactHtml(contactData);

  try {
    if (process.env.SENDGRID_API_KEY) {
      return await sendWithSendGridApi({
        to: ownerEmail,
        subject,
        html,
        contactEmail: contactData.email,
        contactName: contactData.name
      });
    }

    // SMTP fallback: show visitor as From, but keep authenticated sender for deliverability.
    const info = await sendWithSmtpFallback({
      to: ownerEmail,
      from: `${contactData.name} <${contactData.email}>`,
      sender: OWNER_EMAIL,
      replyTo: contactData.email,
      subject,
      html
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    if (error.response) {
      error.responseCode = error.response.status;
      error.responseBody = error.response.data;
    }
    throw error;
  }
};

const sendAutoReply = async (recipientEmail, recipientName) => {
  const subject = 'Thank you for reaching out!';
  const html = `
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
  `;

  try {
    if (process.env.SENDGRID_API_KEY) {
      await sendWithSendGridApi({
        to: recipientEmail,
        subject,
        html
      });
      return;
    }

    await sendWithSmtpFallback({
      to: recipientEmail,
      from: OWNER_EMAIL,
      subject,
      html
    });
  } catch (error) {
    // Do not fail contact submission if auto-reply fails.
    console.error('Auto-reply sending error:', error.message);
  }
};

module.exports = {
  sendContactEmail,
  sendAutoReply
};

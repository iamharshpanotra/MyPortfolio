require('dotenv').config();
const sgMail = require('@sendgrid/mail');

console.log('🧪 Testing SendGrid Web API (HTTP)...\n');

// Check environment variables
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? `Set (${process.env.SENDGRID_API_KEY.substring(0, 15)}...)` : 'NOT SET');
console.log('');

if (!process.env.EMAIL_USER || !process.env.SENDGRID_API_KEY) {
    console.error('❌ EMAIL_USER or SENDGRID_API_KEY not set in .env file');
    process.exit(1);
}

// Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Prepare email
const msg = {
    to: process.env.EMAIL_USER,
    from: process.env.EMAIL_USER,
    subject: 'SendGrid Web API Test',
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>✅ SendGrid Web API Test Successful!</h2>
      <p>This email was sent using SendGrid's <strong>Web API (HTTP)</strong>, not SMTP.</p>
      <p>This method works perfectly on Render and other cloud platforms that block SMTP ports!</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    </div>
  `
};

console.log('📤 Sending test email via SendGrid Web API...');
console.log('From:', msg.from);
console.log('To:', msg.to);
console.log('');

sgMail
    .send(msg)
    .then((response) => {
        console.log('✅ Email sent successfully!');
        console.log('Status Code:', response[0].statusCode);
        console.log('Status Message:', response[0].statusMessage || 'OK');
        console.log('Message ID:', response[0].headers['x-message-id']);
        console.log('');
        console.log('📬 Check your inbox:', process.env.EMAIL_USER);
        console.log('(Also check Spam folder!)');
        console.log('');
        console.log('🎉 SendGrid Web API is working correctly!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Email sending FAILED!');
        console.error('');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);

        if (error.response) {
            console.error('Response status:', error.response.statusCode);
            console.error('Response body:', JSON.stringify(error.response.body, null, 2));
        }

        console.error('');
        console.error('📝 Troubleshooting:');

        if (error.code === 403 || (error.response && error.response.statusCode === 403)) {
            console.error('⚠️  SENDER NOT VERIFIED');
            console.error('1. Go to: https://app.sendgrid.com/settings/sender_auth');
            console.error('2. Click "Verify a Single Sender"');
            console.error('3. Verify:', process.env.EMAIL_USER);
            console.error('4. Check your email for verification link');
        } else if (error.code === 401 || (error.response && error.response.statusCode === 401)) {
            console.error('⚠️  INVALID API KEY');
            console.error('1. Go to: https://app.sendgrid.com/settings/api_keys');
            console.error('2. Create a new API key with "Mail Send" or "Full Access"');
            console.error('3. Update SENDGRID_API_KEY in your .env file');
        } else {
            console.error('⚠️  UNKNOWN ERROR');
            console.error('Check SendGrid dashboard for more details:');
            console.error('https://app.sendgrid.com/email_activity');
        }

        process.exit(1);
    });

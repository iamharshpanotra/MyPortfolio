require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Testing SendGrid Configuration...\n');

// Check environment variables
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? `Set (${process.env.SENDGRID_API_KEY.substring(0, 15)}...)` : 'NOT SET');
console.log('');

if (!process.env.EMAIL_USER || !process.env.SENDGRID_API_KEY) {
    console.error('❌ EMAIL_USER or SENDGRID_API_KEY not set in .env file');
    process.exit(1);
}

// Create transporter
console.log('📧 Creating SendGrid transporter...');
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
    }
});

console.log('✅ Transporter created');
console.log('');

// Send test email with timeout
console.log('📤 Sending test email...');
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'SendGrid Test Email',
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>✅ SendGrid Configuration Test Successful!</h2>
      <p>This is a test email from your portfolio backend using SendGrid.</p>
      <p>If you're seeing this, your SendGrid configuration is working correctly!</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    </div>
  `
};

const sendPromise = transporter.sendMail(mailOptions);
const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout after 30 seconds')), 30000)
);

Promise.race([sendPromise, timeoutPromise])
    .then(info => {
        console.log('\n✅ Test email SENT successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        console.log('Accepted:', info.accepted);
        console.log('Rejected:', info.rejected);
        console.log('\n📬 Check your inbox:', process.env.EMAIL_USER);
        console.log('(Also check Spam folder!)');
        process.exit(0);
    })
    .catch(error => {
        console.error('\n❌ Test email FAILED!');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
        console.error('Response:', error.response);
        console.error('ResponseCode:', error.responseCode);

        console.error('\n📝 Troubleshooting:');

        if (error.message.includes('Timeout') || error.code === 'ETIMEDOUT') {
            console.error('1. ⚠️  TIMEOUT - Possible causes:');
            console.error('   - Invalid API key');
            console.error('   - Sender email not verified in SendGrid');
            console.error('   - Network issues');
            console.error('\n2. 🔧 Solutions:');
            console.error('   - Verify your sender email: https://app.sendgrid.com/settings/sender_auth');
            console.error('   - Check your API key: https://app.sendgrid.com/settings/api_keys');
            console.error('   - Ensure API key has "Mail Send" or "Full Access" permissions');
        }

        if (error.code === 'EAUTH' || error.responseCode === 401) {
            console.error('1. ⚠️  AUTHENTICATION ERROR');
            console.error('   Your SendGrid API key is invalid or expired.');
            console.error('\n2. 🔧 Solution:');
            console.error('   Generate a new API key at: https://app.sendgrid.com/settings/api_keys');
        }

        if (error.responseCode === 403) {
            console.error('1. ⚠️  SENDER NOT VERIFIED');
            console.error('   You must verify your sender email in SendGrid.');
            console.error('\n2. 🔧 Solution:');
            console.error('   Go to: https://app.sendgrid.com/settings/sender_auth');
            console.error('   Click "Verify a Single Sender" and verify:', process.env.EMAIL_USER);
        }

        process.exit(1);
    });

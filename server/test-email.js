require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Testing Gmail Configuration...\n');

// Check environment variables
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? `Set (${process.env.EMAIL_PASS.length} characters)` : 'NOT SET');
console.log('');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ EMAIL_USER or EMAIL_PASS not set in .env file');
    process.exit(1);
}

// Create transporter
console.log('📧 Creating transporter...');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection
console.log('🔍 Verifying connection to Gmail...');
transporter.verify(function (error, success) {
    if (error) {
        console.error('\n❌ Verification FAILED!');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
        console.error('Command:', error.command);
        console.error('\n📝 Common Issues:');
        console.error('1. Wrong app password - Generate a new one at https://myaccount.google.com/apppasswords');
        console.error('2. 2-Step Verification not enabled - Enable it at https://myaccount.google.com/security');
        console.error('3. App password has spaces or dashes - Remove them (should be 16 lowercase letters)');
        console.error('4. Using regular password instead of app password');
        process.exit(1);
    } else {
        console.log('\n✅ Verification SUCCESSFUL!');
        console.log('Gmail is ready to send emails!');
        console.log('\n📤 Sending test email...');

        // Send test email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Test Email from Portfolio Backend',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ Email Configuration Test Successful!</h2>
          <p>This is a test email from your portfolio backend.</p>
          <p>If you're seeing this, your email configuration is working correctly!</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('\n❌ Test email FAILED!');
                console.error('Error:', error.message);
                process.exit(1);
            } else {
                console.log('\n✅ Test email SENT successfully!');
                console.log('Message ID:', info.messageId);
                console.log('Response:', info.response);
                console.log('\n📬 Check your inbox:', process.env.EMAIL_USER);
                console.log('(Also check Spam folder!)');
                process.exit(0);
            }
        });
    }
});

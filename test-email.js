require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
    console.log('Testing Email Settings...');
    console.log('User:', process.env.EMAIL_USER);
    console.log('Pass length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('✅ SMTP Connection Successful!');

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Test Email',
            text: 'If you see this, email sending is working!'
        });
        console.log('✅ Test Email Sent Successfully!');
    } catch (err) {
        console.error('❌ Email Test Failed!');
        console.error('Error Code:', err.code);
        console.error('Error Message:', err.message);
        if (err.message.includes('Invalid login')) {
            console.log('\n--- DIAGNOSIS ---');
            console.log('Gmail rejected your login. Possible reasons:');
            console.log('1. You are using your REGULAR password but 2FA is ON. (Most likely)');
            console.log('   Solution: Create an "App Password" in Google Account settings.');
            console.log('2. "Less Secure Apps" is OFF. (Google deprecated this)');
            console.log('3. Password or Email is incorrect in .env');
        }
    }
}

testEmail();

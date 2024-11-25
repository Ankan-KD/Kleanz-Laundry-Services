const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

// Create a transporter using your Gmail account credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Function to generate a random 6-digit OTP
const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Function to send OTP to the admin's email
const sendOtp = (recipientEmail) => {
    const otp = generateOtp();
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: recipientEmail,
        subject: 'Your OTP for Admin Login',
        text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending OTP:', error);
        } else {
            console.log('OTP sent:', info.response);
        }
    });

    return otp;  // Return OTP so it can be compared later
};

module.exports = { sendOtp };

const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');

const router = express.Router();
const upload = multer();

// Route to send email with PDF attachment
router.post('/send-email', upload.single('file'), async (req, res) => {
    try {
        const { email } = req.body;
        const file = req.file;

        if (!email || !file) {
            return res.status(400).json({ message: 'Email and file are required.' });
        }

        // Configure the nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER, // Set your email in .env
                pass: process.env.EMAIL_PASS, // Set your email app password in .env
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Laundry Bill',
            text: 'Please find your laundry bill attached.',
            attachments: [
                {
                    filename: file.originalname || 'Laundry_Bill.pdf',
                    content: file.buffer,
                },
            ],
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.', error });
    }
});

module.exports = router;

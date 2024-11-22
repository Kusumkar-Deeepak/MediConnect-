const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital'); // Correct model name
require('dotenv').config();

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const hospital = await Hospital.findOne({ email });
        if (!hospital) return res.status(404).json({ error: 'Hospital not found.' });

        const token = crypto.randomBytes(32).toString('hex');
        hospital.resetToken = token;
        hospital.tokenExpiry = Date.now() + 3600000; // 1 hour
        await hospital.save();

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.APP_PASS,
            },
        });

        await transporter.sendMail({
            to: hospital.email,
            subject: 'Password Reset Request',
            html: `<p>Click the link to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
        });

        res.json({ message: 'Reset email sent successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Reset Password Route (POST method to reset password)
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Find the hospital with the provided reset token and check expiry
        const hospital = await Hospital.findOne({
            resetToken: token,
            tokenExpiry: { $gt: Date.now() },
        });

        if (!hospital) {
            return res.status(400).json({ error: 'Invalid or expired token.' });
        }

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        hospital.password = hashedPassword;
        hospital.resetToken = undefined; // Remove reset token after successful reset
        hospital.tokenExpiry = undefined; // Remove token expiry
        await hospital.save();

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;

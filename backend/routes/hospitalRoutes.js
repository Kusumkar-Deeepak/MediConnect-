const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/hospital');
const router = express.Router();
require('dotenv').config();

// In-memory store for pending registrations
const pendingHospitals = {};

// Function to send email notification to the hospital
const sendHospitalNotificationEmail = async (hospitalData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: hospitalData.email,
    subject: 'Hospital Registration Accepted',
    html: `<h1>Registration Accepted</h1>
           <p>Dear ${hospitalData.name},</p>
           <p>Your registration has been accepted! You can now log in to the system.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// Function to send cancellation email to the hospital
const sendHospitalCancellationEmail = async (hospitalData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: hospitalData.email,
    subject: 'Hospital Registration Cancelled',
    html: `<h1>Registration Cancelled</h1>
           <p>Dear ${hospitalData.name},</p>
           <p>We regret to inform you that your registration has been cancelled.</p>
           <p>Please provide the correct information and any additional details needed for your registration.</p>
           <p>Thank you for your understanding!</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// Function to send confirmation email to admin
const sendAdminConfirmationEmail = async (hospitalData, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS,
    },
  });

  const confirmUrl = `http://localhost:3000/api/hospitals/confirm/${token}`;
  const cancelUrl = `http://localhost:3000/api/hospitals/cancel/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Hospital Registration Confirmation',
    html: `
      <h1>New Hospital Registration Request</h1>
      <p>A new hospital has requested registration:</p>
      <p><strong>Name:</strong> ${hospitalData.name}</p>
      <p><strong>Email:</strong> ${hospitalData.email}</p>
      <p><strong>Phone:</strong> ${hospitalData.phone}</p>
      <p><strong>Address:</strong> ${hospitalData.address}</p>
      <p><strong>City:</strong> ${hospitalData.city}</p>
      <p><strong>State:</strong> ${hospitalData.state}</p>
      <p><strong>Zip Code:</strong> ${hospitalData.zipCode}</p>
      <p><strong>Specialist Doctor Name:</strong> ${hospitalData.specDrName}</p>
      <p><strong>Number of Doctors:</strong> ${hospitalData.numberOfDoctors}</p>
      <p><strong>Number of Nurses:</strong> ${hospitalData.numberOfNurses}</p>
      <p><strong>About Hospital:</strong> ${hospitalData.aboutHospital}</p>
      <p><strong>Facilities:</strong></p>
      <ul>
        <li><strong>Emergency:</strong> ${hospitalData.facilities.Emergency ? 'Yes' : 'No'}</li>
        <li><strong>ICU:</strong> ${hospitalData.facilities.ICU ? 'Yes' : 'No'}</li>
        <li><strong>Pharmacy:</strong> ${hospitalData.facilities.Pharmacy ? 'Yes' : 'No'}</li>
        <li><strong>Laboratory:</strong> ${hospitalData.facilities.Laboratory ? 'Yes' : 'No'}</li>
        <li><strong>Radiology:</strong> ${hospitalData.facilities.Radiology ? 'Yes' : 'No'}</li>
        <li><strong>Surgery:</strong> ${hospitalData.facilities.Surgery ? 'Yes' : 'No'}</li>
        <li><strong>Rehabilitation:</strong> ${hospitalData.facilities.Rehabilitation ? 'Yes' : 'No'}</li>
        <li><strong>Outpatient:</strong> ${hospitalData.facilities.Outpatient ? 'Yes' : 'No'}</li>
      </ul>
      <p>Click below to confirm or cancel the registration:</p>
      <a href="${confirmUrl}" style="padding: 10px; background-color: green; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">Confirm Hospital</a>
      <a href="${cancelUrl}" style="padding: 10px; background-color: red; color: white; text-decoration: none; border-radius: 5px;">Cancel Registration</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};



// Hospital registration route
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      id,
      phone,
      address,
      city,
      state,
      zipCode,
      specDrName,
      numberOfDoctors,
      numberOfNurses,
      aboutHospital,
      facilities,
    } = req.body;

    // Check if hospital already exists
    const existingHospital = await Hospital.findOne({ email }); // You might want to check by email
    if (existingHospital) {
      return res.status(400).json({ message: 'Hospital already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a confirmation token
    const token = crypto.randomBytes(32).toString('hex');

    // Store the registration data in memory with the hashed password
    pendingHospitals[token] = {
      name,
      email,
      password: hashedPassword, // Store the hashed password
      id,
      phone,
      address,
      city,
      state,
      zipCode,
      specDrName,
      numberOfDoctors,
      numberOfNurses,
      aboutHospital,
      facilities,
    };

    // Send confirmation email to admin
    await sendAdminConfirmationEmail(req.body, token);

    // Respond to the user indicating that their registration is pending
    res.status(200).json({
      message: 'Your registration is pending. You will be notified once it is accepted.',
    });
  } catch (error) {
    console.error('Error during hospital registration:', error);
    res.status(500).json({ message: 'Error creating hospital registration.' });
  }
});

// Route to confirm registration
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const hospitalData = pendingHospitals[token];

    if (!hospitalData) {
      return res.status(400).json({ message: 'Invalid or expired confirmation token.' });
    }

    // Save confirmed hospital to the database
    const hospital = new Hospital(hospitalData);
    await hospital.save();

    // Remove the token from memory
    delete pendingHospitals[token];

    // Send email notification to the hospital
    await sendHospitalNotificationEmail(hospitalData);

    res.status(200).json({ message: 'Hospital has been added successfully. Notification sent.' });
  } catch (error) {
    console.error('Error confirming hospital:', error);
    res.status(500).json({ message: 'Error confirming hospital registration.' });
  }
});

// Route to cancel registration
router.get('/cancel/:token', async (req, res) => {
  const { token } = req.params;

  const hospitalData = pendingHospitals[token];
  if (!hospitalData) {
    return res.status(400).json({ message: 'Invalid or expired cancellation token.' });
  }

  // Send cancellation email to the hospital
  await sendHospitalCancellationEmail(hospitalData);

  // Remove the pending registration data
  delete pendingHospitals[token];

  res.status(200).json({ message: 'Hospital registration has been cancelled. Notification sent.' });
});


// Hospital Login Route
router.get('/login', async (req, res) => {
  const { id, password } = req.query;
  console.log(id, password)

  try {
    const hospital = await Hospital.findOne({ id });
    if (!hospital) {
      return res.status(400).json({ message: 'Hospital not found' });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: hospital.id, type: 'hospital' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, hospital: {
      id: hospital.id,
      name: hospital.name,
      email: hospital.email,
      phone: hospital.phone,
      address: hospital.address,
      city: hospital.city,
      state: hospital.state,
      zipCode: hospital.zipCode,
      specDrName: hospital.specDrName,
      numberOfDoctors: hospital.numberOfDoctors,
      numberOfNurses: hospital.numberOfNurses,
      aboutHospital: hospital.aboutHospital,
      facilities: hospital.facilities, // Assuming facilities is an object
    }, });
  } catch (error) {
    console.error('Error during hospital login:', error);
    res.status(500).json({ message: 'An error occurred during hospital login' });
  }
});

module.exports = router;

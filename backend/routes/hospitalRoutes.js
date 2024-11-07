const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/hospital');
const router = express.Router();
const mongoose = require('mongoose');
const AppointmentHospital = require('../models/Appointment');
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
      website,
      openingHours,    // Object with start and end times
      experience,
      specialist,
      languagesSpoken,
      insuranceAccepted,
      emergencyContact,
      degree
    } = req.body;

    console.log(`request body ${req.body}`);
    

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
      website,
      openingHours: {
        start: openingHours.start,
        end: openingHours.end,
      },
      experience,
      specialist,
      languagesSpoken,
      insuranceAccepted,
      emergencyContact,
      degree,
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
    res.status(200).json({
      message: 'Login successful',
      token,
      hospital: {
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
        website: hospital.website,
        openingHours: hospital.openingHours, // Should include both start and end times
        experience: hospital.experience,
        specialist: hospital.specialist,
        languagesSpoken: hospital.languagesSpoken,
        insuranceAccepted: hospital.insuranceAccepted,
        emergencyContact: hospital.emergencyContact,
        degree: hospital.degree,
      },
    });
    
  } catch (error) {
    console.error('Error during hospital login:', error);
    res.status(500).json({ message: 'An error occurred during hospital login' });
  }
});

// GET /api/hospitals - Fetch all hospitals
router.get('/find-hospital', async (req, res) => {
  try {
    const hospitals = await Hospital.find(); // Fetch all hospitals from the database
    console.log(hospitals);
    res.status(200).json(hospitals); // Send the hospitals as a response
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ message: 'Server Error' }); // Send an error response
  }
});

// Middleware for token verification (optional if using JWT)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ message: "Token is missing." });
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) {
    return res.status(400).json({ message: "Invalid token format." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is correct
    req.user = decoded; // Attach user details for route access
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};


// Route 1: Verify Hospital Credentials
router.post('/verify', async (req, res) => {
  const { id, password } = req.body;
  console.log(id, password);

  try {
    // Check if hospital exists using the provided hospital ID
    const hospital = await Hospital.findOne({ id }); // Assuming 'id' is the field used for the hospital ID
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    // Verify password
    const validPassword = await bcrypt.compare(password, hospital.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

    res.status(200).json({ message: 'Password verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/update', verifyToken, async (req, res) => {
  const {
    id, // This is your custom hospital ID
    name,
    email,
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
    website,
    openingHours,
    experience,
    specialist,
    languagesSpoken,
    insuranceAccepted,
    emergencyContact,
    degree,
    password // Include password in request body
  } = req.body;

  console.log('Requested body:', req.body);

  try {
    // Find hospital by custom 'id' field
    const hospital = await Hospital.findOne({ id });
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    // If a new password is provided, hash it
    let hashedPassword = hospital.password; // Keep existing password by default
    if (password && password.trim()) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }    

    // Update hospital's profile fields only if new values are provided
    hospital.name = name || hospital.name;
    hospital.email = email || hospital.email;
    hospital.password = hashedPassword; // Ensure hashed password is set
    hospital.phone = phone || hospital.phone;
    hospital.address = address || hospital.address;
    hospital.city = city || hospital.city;
    hospital.state = state || hospital.state;
    hospital.zipCode = zipCode || hospital.zipCode;
    hospital.specDrName = specDrName || hospital.specDrName;
    hospital.numberOfDoctors = numberOfDoctors || hospital.numberOfDoctors;
    hospital.numberOfNurses = numberOfNurses || hospital.numberOfNurses;
    hospital.aboutHospital = aboutHospital || hospital.aboutHospital;
    hospital.facilities = facilities || hospital.facilities;
    hospital.website = website || hospital.website;
    hospital.openingHours = openingHours || hospital.openingHours;
    hospital.experience = experience || hospital.experience;
    hospital.specialist = specialist || hospital.specialist;
    hospital.languagesSpoken = languagesSpoken || hospital.languagesSpoken;
    hospital.insuranceAccepted = insuranceAccepted || hospital.insuranceAccepted;
    hospital.emergencyContact = emergencyContact || hospital.emergencyContact;
    hospital.degree = degree || hospital.degree;

    await hospital.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/delete', async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ message: 'ID and password are required' });
    }

    // Find the hospital by the custom hospital ID
    const hospital = await Hospital.findOne({ id: id });

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, hospital.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Delete the associated appointments for the hospital
    await AppointmentHospital.deleteMany({ hospitalId: id });
    
    // Delete the hospital record
    await Hospital.deleteOne({ id: id });

    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    console.error("Error deleting hospital:", error);
    res.status(500).json({ message: 'Error deleting hospital' });
  }
});




module.exports = router;

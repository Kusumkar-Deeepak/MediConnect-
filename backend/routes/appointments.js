const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const AppointmentHospital = require('../models/Appointment'); // Ensure the path to your model is correct

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address from environment variable
    pass: process.env.APP_PASS,   // Your email password or app password from environment variable
  },
});

// POST route to book appointments
router.post('/appointments', async (req, res) => {
  const { hospitalId, hospitalEmail, clientData } = req.body;

  if (!hospitalId || !clientData || !hospitalEmail) {
    return res.status(400).json({ message: 'Hospital ID, client data, and hospital email are required.' });
  }

  try {
    const preferredDate = new Date(clientData.preferredDate);

    // Check for an existing appointment for the same email on the same day
    const existingAppointment = await AppointmentHospital.findOne({
      hospitalId,
      'appointments.email': clientData.email,
      'appointments.preferredDate': {
        $gte: new Date(preferredDate.setHours(0, 0, 0, 0)),
        $lt: new Date(preferredDate.setHours(23, 59, 59, 999))
      }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'You already have an appointment booked for today with this email.' });
    }

    // Find or create the hospital entry
    let appointmentEntry = await AppointmentHospital.findOne({ hospitalId });

    if (!appointmentEntry) {
      appointmentEntry = new AppointmentHospital({
        hospitalId,
        appointments: [clientData],
      });
    } else {
      appointmentEntry.appointments.push(clientData);
    }

    await appointmentEntry.save();

    // Send email confirmation
    const mailOptions = {
      from: hospitalEmail,
      to: clientData.email,
      subject: 'Appointment Booked Successfully',
      text: `Hello ${clientData.name},

Your appointment has been successfully booked!

**Appointment Details:**
- Name: ${clientData.name}
- Email: ${clientData.email}
- Phone: ${clientData.phone}
- Preferred Date: ${clientData.preferredDate}
- Preferred Time: ${clientData.preferredTime}

Thank you for choosing our service!

Best Regards,
MediConnect Team`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Appointment booked successfully and email sent.' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});

router.get('/:hospitalId', async (req, res) => {
  try {
    const hospitalAppointments = await AppointmentHospital.findOne({ hospitalId: req.params.hospitalId });
    if (!hospitalAppointments) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    console.log("Appointments fetched:", hospitalAppointments.appointments);  // Log fetched appointments
    res.json(hospitalAppointments.appointments);  // Send appointments array
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: 'Server error' });
  }
});



// PUT to update visit status
router.put('/update', async (req, res) => {
  const { hospitalId, appointmentId, visited } = req.body;

  try {
    const hospital = await AppointmentHospital.findOneAndUpdate(
      { hospitalId, "appointments._id": appointmentId },
      { $set: { "appointments.$.visited": visited } },
      { new: true }
    );

    if (!hospital) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Visit status updated', updatedAppointment: hospital.appointments });
  } catch (error) {
    console.error("Error updating visit status:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

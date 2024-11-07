const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length of the password
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Please enter a valid 6-digit zip code"],
    },
    specDrName: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfDoctors: {
      type: Number,
      required: true,
    },
    numberOfNurses: {
      type: Number,
      required: true,
    },
    aboutHospital: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true, // Hospital website
      trim: true,
      match: [/(http|https):\/\/.+/, "Please enter a valid URL"],
    },
    openingHours: {
      start: { type: String, required: true }, // Opening hour
      end: { type: String, required: true },   // Closing hour
    },
    experience: {
      type: String,
      required: true, // Experience in years
      trim: true,
    },
    specialist: {
      type: String,
      required: true, // Specialist field
      trim: true,
    },
    languagesSpoken: {
      type: String,
      required: true, // Languages spoken
      trim: true,
    },
    insuranceAccepted: {
      type: String,
      required: true, // Insurance acceptedrrr4
      trim: true,
    },
    degree: {
      type: String,
      required: true, 
      trim: true,
    },
    emergencyContact: {
      type: String,
      required: true, // Emergency contact number
      match: [/^\d{10}$/, "Please enter a valid 10-digit emergency contact number"],
    },
    facilities: {
      Emergency: { type: Boolean, default: false },
      ICU: { type: Boolean, default: false },
      Pharmacy: { type: Boolean, default: false },
      Laboratory: { type: Boolean, default: false },
      Radiology: { type: Boolean, default: false },
      Surgery: { type: Boolean, default: false },
      Rehabilitation: { type: Boolean, default: false },
      Outpatient: { type: Boolean, default: false },
      BloodBank: { type: Boolean, default: false }, // Added BloodBank
      Maternity: { type: Boolean, default: false }, // Added Maternity services
      Pediatrics: { type: Boolean, default: false }, // Added Pediatrics
      Cardiology: { type: Boolean, default: false }, // Added Cardiology unit
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema, 'hospitals');

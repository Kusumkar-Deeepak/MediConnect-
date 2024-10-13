// models/Client.js
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
      minlength: 6, // You can set the minimum length of the password
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
      type: Number,
      required: true,
      trim: true,
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
    facilities: {
      Emergency: { type: Boolean, default: false },
      ICU: { type: Boolean, default: false },
      Pharmacy: { type: Boolean, default: false },
      Laboratory: { type: Boolean, default: false },
      Radiology: { type: Boolean, default: false },
      Surgery: { type: Boolean, default: false },
      Rehabilitation: { type: Boolean, default: false },
      Outpatient: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema, 'hospitals');


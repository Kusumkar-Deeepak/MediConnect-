// import React from 'react';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Further form processing (e.g., sending to API) can go here
    toast.success('Client Added successfully!');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Client Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <label>
              Full Name:
              <input
                name="name"
                value={formData.name}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </label>
            <label>
              Email:
              <input
                name="email"
                value={formData.email}
                onChange={formChange}
                type="email"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                name="phone"
                value={formData.phone}
                onChange={formChange}
                type="tel"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </label>
            <label>
              Date of Birth:
              <input
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={formChange}
                type="date"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </label>
            <label>
              Address:
              <input
                name="address"
                value={formData.address}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </label>
            <label>
              City:
              <input
                name="city"
                value={formData.city}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </label>
            <label>
              State:
              <input
                name="state"
                value={formData.state}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </label>
            <label>
              Zip Code:
              <input
                name="zipCode"
                value={formData.zipCode}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Signup
            </button>
          </div>
          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ClientSignup;

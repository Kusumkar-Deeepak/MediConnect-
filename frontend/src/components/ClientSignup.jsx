// import React from 'react';

import { useState } from "react";

const ClientSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    Address: "",
    City: "",
    State: "",
    ZipCode: ""
  })

  function handleFormSubmit(){
    
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Client Signup</h2>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <label>
              Full Name:
              <input type="text" className="w-full px-3 py-2 border rounded-md mt-1" required />
            </label>
            <label>
              Email:
              <input type="email" className="w-full px-3 py-2 border rounded-md mt-1" required />
            </label>
            <label>
              Phone Number:
              <input type="tel" className="w-full px-3 py-2 border rounded-md mt-1" required />
            </label>
            <label>
              Date of Birth:
              <input type="date" className="w-full px-3 py-2 border rounded-md mt-1" required />
            </label>
            <label>
              Address:
              <input type="text" className="w-full px-3 py-2 border rounded-md mt-1" required />
            </label>
            <label>
              City:
              <input type="text" className="w-full px-3 py-2 border rounded-md mt-1" required />
            </label>
            <label>
              State:
              <input type="text" className="w-full px-3 py-2 border rounded-md mt-1" required />
            </label>
            <label>
              Zip Code:
              <input type="text" className="w-full px-3 py-2 border rounded-md mt-1" required />
            </label>
          </div>


          <div className="mt-6">
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" 
            onClick={handleFormSubmit}
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

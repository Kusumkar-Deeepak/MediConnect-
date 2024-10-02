// import React from 'react';

const ClientSignup = () => {
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

          <div className="mb-4">
            <label className="block mb-2">Services Required:</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                General Consultation
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Specialist Consultation
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Health Checkup
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Emergency Services
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Surgery
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Laboratory Services
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
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

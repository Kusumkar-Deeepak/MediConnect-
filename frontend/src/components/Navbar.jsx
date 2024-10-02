import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [askQuestionDropdownOpen, setAskQuestionDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [hospitalModalOpen, setHospitalModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Open modal functions
  const openHospitalModal = () => {
    setHospitalModalOpen(true);
    setLoginDropdownOpen(false); // Close dropdown when opening modal
  };

  const openClientModal = () => {
    setClientModalOpen(true);
    setLoginDropdownOpen(false); // Close dropdown when opening modal
  };

  // Close modal functions
  const closeHospitalModal = () => {
    setHospitalModalOpen(false);
  };

  const closeClientModal = () => {
    setClientModalOpen(false);
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Custom date format: DD/MM/YYYY
      const formattedDate = now.toLocaleDateString('en-GB'); // en-GB formats date as DD/MM/YYYY
      setCurrentDate(formattedDate);

      // Time format (default toLocaleTimeString)
      const formattedTime = now.toLocaleTimeString();
      setCurrentTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">

        {/* Left: Logo and Name */}
        <div className="flex items-center text-2xl font-bold">
          {/* Blinking Hospital Plus Icon */}
          <svg
            className="w-8 h-8 text-green-500 animate-blink" // Applied custom blinking class
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2v20m10-10H2" // This draws a hospital-like "+" sign
            />
          </svg>

          {/* Brand Name with Different Colors for Medi and Connect */}
          <span className="ml-2">
            <span className="text-blue-600">Medi</span>
            <span className="text-purple-600">Connect</span>
          </span>
        </div>


        {/* Middle: Navbar Links */}
        <div className="flex items-center space-x-6">

          {/* New Section (e.g., Services) */}
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
            Services
          </button>

          {/* Ask a Question Dropdown */}
          <div className="relative">
            <button
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
              onClick={() => setAskQuestionDropdownOpen(!askQuestionDropdownOpen)}
            >
              Ask a Question
            </button>
            {askQuestionDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Contact Us
                </a>
              </div>
            )}
          </div>

          {/* Login Dropdown */}
          <div className="relative">
            <button
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
              onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
            >
              Login/Sign-up
            </button>
            {loginDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl">
                <button className="block px-9 py-2 hover:bg-gray-100" onClick={openHospitalModal}>
                  Hospital Login
                </button>
                <button className="block px-12 py-2 hover:bg-gray-100" onClick={openClientModal}>
                  Client Login
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Date and Time */}
        <div className="text-right">
          <p className="text-gray-600 font-medium">{currentDate}</p>
          <p className="text-gray-500 text-sm">{currentTime}</p>
        </div>
      </div>


      {/* Hospital Modal */}
      {hospitalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Hospital Login</h2>
            <form>
              <label className="block mb-2">
                Hospital ID:
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </label>
              <label className="block mb-2">
                Password:
                <input type="password" className="w-full px-3 py-2 border rounded-md" />
              </label>
              <div className="flex justify-between items-center mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">Submit</button>
                <button className="px-4 py-2 bg-gray-300 text-black rounded-md" onClick={closeHospitalModal} type="button">Close</button>
              </div>
            </form>
            {/* Signup Link */}
            <p className="mt-4 text-sm">
              Not registered?{' '}
              <Link to="/HospitalSignup" className="text-blue-500 hover:underline">
                Signup here
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Client Modal */}
      {clientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Client Login</h2>
            <form>
              <label className="block mb-2">
                Client ID:
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </label>
              <label className="block mb-2">
                Password:
                <input type="password" className="w-full px-3 py-2 border rounded-md" />
              </label>
              <div className="flex justify-between items-center mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">Submit</button>
                <button className="px-4 py-2 bg-gray-300 text-black rounded-md" onClick={closeClientModal} type="button">Close</button>
              </div>
            </form>
            {/* Signup Link */}
            <p className="mt-4 text-sm">
              Not registered?{' '}
              <Link to="/ClientSignup" className="text-blue-500 hover:underline">
                Signup here
              </Link>
            </p>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;

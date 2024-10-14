import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [askQuestionDropdownOpen, setAskQuestionDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [hospitalModalOpen, setHospitalModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // State to store login credentials
  const [clientData, setClientData] = useState({ clientEmail: '', clientPassword: '' });
  const [hospitalData, setHospitalData] = useState({ hospitalID: '', hospitalPassword: '' });

  const clientOnChange = (e) => setClientData({ ...clientData, [e.target.name]: e.target.value });
  const hospitalOnChange = (e) => setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });

  const openHospitalModal = () => { setHospitalModalOpen(true); setLoginDropdownOpen(false); };
  const openClientModal = () => { setClientModalOpen(true); setLoginDropdownOpen(false); };
  const closeHospitalModal = () => setHospitalModalOpen(false);
  const closeClientModal = () => setClientModalOpen(false);

  // Update date and time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-GB'));
      setCurrentTime(now.toLocaleTimeString());
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const hospitalSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting hospital data:', hospitalData);

    try {
      const response = await axios.get('http://localhost:3000/api/hospitals/login', {
        params: {
          id: hospitalData.hospitalID,
          password: hospitalData.hospitalPassword
        }
      });
      console.log('Response from hospital login:', response.data);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Hospital login successful');
        closeHospitalModal();
      } else {
        toast.error('Hospital login failed');
      }
    } catch (error) {
      toast.error('Error during Hospital login');
      console.error('Error during Hospital login:', error.response?.data || error.message);
    }
  };

  const clientSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting client data:', clientData);

    try {
      const response = await axios.get('http://localhost:3000/api/clients/login', {
        params: {
          email: clientData.clientEmail,
          password: clientData.clientPassword
        }
      });
      console.log('Response from client login:', response.data);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Client login successful');
        closeClientModal();
      } else {
        toast.error('Client login failed');
      }
    } catch (error) {
      toast.error('Error during client login');
      console.error('Error during client login:', error.response?.data || error.message);
    }
  };



  return (
    <nav className="bg-white shadow-md">
      <ToastContainer />
      <div className="container mx-auto flex justify-between items-center py-4 px-4">

        {/* Left: Logo and Name */}
        <div className="flex items-center text-2xl font-bold">
          <svg className="w-8 h-8 text-green-500 animate-blink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20m10-10H2" />
          </svg>
          <Link to="/" className="flex items-center">
            <span className="ml-2"><span className="text-blue-600">Medi</span><span className="text-purple-600">Connect</span></span>
          </Link>
        </div>

        {/* Middle: Navbar Links */}
        <div className="flex items-center space-x-6">
          <a href="/services" className="px-4 py-2 border rounded-md hover:bg-gray-100">Services</a>
          <div className="relative">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100" onClick={() => setAskQuestionDropdownOpen(!askQuestionDropdownOpen)}>
              Ask a Question
            </button>
            {askQuestionDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl">
                <a href="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact Us</a>
              </div>
            )}
          </div>
          <div className="relative">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100" onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}>
              Login/Sign-up
            </button>
            {loginDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl">
                <button className="block px-9 py-2 hover:bg-gray-100" onClick={openHospitalModal}>Hospital Login</button>
                <button className="block px-12 py-2 hover:bg-gray-100" onClick={openClientModal}>Client Login</button>
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
            <form onSubmit={hospitalSubmit}>
              <label className="block mb-2">Hospital ID:
                <input type="text" name="hospitalID" onChange={hospitalOnChange} value={hospitalData.hospitalID} className="w-full px-3 py-2 border rounded-md" required />
              </label>
              <label className="block mb-2">Password:
                <input type="password" name="hospitalPassword" onChange={hospitalOnChange} value={hospitalData.hospitalPassword} className="w-full px-3 py-2 border rounded-md" required />
              </label>
              <div className="flex justify-between items-center mt-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
                <button className="px-4 py-2 bg-gray-300 text-black rounded-md" onClick={closeHospitalModal} type="button">Close</button>
              </div>
            </form>
            <p className="mt-4 text-sm">Not registered? <Link to="/HospitalSignup" className="text-blue-500 hover:underline">Signup here</Link></p>
          </div>
        </div>
      )}

      {/* Client Modal */}
      {clientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Client Login</h2>
            <form onSubmit={clientSubmit}>
              <label className="block mb-2">Client EMAIL:
                <input type="email" name="clientEmail" onChange={clientOnChange} value={clientData.clientEmail} className="w-full px-3 py-2 border rounded-md" required />
              </label>
              <label className="block mb-2">Password:
                <input type="password" name="clientPassword" onChange={clientOnChange} value={clientData.clientPassword} className="w-full px-3 py-2 border rounded-md" required />
              </label>
              <div className="flex justify-between items-center mt-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
                <button className="px-4 py-2 bg-gray-300 text-black rounded-md" onClick={closeClientModal} type="button">Close</button>
              </div>
            </form>
            <p className="mt-4 text-sm">Not registered? <Link to="/ClientSignup" className="text-blue-500 hover:underline">Signup here</Link></p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

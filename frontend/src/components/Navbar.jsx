import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profileImage from '../assets/images/profile_picture.webp'
import { UserContext } from '../Context/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [askQuestionDropdownOpen, setAskQuestionDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [hospitalModalOpen, setHospitalModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isHospitalLoggedIn, setIsHospitalLoggedIn] = useState(false);
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);
  const [hospitalName, setHospitalName] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientData, setClientData] = useState({ clientEmail: '', clientPassword: '' });
  const [hospitalData, setHospitalData] = useState({ hospitalID: '', hospitalPassword: '' })
  const clientOnChange = (e) => setClientData({ ...clientData, [e.target.name]: e.target.value });
  const hospitalOnChange = (e) => setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });

  const openHospitalModal = () => { setHospitalModalOpen(true); setLoginDropdownOpen(false); };
  const openClientModal = () => { setClientModalOpen(true); setLoginDropdownOpen(false); };
  const closeHospitalModal = () => setHospitalModalOpen(false);
  const closeClientModal = () => setClientModalOpen(false);

  const { setHospitalInfo, setClientInfo } = useContext(UserContext);  // Access context
  const [hospitalId, setHospitalId] = useState('')

  // Initialize state based on local storage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedHospitalName = localStorage.getItem('hospitalName');
    const storedClientName = localStorage.getItem('clientName');

    if (token) {
      // If the token exists, set the login states accordingly
      const isHospital = storedHospitalName !== null;
      const isClient = storedClientName !== null;

      setIsHospitalLoggedIn(isHospital);
      setIsClientLoggedIn(isClient);
      setHospitalName(storedHospitalName || '');
      setClientName(storedClientName || '');
    }
  }, []);

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
          password: hospitalData.hospitalPassword,
        },
      });
      console.log('Response from hospital login:', response.data);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('hospitalName', response.data.hospital.name);
        setHospitalName(response.data.hospital.name);
        setHospitalId(response.data.hospital.id);
        // alert(response.data.hospital.id);
        setIsHospitalLoggedIn(true);
        setHospitalInfo(response.data.hospital);
        
        // Display success toast and navigate after 3 seconds
        toast.success('Hospital login successful');
        // setTimeout(() => {
        //   navigate('/hospital/dashboard');
        // }, 1000); // Delay navigation by 3 seconds

        closeHospitalModal();
      } else {
        toast.error('Hospital login failed');
      }
    } catch (error) {
      toast.error('Hospital login failed - Invalid Credentials.');
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
          password: clientData.clientPassword,
        },
      });
      console.log('Response from client login:', response.data);
      console.log('Response from client login:', response.data.client);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('clientName', response.data.client.name); // Store the client name
        setClientName(response.data.client.name);
        setClientInfo(response.data.client);
        setIsClientLoggedIn(true);
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

  // Handle sign out for hospital
  const handleHospitalSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hospitalName');
    setIsHospitalLoggedIn(false);
    setHospitalName('');
    
    // Display success toast and navigate after 3 seconds
    toast.success('Hospital signed out successfully');
    setTimeout(() => {
      navigate('/');
    }, 2000); // Delay navigation by 3 seconds
  };

  const handleClientSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('clientName');
    setIsClientLoggedIn(false);
    setClientInfo(null);  // Clear clientInfo in the UserContext
    setClientName('');
    
    // Display success toast and navigate after 3 seconds
    toast.success('Client signed out successfully');
    setTimeout(() => {
      navigate('/');
    }, 2000); // Delay navigation by 3 seconds
  };

  // console.log('hsp id',hospitalId)y;

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
          {isClientLoggedIn && <a href="/services" className="px-4 py-2 border rounded-md hover:bg-gray-100">Ask The Doctor</a>}
          
          {/* Conditional Rendering for Hospital Only */}
        {isHospitalLoggedIn && (
          <div className="relative">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100" onClick={() => setAskQuestionDropdownOpen(!askQuestionDropdownOpen)}>
              Ask To MediConnect Team
            </button>
            {askQuestionDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl">
                <a href="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact Us</a>
              </div>
            )}
          </div>
        )}

          {/* Conditional Rendering for Login/Sign-up or Profile */}
          {(isHospitalLoggedIn || isClientLoggedIn) ? (
            <div className="relative">
              <div
                className="flex px-4 py-2 items-center cursor-pointer border rounded-md hover:bg-gray-100"
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
              >
                <img
                  src={profileImage} // Replace with actual path or use a state to manage profile image
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
                <span className="ml-2">{isHospitalLoggedIn ? hospitalName : clientName}</span>
              </div>
              {loginDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl">
                  {isHospitalLoggedIn ? (
                    <>
                      <Link to="/hospital/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                        Hospital Profile
                      </Link>

                      <Link to={`/check-clients/${hospitalId}`} className="block px-4 py-2 hover:bg-gray-100">Check Clients</Link>
                      <button className="block w-full text-center px-4 py-2 hover:bg-gray-100" onClick={handleHospitalSignOut}>Sign Out</button>
                    </>
                  ) : (
                    <>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleClientSignOut}>Sign Out</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
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
          )}
        </div>

        {/* Right: Date and Time */}
        <div className="text-right">
          <p className="text-gray-600">{currentDate}</p>
          <p className="text-gray-600">{currentTime}</p>
        </div>
      </div>

      {/* Hospital Modal */}
      {hospitalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Hospital Login</h2>
            <form onSubmit={hospitalSubmit}>
              <label className="block mb-4">Hospital ID:
                <input type="text" name="hospitalID" onChange={hospitalOnChange} value={hospitalData.hospitalID} className="w-full px-3 py-2 border rounded-md" required />
              </label>
              <label className="block mb-4">Password:
                <input type="password" name="hospitalPassword" onChange={hospitalOnChange} value={hospitalData.hospitalPassword} className="w-full px-3 py-2 border rounded-md" required />
              </label>
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
              <button type="button" className="mt-2 w-full text-center text-red-600" onClick={closeHospitalModal}>Cancel</button>
              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/HospitalSignup" className="text-blue-500 hover:underline">
                  Add Hospital
                </a>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Client Modal */}
      {clientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Client Login</h2>
            <form onSubmit={clientSubmit}>
              <label className="block mb-2">Email:
                <input type="email" name="clientEmail" onChange={clientOnChange} value={clientData.clientEmail} className="w-full px-3 py-2 border rounded-md" required />
              </label>
              <label className="block mb-4">Password:
                <input type="password" name="clientPassword" onChange={clientOnChange} value={clientData.clientPassword} className="w-full px-3 py-2 border rounded-md" required />
              </label>
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
              <button type="button" className="mt-2 w-full text-center text-red-600" onClick={closeClientModal}>Cancel</button>
              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/ClientSignup" className="text-blue-500 hover:underline">
                Add User
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

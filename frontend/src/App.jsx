import './App.css'
import AdminGuidelines from './components/AdminGuidelines';
import AppointmentList from './components/AppointmentList';
import ClientSignup from './components/ClientSignup';
import ContactPage from './components/ContactPage';
import DoctorDetails from './components/DoctorDetails';
import HospitalDashboard from './components/HospitalDashboard';
import HospitalSignup from './components/HospitalSignup';
import { MediConnect } from './components/MediConnect';
import ServicesSection from './components/ServiceSection';
import { UserProvider } from './Context/UserContext';
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {


  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<MediConnect />} />
            <Route path="/ClientSignup" element={<ClientSignup />} />
            <Route path="/HospitalSignup" element={<HospitalSignup />} />
            <Route path="/services" element={<ServicesSection />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
            <Route path="/doctor-details" element={<DoctorDetails />} />
            <Route path="/admin-details" element={<AdminGuidelines />} />
            <Route path="/check-clients/:hospitalId" element={<AppointmentList />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App

import './App.css';
import AdminGuidelines from './components/AdminGuidelines';
import AppointmentList from './components/AppointmentList';
import ClientSignup from './components/ClientSignup';
import ContactPage from './components/ContactPage';
import DoctorDetails from './components/DoctorDetails';
import HospitalDashboard from './components/HospitalDashboard';
import HospitalSignup from './components/HospitalSignup';
import { MediConnect } from './components/MediConnect';
// import ServicesSection from './components/ServiceSection';
import { UserProvider } from './Context/UserContext';
import Home from './pages/Home';
import ClientAppointments from './components/ClientAppointments'; // Import ClientAppointments Component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiseaseInfo from './components/DiseaseInfo';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<MediConnect />} />
          <Route path="/ClientSignup" element={<ClientSignup />} />
          <Route path="/HospitalSignup" element={<HospitalSignup />} />
          <Route path="/Medi-Info" element={<DiseaseInfo />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          <Route path="/doctor-details" element={<DoctorDetails />} />
          <Route path="/admin-details" element={<AdminGuidelines />} />
          <Route path="/check-clients/:hospitalId" element={<AppointmentList />} />
          
          {/* New route for Client Appointments */}
          <Route path="/client-appointments" element={<ClientAppointments />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

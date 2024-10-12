import './App.css'
import ClientSignup from './components/ClientSignup';
import ContactPage from './components/ContactPage';
import HospitalSignup from './components/HospitalSignup';
import ServicesSection from './components/ServiceSection';
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ClientSignup" element={<ClientSignup />} />
          <Route path="/HospitalSignup" element={<HospitalSignup />} />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

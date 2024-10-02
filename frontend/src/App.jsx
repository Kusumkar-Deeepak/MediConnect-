import './App.css'
import ClientSignup from './components/ClientSignup';
import HospitalSignup from './components/HospitalSignup';
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
        </Routes>
      </Router>
    </>
  )
}

export default App

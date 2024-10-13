import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const HospitalSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    specDrName: "",
    numberOfDoctors: "",
    numberOfNurses: "",
    aboutHospital: "",
    facilities: {
      Emergency: false,
      ICU: false,
      Pharmacy: false,
      Laboratory: false,
      Radiology: false,
      Surgery: false,
      Rehabilitation: false,
      Outpatient: false,
    },
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        facilities: {
          ...prevFormData.facilities,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const { name, email, id, password, phone, address, city, state, zipCode, specDrName, numberOfDoctors, numberOfNurses, aboutHospital } = formData;

    if (!name || !email || !id || !password || !phone || !address || !city || !state || !zipCode || !specDrName || !numberOfDoctors || !numberOfNurses || !aboutHospital) {
      toast.error("All fields are required.");
      return false;
    }

    if (!/^\d+$/.test(zipCode)) {
      toast.error("Zip Code must be a number.");
      return false;
    }

    if (!/^\d+$/.test(numberOfDoctors) || !/^\d+$/.test(numberOfNurses)) {
      toast.error("Number of Doctors and Nurses must be numbers.");
      return false;
    }

    return true;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const requestBody = {
      ...formData,
      facilities: formData.facilities,
      name: formData.name.toLowerCase(),
      numberOfDoctors: Number(formData.numberOfDoctors),
      numberOfNurses: Number(formData.numberOfNurses),
    };
  
    console.log("Request Body:", requestBody);
  
    try {
      const response = await axios.post('http://localhost:3000/api/hospitals', requestBody);
  
      if (response.status === 200) {
        toast.success(response.data.message); // Show success message
  
        // Add a timeout before navigating to the home page
        setTimeout(() => {
          navigate('/'); // Redirect to home page after 3 seconds
        }, 3000); // 3000 milliseconds = 3 seconds
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };
  
  
  
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Hospital Signup</h2>
        <form onSubmit={formSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <label>
              Hospital Name:
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. Shri Sai Hospital"
                required
              />
            </label>
            <label>
              Email:
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. example@gmail.com"
                required
              />
            </label>
            <label>
              Hospital Id:
              <input
                name="id"
                value={formData.id}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. Sai123"
                required
              />
            </label>
            <label>
              Password:
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="w-full px-3 py-2 border rounded-md mt-1"
                autoComplete="current-password" 
                placeholder="EG. Example@123"
                required
              />
            </label>
            <label>
              Contact Number:
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. 9370387851"
                required
              />
            </label>
            <label>
              Address:
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. Old Cloth Lane, Near XYZ Road"
                required
              />
            </label>
            <label>
              City:
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. Latur"
                required
              />
            </label>
            <label>
              State:
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. Maharashtra"
                required
              />
            </label>
            <label>
              Zip Code:
              <input
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                type="text" // Changed to text to allow for input of leading zeros
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. 413512"
                required
              />
            </label>
            <label>
              Specialist Doctor Name:
              <input
                name="specDrName"
                value={formData.specDrName}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. Dr.Kusumkar Deepak"
                required
              />
            </label>
            <label>
              Number of Doctors:
              <input
                name="numberOfDoctors"
                value={formData.numberOfDoctors}
                onChange={handleChange}
                type="number"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. 12"
                required
              />
            </label>
            <label>
              Number of Nurses:
              <input
                name="numberOfNurses"
                value={formData.numberOfNurses}
                onChange={handleChange}
                type="number"
                className="w-full px-3 py-2 border rounded-md mt-1"
                placeholder="EG. 10"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Facilities Available:</label>
            <div className="flex flex-wrap gap-4">
              {Object.keys(formData.facilities).map((facility) => (
                <label key={facility} className="flex items-center">
                  <input
                    type="checkbox"
                    name={facility}
                    checked={formData.facilities[facility]}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {facility}
                </label>
              ))}
            </div>
          </div>

          <label className="block mb-4">
            About Hospital:
            <textarea
              name="aboutHospital"
              value={formData.aboutHospital}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md mt-1"
              rows="4"
              placeholder="EG. ABC Hospital is a multi-specialty institution located in the heart of the city. We pride ourselves on our patient-centered approach, offering personalized care tailored to meet individual needs. Our hospital features modern diagnostic tools, operating theaters, and patient wards, providing a comprehensive range of healthcare services. We believe in educating our patients about their health and wellness to empower them in making informed decisions.
"
              required
            />
          </label>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Signup
            </button>
          </div>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default HospitalSignup;

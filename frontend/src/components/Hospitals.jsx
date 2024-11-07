import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Hospital Component
// eslint-disable-next-line react/prop-types
const HospitalData = ({ hospital, isLoggedIn, clientInfo }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle appointment booking
  const handleBookAppointment = () => {
    const dataToSend = {
      hospital,
      clientInfo, // Replace with actual user data
    };

    // Navigate to the doctor details page with state
    navigate('/doctor-details', { state: dataToSend });
  };
  console.log("client",clientInfo);

  return (
    <div className="flex w-full max-w-4xl p-4 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Doctor Info Section (25% width) */}
      <div className="w-1/4 flex flex-col items-center p-4 border-r border-gray-300">
        <img
          src={hospital.doctorImage || "https://media.istockphoto.com/id/1344779917/vector/medical-center-hospital-building-vector-design.jpg?s=612x612&w=0&k=20&c=_sZByueZhEZbK2WjQz1jqXy1_Rr5jYkgiVBj-2ls44s="}
          alt={hospital.specDrName || "Doctor"}
          className="w-32 h-32 rounded-full object-cover mb-2"
        />
        <h3 className="text-lg font-semibold text-black">{hospital.specDrName ? `Dr. ${hospital.specDrName}` : "Doctor's Name"}</h3>
      </div>

      {/* Hospital Info Section (75% width) */}
      <div className="w-3/4 p-4 text-black">
        <h3 className="text-2xl font-bold">{hospital.name || "Hospital Name"}</h3>
        <p className="text-md mt-1">
          {hospital.specialist || "Specialization not available"} | {hospital.experience ? `${hospital.experience} years experience` : "Experience not available"}
        </p>

        <hr className="my-4 border-gray-300" />

        <p className="text-md">
          <strong>Address:</strong> {hospital.address || "Address not available"}
        </p>
        <p className="text-md">
          <strong>Degree:</strong> {hospital.degree || "Degree not available"}
        </p>
        <p className="text-md">
          <strong>Languages:</strong> {hospital.languagesSpoken || "Languages not available"}
        </p>

        {/* Conditional Rendering for Appointment Button or Message */}
        {isLoggedIn ? (
          <button
            type="button"
            onClick={handleBookAppointment} // Update the onClick handler
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Book Appointment
          </button>
        ) : (
          <p className="mt-4 text-red-600 font-semibold">
            Please log in to book an appointment.
          </p>
        )}
      </div>
    </div>
  );
};

// Prop Types
HospitalData.propTypes = {
  hospital: PropTypes.shape({
    name: PropTypes.string,
    doctorImage: PropTypes.string,
    specDrName: PropTypes.string,
    specialist: PropTypes.string,
    experience: PropTypes.string,
    address: PropTypes.string,
    languagesSpoken: PropTypes.string,
    degree: PropTypes.string,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired, // New prop for logged-in status
};

export default HospitalData;

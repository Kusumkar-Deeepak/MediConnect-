import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
    navigate("/doctor-details", { state: dataToSend });
  };

  console.log("client", clientInfo);
  console.log("hospital", hospital);

  // Function to get a random feature from the hospital's facilities
  // Function to get a random feature message from the hospital's facilities
  const getRandomFeature = () => {
    const features = hospital.facilities || {}; // Ensure facilities is an object

    // If the object is empty, return a fallback message
    if (Object.keys(features).length === 0) {
      return "No specific features available."; // Fallback message if no features
    }

    // Filter out the features that are enabled (true)
    const availableFeatures = Object.keys(features).filter(
      (key) => features[key]
    );

    // If no features are enabled, return a fallback message
    if (availableFeatures.length === 0) {
      return "No specific features available.";
    }

    // Randomly select a feature from the available ones
    const randomFeature =
      availableFeatures[Math.floor(Math.random() * availableFeatures.length)];
    return `The hospital offers ${randomFeature}.`; // Return the feature in a message
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-4xl p-4 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Doctor Info Section (25% width on large screens, full width on small screens) */}
      <div className="w-full lg:w-1/4 flex flex-col items-center p-4 border-b lg:border-r lg:border-gray-300">
        <img
          src={
            hospital.doctorImage ||
            "https://media.istockphoto.com/id/1344779917/vector/medical-center-hospital-building-vector-design.jpg?s=612x612&w=0&k=20&c=_sZByueZhEZbK2WjQz1jqXy1_Rr5jYkgiVBj-2ls44s="
          }
          alt={hospital.specDrName || "Doctor"}
          className="w-32 h-32 rounded-full object-cover mb-2"
        />
        <h3 className="text-lg font-semibold text-black">
          {hospital.specDrName ? `Dr. ${hospital.specDrName}` : "Doctor's Name"}
        </h3>
      </div>

      {/* Hospital Info Section (75% width on large screens, full width on small screens) */}
      <div className="w-full lg:w-3/4 p-4 text-black">
        <h3 className="text-2xl font-bold">
          {hospital.name || "Hospital Name"}
        </h3>
        <p className="text-md mt-1">
          {hospital.specialist || "Specialization not available"} |{" "}
          {hospital.experience
            ? `${hospital.experience} years experience`
            : "Experience not available"}
        </p>

        <hr className="my-4 border-gray-300" />

        {/* Address displayed in a single line */}
        <p className="text-md">
          <strong>Address:</strong>{" "}
          {hospital.address || "Address not available"},
          {hospital.city ? ` ${hospital.city}` : " City not available"},
          {hospital.state ? ` ${hospital.state}` : " State not available"},
          {hospital.zipCode
            ? ` ${hospital.zipCode}`
            : " Zip-code not available"}
        </p>

        {/* Degree and Languages in one line, centered */}
        <div className="flex justify-center items-center space-x-8 text-md">
          <p>
            <strong>Degree:</strong> {hospital.degree || "Degree not available"}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {hospital.languagesSpoken || "Languages not available"}
          </p>
        </div>

        {isLoggedIn ? (
          <p className="mt-4 text-md text-green-600">{getRandomFeature()} 🥳</p>
        ) : null}

        <hr className="my-4 border-gray-300" />

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

HospitalData.propTypes = {
  hospital: PropTypes.shape({
    name: PropTypes.string,
    doctorImage: PropTypes.string,
    specDrName: PropTypes.string,
    specialist: PropTypes.string,
    experience: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    degree: PropTypes.string,
    languagesSpoken: PropTypes.string,
    facilities: PropTypes.arrayOf(PropTypes.string), // Array of features available at the hospital
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired, // New prop for logged-in status
};

export default HospitalData;

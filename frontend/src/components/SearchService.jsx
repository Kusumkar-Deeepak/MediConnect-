import { useState } from 'react';

const SearchSection = () => {
  // Sample data for hospitals with added details
  const hospitals = [
    {
      name: 'City Hospital',
      city: 'Mumbai',
      address: '123 Mumbai Street',
      doctor: { name: 'Dr. A. Sharma', specialty: 'Cardiologist', experience: '15 years' },
      openingHours: '9:00 AM - 6:00 PM',
      image: 'https://www.saifeehospital.com/img/slides/slide1.jpg',
    },
    {
      name: 'Sunshine Hospital',
      city: 'Delhi',
      address: '456 Delhi Avenue',
      doctor: { name: 'Dr. B. Singh', specialty: 'Orthopedic', experience: '10 years' },
      openingHours: '10:00 AM - 8:00 PM',
      image: 'https://sunshinehospital.co/assets/images/Gallery/Hospital-Front-Main.jpg',
    },
    {
      name: 'Apollo Hospital',
      city: 'Bangalore',
      address: '789 Bangalore Road',
      doctor: { name: 'Dr. C. Rao', specialty: 'Neurologist', experience: '20 years' },
      openingHours: '8:00 AM - 5:00 PM',
      image: 'https://safartibbi.com/wp-content/uploads/2024/05/apollo.jpg',
    },
    {
      name: 'Santa Cruise Valley Hospital',
      city: 'Mumbai',
      address: '101 Mumbai Lane',
      doctor: { name: 'Dr. D. Patil', specialty: 'Dermatologist', experience: '12 years' },
      openingHours: '9:00 AM - 6:00 PM',
      image: 'https://www.guptasen.com/wp-content/uploads/2024/03/Artteza-Towers-Santacruz-West.webp',
    },
    {
      name: 'Care Hospital',
      city: 'Pune',
      address: '121 Pune Street',
      doctor: { name: 'Dr. E. Desai', specialty: 'Pediatrician', experience: '8 years' },
      openingHours: '8:30 AM - 6:00 PM',
      image: 'https://www.puneinsight.com/wp-content/uploads/2020/06/care-main.jpg',
    },
    {
      name: 'Metro Hospital',
      city: 'Hyderabad',
      address: '1234 Hyderabad Road',
      doctor: { name: 'Dr. F. Reddy', specialty: 'General Surgeon', experience: '14 years' },
      openingHours: '7:00 AM - 5:00 PM',
      image: 'https://images1-fabric.practo.com/5555cd34516ec6512bd43d9caa6e02c990b0a82652dca.jpg',
    },
    {
      name: 'Fortis Hospital',
      city: 'Chennai',
      address: '543 Chennai Blvd',
      doctor: { name: 'Dr. G. Iyer', specialty: 'Orthopedic Surgeon', experience: '18 years' },
      openingHours: '10:00 AM - 7:00 PM',
      image: 'https://www.bizzbuzz.news/h-upload/2023/11/25/1820020-fortis.webp',
    },
    {
      name: 'Max Health Care',
      city: 'Delhi',
      address: '678 Delhi Avenue',
      doctor: { name: 'Dr. H. Kapur', specialty: 'ENT Specialist', experience: '11 years' },
      openingHours: '9:00 AM - 5:00 PM',
      image: 'https://d35oenyzp35321.cloudfront.net/Max_Super_Speciality_Hospital_Shalimar_Bagh_jpg_5c1758d700.jpg',
    },
    {
      name: 'Lotus Hospital',
      city: 'Jaipur',
      address: '333 Jaipur Lane',
      doctor: { name: 'Dr. I. Singh', specialty: 'Gynecologist', experience: '16 years' },
      openingHours: '8:00 AM - 4:00 PM',
      image: 'https://cdn.hexahealth.com/Image/cb8ab721-b3fe-4270-908d-0e61d2d9a7de.jpg',
    },
    {
      name: 'Medanta Hospital',
      city: 'Gurgaon',
      address: '451 Gurgaon Circle',
      doctor: { name: 'Dr. J. Gupta', specialty: 'Oncologist', experience: '19 years' },
      openingHours: '9:00 AM - 6:30 PM',
      image: 'https://upload.wikimedia.org/wikipedia/en/6/68/Medanta_the_medicity_hospital.jpg',
    },
    {
      name: 'Rainbow Hospital',
      city: 'Mumbai',
      address: '159 Rainbow Ave',
      doctor: { name: 'Dr. K. Mehta', specialty: 'Pediatrician', experience: '7 years' },
      openingHours: '8:30 AM - 5:00 PM',
      image: 'https://images1-fabric.practo.com/rainbow-children-s-multispecialty-clinic-mumbai-1483344465-586a0a5160419.JPG',
    },
    {
      name: 'Ruby Hall Clinic',
      city: 'Pune',
      address: '256 Pune Street',
      doctor: { name: 'Dr. L. Naik', specialty: 'Radiologist', experience: '13 years' },
      openingHours: '9:00 AM - 7:00 PM',
      image: 'https://images1-fabric.practo.com/rainbow-children-s-multispecialty-clinic-mumbai-1483344465-586a0a5160419.JPG',
    },
    {
      name: 'Narayana Health',
      city: 'Bangalore',
      address: '101 Narayana Road',
      doctor: { name: 'Dr. M. Kumar', specialty: 'Cardiologist', experience: '20 years' },
      openingHours: '8:00 AM - 4:00 PM',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Narayana_Institute_of_Cardiac_Sciences%2C_Bangalore%2C_Karnataka%2C_India_%282014%29.jpg/640px-Narayana_Institute_of_Cardiac_Sciences%2C_Bangalore%2C_Karnataka%2C_India_%282014%29.jpg',
    },
    {
      name: 'AIMS Hospital',
      city: 'Kolkata',
      address: '321 Kolkata Road',
      doctor: { name: 'Dr. N. Banerjee', specialty: 'Endocrinologist', experience: '22 years' },
      openingHours: '10:00 AM - 5:00 PM',
      image: 'https://example.com/aims-hospital.jpg',
    },
    {
      name: 'Sri Ramachandra Hospital',
      city: 'Chennai',
      address: '789 Ramachandra Lane',
      doctor: { name: 'Dr. O. Subramanian', specialty: 'Neurosurgeon', experience: '25 years' },
      openingHours: '9:30 AM - 6:00 PM',
      image: 'https://example.com/sri-ramachandra.jpg',
    },
    {
      name: 'Global Hospital',
      city: 'Mumbai',
      address: '250 Global Avenue',
      doctor: { name: 'Dr. P. Rane', specialty: 'Pulmonologist', experience: '9 years' },
      openingHours: '8:00 AM - 5:00 PM',
      image: 'https://example.com/global-hospital.jpg',
    },
    {
      name: 'Kokilaben Hospital',
      city: 'Mumbai',
      address: '300 Mumbai Main Road',
      doctor: { name: 'Dr. Q. Patel', specialty: 'Gastroenterologist', experience: '12 years' },
      openingHours: '7:30 AM - 8:00 PM',
      image: 'https://example.com/kokilaben-hospital.jpg',
    },
    {
      name: 'Shalby Hospital',
      city: 'Ahmedabad',
      address: '120 Shalby Street',
      doctor: { name: 'Dr. R. Shah', specialty: 'Oncologist', experience: '15 years' },
      openingHours: '10:00 AM - 7:00 PM',
      image: 'https://example.com/shalby-hospital.jpg',
    },
    {
      name: 'SevenHills Hospital',
      city: 'Visakhapatnam',
      address: '405 Vishakha Lane',
      doctor: { name: 'Dr. S. Reddy', specialty: 'Dermatologist', experience: '6 years' },
      openingHours: '8:30 AM - 4:30 PM',
      image: 'https://example.com/sevenhills-hospital.jpg',
    },
    {
      name: 'BLK Super Speciality Hospital',
      city: 'Delhi',
      address: '677 BLK Street',
      doctor: { name: 'Dr. T. Kapoor', specialty: 'Hematologist', experience: '18 years' },
      openingHours: '9:00 AM - 5:00 PM',
      image: 'https://example.com/blk-hospital.jpg',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  // Search function to filter hospitals by city
  const handleSearch = () => {
    const results = hospitals.filter((hospital) =>
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHospitals(results);
    setSearchTerm('');
  };

  return (
    <div
      className="flex flex-col items-center h-auto bg-cover bg-center text-white py-8"
      // style={{
      //   backgroundImage: "url('https://www.saifeehospital.com/img/slides/slide1.jpg')",
      // }}
    >
      <h1 className="text-4xl font-bold mb-4 text-black">Find Hospitals in Your City</h1>
      <div className="flex w-full max-w-lg mb-6">
        <input
          type="text"
          placeholder="Enter city name (e.g., Mumbai)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md text-gray-900"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {/* Styled H3 Element */}
    <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
      For Booking the Hospital Appointment Please Signup/Login.
    </h3>

      {/* Search Results */}
      <div className="w-full max-w-4xl px-4 space-y-4">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300 text-gray-900"
            >
              {/* Image on the Left */}
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-64 h-32 rounded-lg object-cover mr-6"
              />

              {/* Center Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{hospital.name}</h3>
                <p className="text-lg">{hospital.address}</p>
                <p className="text-md mt-2">
                  <strong>Doctor:</strong> {hospital.doctor.name} <br />
                  <strong>Specialty:</strong> {hospital.doctor.specialty} <br />
                  <strong>Experience:</strong> {hospital.doctor.experience}
                </p>
              </div>

              {/* Right Content - Operating Hours */}
              <div className="text-right">
                <p className="text-xl font-semibold">Opening Hours</p>
                <p className="text-lg">{hospital.openingHours}</p>
              </div>
            </div>
          ))
        ) : (
          searchTerm && (
            <p className="text-lg font-semibold text-gray-700 bg-white p-4 rounded-md shadow-md">
              No hospitals found in {searchTerm}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchSection;

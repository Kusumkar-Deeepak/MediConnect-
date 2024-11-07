import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const AppointmentList = () => {
  const { hospitalInfo } = useContext(UserContext);
  const { hospitalId } = useParams();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/appointments/${hospitalId}`);
        console.log("API Response Data:", response.data);  // Log the full response data
        // Ensure appointments have visited initialized correctly
        const updatedAppointments = response.data.map(appt => ({
          ...appt,
          visited: appt.visited === undefined ? null : appt.visited // Ensure visited is null if not defined
        }));
        setAppointments(updatedAppointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (hospitalId) {
      fetchAppointments();
    }
  }, [hospitalId]);

  const updateVisitStatus = async (appointmentId, status) => {
    try {
      await axios.put(`http://localhost:3000/api/appointments/update`, {
        hospitalId,
        appointmentId,
        visited: status,
      });

      setAppointments(prevAppointments =>
        prevAppointments.map(appt =>
          appt._id === appointmentId ? { ...appt, visited: status } : appt
        )
      );
    } catch (error) {
      console.error("Error updating visit status:", error);
    }
  };

  const handleEmojiClick = (appt, status) => {
    updateVisitStatus(appt._id, status);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Appointments for <span className="text-blue-600">{hospitalInfo?.name}</span>
        </h2>
        <div className="mb-4 p-4 bg-gray-100 rounded shadow-md">
          <h3 className="text-lg font-semibold">Hospital Details</h3>
          <p><strong>Address:</strong> {hospitalInfo?.address}</p>
          <p><strong>Contact:</strong> {hospitalInfo?.phone}</p>
          <p><strong>Email:</strong> {hospitalInfo?.email}</p>
        </div>
        <table className="table-auto w-full border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Preferred Date</th>
              <th className="p-2 border">Preferred Time</th>
              <th className="p-2 border">Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <tr key={appt._id} className="text-center border-b hover:bg-gray-100">
                  <td className="p-2 border">{appt.name}</td>
                  <td className="p-2 border">{appt.email}</td>
                  <td className="p-2 border">{appt.phone}</td>
                  <td className="p-2 border">{new Date(appt.preferredDate).toLocaleDateString('en-GB')}</td>
                  <td className="p-2 border">{appt.preferredTime}</td>
                  <td className="p-2 border flex justify-center items-center">
                    {appt.visited === null ? (  // Check if visited is null
                      <>
                        <span
                          onClick={() => handleEmojiClick(appt, true)}
                          className="cursor-pointer text-green-500 mx-1"
                        >
                          ✅
                        </span>
                        <span
                          onClick={() => handleEmojiClick(appt, false)}
                          className="cursor-pointer text-red-500 mx-1"
                        >
                          ❌
                        </span>
                      </>
                    ) : appt.visited ? (
                      <span className="text-green-500">Visited</span>
                    ) : (
                      <span className="text-red-500">Not Visited</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No appointments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AppointmentList;

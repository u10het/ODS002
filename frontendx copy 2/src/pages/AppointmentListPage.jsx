import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AppointmentListPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let endpoint = '/api/appointments';
        if (userInfo.role === 'Doctor') {
          endpoint = '/api/appointments/doctor';
        } else if (userInfo.role === 'Patient') {
          endpoint = '/api/appointments/mine';
        }

        const { data } = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    if (userInfo) fetchAppointments();
  }, [userInfo]);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Patient</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id} className="text-center">
                <td className="border px-4 py-2">
                  {appt.doctor?.name || 'N/A'}
                </td>
                <td className="border px-4 py-2">
                  {appt.patient?.name || 'N/A'}
                </td>
                <td className="border px-4 py-2">
                  {new Date(appt.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{appt.time}</td>
                <td className="border px-4 py-2">{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentListPage;

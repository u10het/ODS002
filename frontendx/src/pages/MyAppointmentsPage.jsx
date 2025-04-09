import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MyAppointmentsPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get('/api/appointments/mine', config);
        setAppointments(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching appointments');
      }
    };

    fetchAppointments();
  }, [userInfo.token]);

  return (
    <div className="my-appointments-page">
      <h2>My Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialization</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="5">No appointments found</td>
            </tr>
          ) : (
            appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.doctor?.name || 'Unknown'}</td>
                <td>{appt.doctor?.specialization || 'N/A'}</td>
                <td>{new Date(appt.date).toLocaleDateString()}</td>
                <td>{appt.time}</td>
                <td>
                  <span
                    className={`status-badge ${
                      appt.status === 'Accepted'
                        ? 'accepted'
                        : appt.status === 'Rejected'
                        ? 'rejected'
                        : 'pending'
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointmentsPage;

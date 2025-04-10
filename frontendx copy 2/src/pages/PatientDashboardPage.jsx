import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PatientDashboardPage = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyAppointments = async () => {
      try {
        const { data } = await axios.get('/api/appointments/mine', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAppointments(data);
      } catch (error) {
        console.error('Failed to load appointments:', error.response?.data?.message || error.message);
      }
    };

    fetchMyAppointments();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">My Appointments</h1>

      <Button
        className="bg-blue-600 text-white mb-6"
        onClick={() => navigate('/book')}
      >
        Book New Appointment
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appt) => (
          <Card key={appt._id} className="rounded-2xl shadow-md">
            <CardContent className="p-4 space-y-2">
              <p><strong>Doctor:</strong> {appt.doctor?.name || 'TBA'}</p>
              <p><strong>Date:</strong> {new Date(appt.date).toDateString()}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Status:</strong> <span className={`font-semibold ${appt.status === 'Pending' ? 'text-yellow-600' : appt.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>{appt.status}</span></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboardPage;

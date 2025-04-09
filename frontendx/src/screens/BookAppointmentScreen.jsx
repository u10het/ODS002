import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookAppointmentScreen = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`/api/users/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctor(data);
      } catch (err) {
        setError('Failed to fetch doctor info');
      }
    };

    if (doctorId && token) {
      fetchDoctor();
    }
  }, [doctorId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(
        '/api/appointments',
        { doctor: doctorId, date, time },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/appointments/mine');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>

      {doctor ? (
        <div className="mb-4">
          <p><strong>Doctor:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
        </div>
      ) : (
        <p>Loading doctor info...</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium">
            Time
          </label>
          <input
            type="time"
            id="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointmentScreen;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const AppointmentBookingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: '',
    date: '',
    time: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('/api/users/doctors', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setDoctors(data);
      } catch (error) {
        console.error('Failed to load doctors:', error.response?.data?.message || error.message);
      }
    };

    fetchDoctors();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/appointments', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Appointment booked successfully!');
      navigate('/dashboard/patient');
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <Label htmlFor="doctor">Select Doctor</Label>
              <Select
                id="doctor"
                value={form.doctorId}
                onValueChange={(val) => setForm({ ...form, doctorId: val })}
              >
                <SelectItem value="">-- Choose Doctor --</SelectItem>
                {doctors.map((doc) => (
                  <SelectItem key={doc._id} value={doc._id}>
                    {doc.name} ({doc.specialization || 'Doctor'})
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                id="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white">
              Book Appointment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBookingPage;

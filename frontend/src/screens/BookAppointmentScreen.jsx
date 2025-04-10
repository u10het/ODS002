// src/screens/BookAppointmentScreen.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const BookAppointmentScreen = () => {
  const { doctorId } = useParams();
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment request sent:', { doctorId, date, reason });
    alert('Appointment booked!');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <Card>
        <CardContent>
          <h2>Book Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <Label htmlFor="date">Select Date:</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Label htmlFor="reason">Reason for Visit:</Label>
              <Input
                id="reason"
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Confirm Booking</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAppointmentScreen;

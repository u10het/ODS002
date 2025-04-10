// src/pages/PatientDashboardPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '../components/ui/card';

const PatientDashboardPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <Card>
        <CardContent>
          <h2>Patient Dashboard</h2>
          <p>Welcome {userInfo?.name || 'Patient'}!</p>
          <p>Here you can book appointments and track your medical records.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboardPage;

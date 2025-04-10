// src/pages/DoctorDashboardPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '../components/ui/card';

const DoctorDashboardPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <Card>
        <CardContent>
          <h2>Doctor Dashboard</h2>
          <p>Welcome Dr. {userInfo?.name || 'Doctor'}!</p>
          <p>You can view and manage your appointments here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboardPage;

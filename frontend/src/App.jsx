// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import AppointmentListPage from './pages/AppointmentListPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import BookAppointmentScreen from './screens/BookAppointmentScreen';
import DoctorRoute from './components/DoctorRoute';
import PatientRoute from './components/PatientRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/doctor/dashboard" element={<DoctorRoute><DoctorDashboardPage /></DoctorRoute>} />
        <Route path="/patient/dashboard" element={<PatientRoute><PatientDashboardPage /></PatientRoute>} />
        <Route path="/appointments/book/:doctorId" element={<PatientRoute><BookAppointmentScreen /></PatientRoute>} />
        <Route path="/appointments" element={<PatientRoute><AppointmentListPage /></PatientRoute>} />
        <Route path="/my-appointments" element={<PatientRoute><MyAppointmentsPage /></PatientRoute>} />
      </Routes>
    </Router>
  );
};

export default App;

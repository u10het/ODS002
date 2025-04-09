import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppointmentListPage from './pages/AppointmentListPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';

import DoctorRoute from './components/DoctorRoute';
import PatientRoute from './components/PatientRoute';
import Navbar from './components/Navbar';

import DoctorDashboardPage from './pages/DoctorDashboardPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import BookAppointmentScreen from './screens/BookAppointmentScreen';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Doctor-only route */}
        <Route
          path="/appointments"
          element={
            <DoctorRoute>
              <AppointmentListPage />
            </DoctorRoute>
          }
        />

        {/* Patient-only route for booking */}
        <Route
          path="/book"
          element={
            <PatientRoute>
              <AppointmentBookingPage />
            </PatientRoute>
          }
        />

        {/* Patient-only route for viewing own appointments */}
        <Route
          path="/my-appointments"
          element={
            <PatientRoute>
              <MyAppointmentsPage />
            </PatientRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <DoctorRoute>
              <DoctorDashboardPage />
            </DoctorRoute>
          }
        />

        <Route
          path="/dashboard/patient"
          element={
            <PatientRoute>
              <PatientDashboardPage />
            </PatientRoute>
          }
        />

        <Route path="/appointments/book/:doctorId" element={<BookAppointmentScreen />} />

        <Route path="/book/:doctorId" element={<BookAppointmentScreen />} />


      </Routes>
    </>
  );
}

export default App;

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <main className="home-container">
      <section className="welcome-section">
        <h1>Welcome to Online Doctor System</h1>
        <p>Your one-stop platform for online medical consultations.</p>

        {!userInfo && (
          <div className="auth-buttons">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        )}

        {userInfo?.role === 'Doctor' && (
          <div className="dashboard-links">
            <h3>Doctor Dashboard</h3>
            <Link to="/appointments" className="btn-primary">View My Appointments</Link>
          </div>
        )}

        {userInfo?.role === 'Patient' && (
          <div className="dashboard-links">
            <h3>Patient Dashboard</h3>
            <Link to="/book" className="btn-primary">Book an Appointment</Link>
            <Link to="/my-appointments" className="btn-secondary">My Appointments</Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;

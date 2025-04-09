import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Online Doctor</Link>
      </div>

      <ul className="navbar-links">
        {userInfo ? (
          <>
            <li>
              <Link to="/profile">Hi, {userInfo.name}</Link>
            </li>

            {userInfo.role === 'Doctor' && (
              <li>
                <Link to="/appointments">My Appointments</Link>
              </li>
            )}

            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

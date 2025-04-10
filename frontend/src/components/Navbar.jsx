// src/components/Navbar.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  // Safer: Prevents destructure errors
  const user = useSelector((state) => state.user || {});
  const userInfo = user.userInfo || null;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/">Home</Link>
      {userInfo ? (
        <>
          <span style={{ margin: '0 1rem' }}>Welcome, {userInfo.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: '1rem' }}>Login</Link>
          <Link to="/register" style={{ marginLeft: '1rem' }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;

// src/components/DoctorRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DoctorRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);

  return userInfo && userInfo.role === 'doctor' ? children : <Navigate to="/" />;
};

export default DoctorRoute;

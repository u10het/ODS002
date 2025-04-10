// src/components/PatientRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PatientRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);

  return userInfo && userInfo.role === 'patient' ? children : <Navigate to="/" />;
};

export default PatientRoute;

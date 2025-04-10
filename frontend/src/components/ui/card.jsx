import React from 'react';

export const Card = ({ children }) => {
  return <div style={{ border: '1px solid #ccc', padding: '1rem' }}>{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div style={{ marginTop: '0.5rem' }}>{children}</div>;
};

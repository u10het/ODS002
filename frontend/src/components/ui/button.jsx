// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, onClick, type = 'button', ...rest }) => (
  <button
    onClick={onClick}
    type={type}
    {...rest}
    className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
  >
    {children}
  </button>
);

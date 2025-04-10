// src/components/ui/input.jsx
import React from 'react';

export const Input = ({ type = 'text', ...rest }) => (
  <input
    type={type}
    {...rest}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  />
);

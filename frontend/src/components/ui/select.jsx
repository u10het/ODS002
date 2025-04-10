import React from 'react';

const Select = ({ label, name, options = [], value, onChange }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <select name={name} value={value} onChange={onChange}>
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

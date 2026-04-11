// src/components/SelectField.jsx
import React from 'react';

const SelectField = ({ label, name, value, onChange, options = [], placeholder, error, helper, required, className = '' }) => (
  <div className={className}>
    {label && (
      <label htmlFor={name} className="block text-slate-300 text-sm font-semibold mb-1.5">
        {label}
        {required && <span className="text-risk ml-0.5">*</span>}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`field appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%226%22%20viewBox%3D%220%200%2012%206%22%3E%3Cpath%20d%3D%22M0%200l6%206%206-6%22%20fill%3D%22%23D4AF37%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]
        ${!value ? '!text-slate-500' : ''}
        ${error ? '!border-risk/50 focus:!border-risk/70' : ''}`}
    >
      <option value="" disabled>{placeholder || 'Select...'}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-brand-bg text-slate-200">{opt.label}</option>
      ))}
    </select>
    {error  && <p className="text-risk text-xs mt-1 font-medium">{error}</p>}
    {helper && !error && <p className="text-slate-600 text-xs mt-1">{helper}</p>}
  </div>
);

export default SelectField;

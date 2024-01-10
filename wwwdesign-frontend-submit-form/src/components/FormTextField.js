import React from 'react';
import '../styles.css'
import './FormTextField.css'

const FormTextField = ({ fieldName, label, value, handleChange }) => {
    return (
        <div className="form-group">
          <label>{label}</label>
          <input
            key={fieldName}
            type="text"
            name={fieldName}
            value={value}
            className='form-text-field'
            onChange={handleChange}
          />
        </div>
)};

export default FormTextField;
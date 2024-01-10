import React from 'react';
import '../styles.css'
import './FormNumberField.css'

const FormNumberField = ({ fieldName, label, value, handleChange }) => {
    return (
        <div className="form-group">
        <label>{label}</label>
        <input
          type="number"
          name={fieldName}
          value={value}
          onChange={handleChange}
          className='form-number-field'
        />
      </div>
)};

export default FormNumberField;
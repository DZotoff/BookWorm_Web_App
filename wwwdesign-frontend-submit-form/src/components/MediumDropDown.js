import React from 'react';
import './MediumDropDown.css'
import '../styles.css'

const mediumOptions = [{dbKey: 'paperBack', value: 'Physical Copy'}, 
    {dbKey: 'ebook', value: 'E-book'}, {dbKey: 'audioBook', value: 'Audio Book'}];

const MediumDropDown = ({ value, handleChange  }) => {
    return(
        <div className="form-field select-wrapper">
          <label htmlFor="medium">Medium: </label>
          <select
            id="medium"
            value={value}
            onChange={handleChange}
          >
          <option value="">Select a medium</option>
            {mediumOptions.map((medium) => (
              <option key={medium.dbKey} value={medium.value}>
                {medium.value}
              </option>
            ))}
          </select>
        </div>
    )};


export default MediumDropDown;
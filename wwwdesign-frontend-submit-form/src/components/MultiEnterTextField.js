import React from 'react';
import { FormControl, InputGroup, Badge } from 'react-bootstrap';

export default function MultiEnterTextField ({ inputValue, onInputChange, onEnter, getEntries }) {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault(); 
      onEnter(inputValue);
      onInputChange('');
    }
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Type here and press Enter..."
        value={inputValue}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <InputGroup.Append>
        {getEntries().map((entry, index) => (
          <Badge key={index} variant="primary" className="mr-2">
            {entry}
          </Badge>
        ))}
      </InputGroup.Append>
    </InputGroup>
  )
};


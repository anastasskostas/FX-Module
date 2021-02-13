import React, { forwardRef } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomCalendarInput = ({ onChange, placeholder, value, id, onClick }, ref) => (
  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon={['fas', 'calendar-alt']} /></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      id={id}
      onClick={onClick}
      readOnly
    />
  </InputGroup>
);

export default forwardRef(CustomCalendarInput);
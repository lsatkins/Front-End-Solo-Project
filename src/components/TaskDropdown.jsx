import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {useDispatch} from 'react-redux'
import {updateStatus} from '../slices/searchSlice'

function TaskDropdown({statusObj}) {

  const dispatch = useDispatch()

  const handleDropdownSelect = (eventKey) => {
    dispatch(updateStatus({
        obj: statusObj,
        value: eventKey
    }))

  };

  return (
    <Dropdown onSelect={handleDropdownSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Update
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Saved">Saved</Dropdown.Item>
        <Dropdown.Item eventKey="Applied">Applied</Dropdown.Item>
        <Dropdown.Item eventKey="Interviewed">Interviewed</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TaskDropdown;


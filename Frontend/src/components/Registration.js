import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Add a message state for displaying registration status

  const handleRegistration = () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    };

    axios.post('http://localhost:5001/register', userData)
      .then(response => {
        console.log(response.data);
        setMessage('Registration successful!'); // Set success message
      })
      .catch(error => {
        console.error('Registration error:', error);
        setMessage('Error registering. Please try again.'); // Set error message
      });
  };

  return (
    <div className="registration-bg"
      style={{
        background: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKHZcOzIs5Q6pC1hxOdZTeOpkD-0qmXXmYA&usqp=CAU") no-repeat center center fixed`,
        backgroundSize: 'cover',
        minHeight: '80vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <h2>Registration</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Group>
          
          {/* Repeat similar Form.Group elements for lastName, username, email, and password */}
          
          <Button variant="outline-secondary" onClick={handleRegistration}>
            Register
          </Button>
          
          <p className="mt-2">{message}</p> {/* Display registration status message */}
        </Form>
      </div>
    </div>
  );
};

export default Registration;

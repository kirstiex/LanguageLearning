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

  const handleRegistration = () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    };

    axios.post('http://localhost:5001/register', userData).then(response => {
      console.log(response.data);
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


        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="outline-secondary" onClick={handleRegistration}>
          Register
        </Button>
      </Form>
    </div>
    </div>
  );
};


export default Registration;

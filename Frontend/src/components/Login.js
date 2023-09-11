import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://localhost:5001/login', {
      username,
      password
    })
      .then(response => {
        console.log("Login successful:", response.data.message);
        setMessage('Login successful!'); // Set success message
        console.log('Redirecting to dashboard...');
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Login error:', error.response.data.message);
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="login-bg"
      style={{
        background: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfS8ou0joRKLTUoBbz3tZtsn2aP6FrqZDohUL1Mq402jPZgdiPmer7Z-2dyzEPK4TkzbU&usqp=CAU") no-repeat center center fixed`,
        backgroundSize: 'cover',
        minHeight: '67vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <h2>Login</h2>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Button variant="outline-secondary" onClick={handleLogin}>
            Login
          </Button>


          <p>{message}</p>
        </Form>
      </div>
    </div>
  );
};
export default Login;

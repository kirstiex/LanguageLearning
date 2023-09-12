import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './AuthContext';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import QuizList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';
import './styles.css';
import QuestionListAdmin from './components/QuestionListAdmin';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data if logged in
    axios.get('http://localhost:5001/check-login')
      .then(response => {
        console.log("User data response:", response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="home-bg"
          style={{
            background: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HbenPKbopMZmrWrxgYWBj-d3OqT3crsCSg&usqp=CAU") no-repeat center center fixed`,
            backgroundSize: 'cover',
            minHeight: '100vh', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="App">
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container>
                <Navbar.Brand as={Link} to="/">Language Learning Platform</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav>
                    <Nav.Link as={Link} to="/register">
                      Register
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <Container className="mt-4">
            <Routes>

              <Route path="/register" component={Registration} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" render={(props) => <Dashboard {...props} user={user} setUser={setUser} />} />
              <Route path="/card-list" component={QuizList} />
              <Route path="/add-card" component={AddQuestion} />
              <Route path="/admin-card-list" component={QuestionListAdmin} />
              </Routes>
              </Container>
          </div>
        </div>
        <footer className="app-footer">
          <p>App made by: </p>
        </footer>
      </AuthProvider>
    </Router>
  );
}

export default App;

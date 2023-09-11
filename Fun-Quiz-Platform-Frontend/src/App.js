import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
import Quiz from './components/Quiz';


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
                <Navbar.Brand as={Link} to="/">Fun Interactive Learning Quiz</Navbar.Brand>
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
              <Route path="/" exact>
                <div>
                  <h2>HOME</h2>
                  {user ? (
                    <p>WELCOME TO OUR PAGE</p>
                  ) : (
                    <p>Please register or log in.</p>
                  )}
                </div>
              </Route>
              <Route path="/register" component={Registration} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard">
                <Dashboard user={user} setUser={setUser} />
              </Route>
              <Route path="/card-list">  <QuizList /> </Route>
              <Route path="/add-card"> <AddQuestion /></Route>
              <Route path="/admin-card-list" ><QuestionListAdmin /></Route>
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
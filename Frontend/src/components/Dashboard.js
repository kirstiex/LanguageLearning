import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Card from 'react-bootstrap/Card';
import '../styles.css';

function Dashboard() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:5001/logout')
      .then(response => {
        console.log(response.data.message);
        setIsLoggedIn(false); // Clear user's login status
        navigate('/login'); // Use navigate to programmatically navigate
      })
      .catch(error => {
        console.error('Logout error:', error.response ? error.response.data.message : error.message);
      });
  };

  return (
    <div className="dashboard-bg">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="outline-secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div>
        <h2>Welcome to the Dashboard</h2>
        <br />

        <div className="card-container">
          <br />

          <Link to="/add-card" className="dashboard-card-link">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>Add Question</Card.Title>
                <Card.Text>Add a new question to the quiz.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <br />
          <Link to="/card-list" className="dashboard-card-link">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>Question List</Card.Title>
                <Card.Text>View the list of quiz questions.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <br />
          <Link to="/admin-card-list" className="dashboard-card-link">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>Question List (Admin)</Card.Title>
                <Card.Text>View and delete quiz questions.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <br />
          <Link to="/card" className="dashboard-card-link">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>Quiz</Card.Title>
                <Card.Text>Take a quiz and test your knowledge.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <br />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;

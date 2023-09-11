import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function QuestionListAdmin() {
  const [english, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:5001/card/list')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
  }, []);



  const handleDeleteQuestion = (question) => {
    axios.post('http://localhost:5001/card/delete', { english }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response.data.message);
      // Remove the card from the state
      setCards(english.filter(e => e.english !== english));
    })
      .catch(error => {
        console.error('Error deleting Card:', error.response ? error.response.data.message : error.message);
      });
  };

  const handleBackToDashboard = () => {
    history.push('/dashboard'); // Navigate back to dashboard
  };

  return (
    <div>
      <Button variant="outline-secondary" onClick={handleBackToDashboard} className="sticky-button">
        Back to Main
      </Button>
      <h2>Question List (Admin)</h2>
      {english.map((english, index) => (
        <div key={index} className="admin-question">
          <strong> </strong> {english.english}
          <br />
          <strong> </strong> {english.translation}
          <br />
          <Button variant="outline-danger" onClick={() => handleDeleteQuestion(english.english)}>
            Delete Card
          </Button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default QuestionListAdmin;

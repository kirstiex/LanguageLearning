import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function QuestionList() {
  const [english, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5001/card/list')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
  }, []);

  const [flippedCard, setFlippedCard] = useState(null);

  const handleCardClick = index => {
    setFlippedCard(index === flippedCard ? null : index);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <Button variant="outline-secondary" onClick={handleBackToDashboard} className="sticky-button">
        Back to Dashboard
      </Button>

      <h2>Cards</h2>
      {english.map((english, index) => (
        <div
          key={index}
          className={`flip-card ${flippedCard === index ? 'flipped' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          <div className="flip-card-inner">
            <div className="flip-card-back">
              <strong> </strong> {english.english}
            </div>
            <div className="flip-card-front">
              <strong> </strong> {english.translation}
              <br />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;

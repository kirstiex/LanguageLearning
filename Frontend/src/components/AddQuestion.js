import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles.css';
import { useNavigate } from 'react-router-dom';


function AddQuestion() {
  const [english, setEnglish] = useState('');
  const [translation, setTranslation] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5001/cards', {
        english,
        translation,
        category,
        difficulty,
      })
      .then((response) => {
        console.log(response.data.message);
        setMessage('Card added successfully!');
        setEnglish('');    
        setTranslation('');    
        setCategory('');     
        setDifficulty('');   
      })
      .catch((error) => {
        console.error('Error adding card:', error.response.data.message);
        setMessage('Error adding card. Please try again.');
      });
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="container mt-4">
      
      <br/>

      <Button variant="outline-secondary" onClick={handleBackToDashboard} className="sticky-button">
        Back to Dashboard
      </Button>
      <br/>

      <br />
      <h2>Add New Question</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="english">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the English side"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="translation">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Translation side"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter difficulty (0-5)"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Button variant="outline-secondary" type="submit">
          Add Question
        </Button>
      <br/>
        <p className="mt-2">{message}</p>
      </Form>

    </div>
  );
}

export default AddQuestion;

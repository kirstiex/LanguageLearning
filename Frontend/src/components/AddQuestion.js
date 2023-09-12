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
        navigate('/dashboard'); // Use navigate to programmatically navigate
      })
      .catch((error) => {
        console.error('Error adding card:', error.response.data.message);
        setMessage('Error adding card. Please try again.');
      });
  };

  return (
    <div className="container mt-4">
      <br />
      <Button variant="outline-secondary" onClick={() => navigate('/dashboard')} className="sticky-button">
        Back to Dashboard
      </Button>
      <br />
      <br />
      <h2>Add New Question</h2>
      <Form onSubmit={handleSubmit}>
        {/* Rest of your form code */}
      </Form>
      <br />
      <p className="mt-2">{message}</p>
    </div>
  );
}

export default AddQuestion;

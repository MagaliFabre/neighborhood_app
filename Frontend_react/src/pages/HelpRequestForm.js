// src/components/HelpRequestForm.js
import React, { useState } from 'react';
import axios from 'axios';

const HelpRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [requestType, setRequestType] = useState('material-assistance');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/help_requests', {
        help_request: { title, description, address, request_type: requestType, status: 'unfulfilled' }
      });
      console.log('Help request created:', response.data);
      // Clear form
      setTitle('');
      setDescription('');
      setAddress('');
      setRequestType('material-assistance');
    } catch (error) {
      console.error('Error creating help request:', error);
      setError('Failed to create help request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Request Type:</label>
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          required
        >
          <option value="material-assistance">Material Assistance</option>
          <option value="human-assistance">Human Assistance</option>
        </select>
      </div>
      <button type="submit">Create Help Request</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default HelpRequestForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate pour la redirection
import { Container, Typography, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material'; // Importez les composants MUI nécessaires


const HelpRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [requestType, setRequestType] = useState('material-assistance');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  // const checkIfUserIsLoggedIn = () => {
  //     // Insérez ici votre logique pour vérifier si l'utilisateur est connecté
  //     // Par exemple, vous pouvez vérifier si un token d'authentification est présent dans le localStorage
  //   return localStorage.getItem('authToken') !== null; // Par exemple
  // };
    
  //   // Vérifiez si l'utilisateur est connecté avant de soumettre le formulaire
  // const userLoggedIn = checkIfUserIsLoggedIn(); // Remplacez cette fonction par votre propre logique

  //   if (!checkIfUserIsLoggedIn()) {
  //     // Rediriger l'utilisateur vers la page de connexion s'il n'est pas connecté
  //     window.location.href = '/'; // Utilisez navigate pour la redirection
  //     return null; // Ne rend pas le formulaire si l'utilisateur n'est pas connecté
  //   }


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
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Create Help Request
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Request Type</InputLabel>
            <Select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              label="Request Type"
              required
            >
              <MenuItem value="material-assistance">Material Assistance</MenuItem>
              <MenuItem value="human-assistance">Human Assistance</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Help Request
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Box>
    </Container>
  );
};

export default HelpRequestForm;
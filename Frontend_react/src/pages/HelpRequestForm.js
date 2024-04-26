import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';
import api from '../api/api'; 

function HelpRequestForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');


const userId = localStorage.getItem('userId'); 

const handleSubmit = async (event) => {
  event.preventDefault();
  const helpRequestData = {
    title,
    description,
    address,
    user_id: userId 
  };

  try {
    const response = await api.post('/help_requests', { help_request: helpRequestData });
    console.log('Demande d’aide créée:', response.data);
  } catch (error) {
    console.error('Échec de la création de la demande:', error);
  }
};


  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">Nouvelle Demande d’Aide</Typography>
      <form onSubmit={handleSubmit}>
        <TextField margin="normal" required fullWidth label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField margin="normal" required fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Autocomplete
  style={{ width: '100%' }}
  onPlaceSelected={(place) => {
    setAddress(place.formatted_address);
  }}
  types={['address']}
        >
  <TextField
    fullWidth
    label="Adresse"
    margin="normal"
    required
    onChange={(e) => setAddress(e.target.value)}
    value={address}
  />
</Autocomplete>

        <Button type="submit" fullWidth variant="contained" color="primary">Soumettre</Button>
      </form>
    </Container>
  );
}

export default HelpRequestForm;

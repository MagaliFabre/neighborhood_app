import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function SigninPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/sign_in', 
        {
          email: email,
          password: password,
        }
      );
  
      // Utilisez setUser ici si vous l'avez déclaré correctement
      console.log('Login successful', response);
      props.setUser(response.data.user)
      // Gérer la suite après la connexion réussie, par exemple rediriger l'utilisateur vers une autre page
    } catch (error) {
      console.error('Login failed: ', error);
      // Gérer les erreurs de connexion, par exemple afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Email Address" variant="outlined" fullWidth margin="normal" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

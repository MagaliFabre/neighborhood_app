import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = ({ handleSuccessfulAuth }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/registrations`, {
        user: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          password_confirmation: userData.passwordConfirmation,
        },
      }, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 'created') {
          handleSuccessfulAuth(response.data);
          navigate('/dashboard'); // Redirection vers le tableau de bord
        }
      })
      .catch((error) => {
        console.log('registration error', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email Address"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirm Password"
            name="passwordConfirmation"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.passwordConfirmation}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Registration;

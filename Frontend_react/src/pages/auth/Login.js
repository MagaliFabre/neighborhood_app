import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = ({ handleSuccessfulAuth }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [loginErrors, setLoginErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    console.log("SUBMIT");
    event.preventDefault();
    axios
      .post('http://localhost:3000/sessions', {
        user: {
          email: userData.email,
          password: userData.password,
        },
    }, { withCredentials: true })
    .then(response => {
      console.log(response);
      if (response.data.logged_in) {
        handleSuccessfulAuth(response.data);
        navigate('/dashboard');
      }
    })
    .catch(error => {
      console.log('login error', error);
      setLoginErrors('Invalid email or password');
    });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>
          {loginErrors && <p>{loginErrors}</p>}
        </form>
      </Box>
    </Container>
  );
};



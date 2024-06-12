import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material'; // Import des composants MUI
import SignupButton from '../components/elements/SignupButton'; // Import du composant SignupButton
import { Login } from './auth/Login';

export const HomePage = (props) => {
  const { handleLogin, handleLogout, loggedInStatus } = props;
  const navigate = useNavigate();

  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    navigate("/dashboard"); // Utilisation de navigate pour rediriger
  };

  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        console.log(response.status);
        handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to the Neighborhood App
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Status: {loggedInStatus}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Log in or create an account to get started with the application.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <SignupButton /> {/* Bouton "Sign Up" */}
        </Grid>
        <Grid item>
          <Login handleSuccessfulAuth={handleSuccessfulAuth} />
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

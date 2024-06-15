import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import SignupButton from '../components/elements/SignupButton';
import { Login } from './auth/Login';

export const HomePage = (props) => {
  const { handleLogin, loggedInStatus } = props;
  const navigate = useNavigate();
  const [unfulfilledRequestsCount, setUnfulfilledRequestsCount] = useState(0);

  useEffect(() => {
    const fetchUnfulfilledRequestsCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOSTNAME}/help_requests?status=unfulfilled`);
        const unfulfilledRequests = response.data.filter(request => request.status === "unfulfilled")
        setUnfulfilledRequestsCount(unfulfilledRequests.length);
      } catch (error) {
        console.error('Error fetching unfulfilled requests:', error);
      }
    };

    fetchUnfulfilledRequestsCount();
  }, []);

  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1976D2' }}>
        Welcome to the Neighborhood App
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Connect with your neighbors and help each other out!
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#ffffff', marginY: 2 }}>
        <Typography variant="body1" align="center" sx={{ color: '#1565c0' }}>
          There are {unfulfilledRequestsCount} requests available today.
        </Typography>
        </Paper>
      <Typography variant="body1" align="center" gutterBottom>
        Log in or create an account to get started with the application.
      </Typography>

      
      <Box display="flex" justifyContent="center" mt={2}>
        <Grid container spacing={2} justifyContent="left" alignItems="left">
          <Grid item>
            <SignupButton />
          </Grid>
          <Grid item>
            <Login handleSuccessfulAuth={handleSuccessfulAuth} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

import React, { useState, useEffect } from 'react';
import MapContainer from '../components/modules/MapContainer';
import Typography from '@mui/material/Typography'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const Dashboard = ({ user }) => {
  const [unfulfilledRequestsCount, setUnfulfilledRequestsCount] = useState(0);

  useEffect(() => {
    // Function to fetch unfulfilled requests
    const fetchUnfulfilledRequestsCount = async () => {
      try {
        const response = await axios.get(`https://neighborhood-app-back.onrender.com/help_requests`);
        const unfulfilledRequests = response.data.filter(request => request.status === "unfulfilled" && !request.recycled)
        setUnfulfilledRequestsCount(unfulfilledRequests.length);
      } catch (error) {
        console.error('Error fetching unfulfilled requests:', error);
      }
    };

    fetchUnfulfilledRequestsCount();
  }, []);

  return (
    <StyledBox>
      <Grid container spacing={2} justifyContent="center" sx={{ color: '#1976D2' }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {user && (
            <Typography variant="h6" align="center" sx={{ color: '#808080' }} gutterBottom>
              Welcome, {user.name}! Help your neighbors by responding to a request.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#ffffff' }}>
            <Typography variant="body1" align="center" sx={{ color: '#1976D2' }} gutterBottom>
              There are {unfulfilledRequestsCount} requests available today.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <MapContainer markers={markers} />
        </Grid>
      </Grid>
    </StyledBox>
  );
};

const markers = [];
export default Dashboard;

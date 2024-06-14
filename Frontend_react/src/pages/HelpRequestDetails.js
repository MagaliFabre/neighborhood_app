import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box, Snackbar, Alert, Card, CardContent } from '@mui/material';

const HelpRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [helpRequest, setHelpRequest] = useState(null);
  const [error, setError] = useState(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    const fetchHelpRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/help_requests/${id}`);
        setHelpRequest(response.data);
      } catch (error) {
        setError(error.message);
        setOpenErrorSnackbar(true);
      }
    };

    fetchHelpRequest();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/help_requests/${id}`);
      setOpenSuccessSnackbar(true);
      setTimeout(() => {
        setOpenSuccessSnackbar(false);
        navigate('/dashboard');
      }, 3000); // Close Snackbar and navigate after 3 seconds
    } catch (error) {
      setError(error.message);
      setOpenErrorSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!helpRequest) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom color="primary">
              {helpRequest.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {helpRequest.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Created on: {new Date(helpRequest.created_at).toLocaleDateString()}
            </Typography>
            <Button component={Link} to={`/edit-help-request/${id}`} variant="contained" color="primary" sx={{ mr: 2 }}>
              Edit
            </Button>
            <Button variant="outlined"  onClick={handleDelete}>
              Delete
            </Button>
          </CardContent>
        </Card>
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={3000} // Show for 3 seconds
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Help request successfully deleted!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            Failed to delete help request. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default HelpRequestDetails;

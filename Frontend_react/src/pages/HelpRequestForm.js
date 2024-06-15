import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';

const HelpRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [requestType, setRequestType] = useState('material-assistance');
  const [error, setError] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false); 
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://neighborhood-app-back.onrender.com/help_requests`, {
        help_request: { title, description, address, request_type: requestType, status: 'unfulfilled', recycled: false }
      });
      console.log('Help request created:', response.data);
      // Clear form
      setTitle('');
      setDescription('');
      setAddress('');
      setRequestType('material-assistance');
      // Show success Snackbar
      setOpenSuccessSnackbar(true);
    } catch (error) {
      console.error('Error creating help request:', error);
      setError('Failed to create help request. Please try again.');
      // Show error Snackbar
      setOpenErrorSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
    if (!error) {
      navigate('/dashboard'); 
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976D2' }}>
          Create a new help request
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
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Help request successfully created!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            Failed to create help request. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default HelpRequestForm;

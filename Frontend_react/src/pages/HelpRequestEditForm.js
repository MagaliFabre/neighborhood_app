import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';

const HelpRequestEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [requestType, setRequestType] = useState('');
  const [error, setError] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false); 
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    const fetchHelpRequest = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOSTNAME}/help_requests/${id}`);
        const { title, description, address, request_type } = response.data;
        setTitle(title);
        setDescription(description);
        setAddress(address);
        setRequestType(request_type);
      } catch (error) {
        console.error('Error fetching help request:', error);
      }
    };

    fetchHelpRequest();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_HOSTNAME}/help_requests/${id}`, {
        help_request: { title, description, address, request_type: requestType }
      });
      setOpenSuccessSnackbar(true);
      setTimeout(() => navigate('/my-help-requests'), 3000); // Delay navigation to show the Snackbar
    } catch (error) {
      console.error('Error updating help request:', error);
      setError('Failed to update help request. Please try again.');
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

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Edit Help Request
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
            Save Changes
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Help request successfully updated!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            Failed to update help request. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default HelpRequestEditForm;

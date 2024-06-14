import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, Grid, Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MyHelpRequests = ({ currentUserId }) => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/help_requests`);
        setHelpRequests(response.data.filter(request => request.user_id === currentUserId));
      } catch (error) {
        setError(error.message);
      }
    };

    if (currentUserId) {
      fetchHelpRequests();
    }
  }, [currentUserId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (helpRequests.length === 0) {
    return <div>No help requests found.</div>;
  }

  const handleClick = (id) => {
    console.log(id);
    axios.put(`http://localhost:3000/help_requests/${id}`, { recycled: false })
      .then(response => {
        setHelpRequests(oldArray => {
          return oldArray.map(element => {
            return {
              ...element,
              recycled: element.id === id ? response.data.recycled : element.recycled
            }
          })
        });
      })
  }

  return (
    <Container >
      <Box my={4}>
        <Grid container spacing={3}>
          {helpRequests.map((request) => (
            <Grid item xs={12} key={request.id}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardActionArea component={Link} to={`/show-help-request/${request.id}`}>
                  <CardContent>
                    <Typography variant="h6" color="primary">{request.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {request.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Created on: {new Date(request.created_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Button disabled={!request.recycled} onClick={() => handleClick(request.id)} variant='contained'>Republish</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MyHelpRequests;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Container, List, ListItem } from '@mui/material';

function ConversationMessages() {
  const { title } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get(`http://localhost:3000/annonces/${encodeURIComponent(title)}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchMessages();
  }, [title]);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Messages for {title}
        </Typography>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} sx={{ marginBottom: 2 }}>
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {message.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {message.sender.name} to {message.receiver.name}
                  </Typography>
                  <Typography variant="body2">
                    {message.content}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {message.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sent at: {new Date(message.sent_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default ConversationMessages;

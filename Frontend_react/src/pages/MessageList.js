import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Container, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

function MessageList() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    async function fetchConversations() {
      try {
        const response = await axios.get('http://localhost:3000/messages/user_messages');
        setConversations(response.data.conversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    }

    fetchConversations();
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Conversations
        </Typography>
        <List>
          {conversations.map((conversation) => (
            <ListItem key={conversation.title} sx={{ marginBottom: 2 }}>
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    <Link to={`/annonces/${encodeURIComponent(conversation.title)}/messages`}>{conversation.title}</Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {conversation.messages.length} messages
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

export default MessageList;

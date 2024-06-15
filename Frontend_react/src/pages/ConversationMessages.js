import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ConversationMessages({ currentUserId }) {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageReceiver, setMessageReceiver] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState(null);
  const [requestTitle, setRequestTitle] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOSTNAME}/annonces/${id}/messages/annonce_messages`);
      const allMessages = [...response.data.sent_messages, ...response.data.received_messages];
      allMessages.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
      setMessageReceiver(response.data.received_messages[0]?.sender);
      setRequestTitle(response.data.received_messages[0]?.title);
      setMessages(allMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Error fetching messages');
    }
  };

  useEffect(() => {
    fetchMessages();


    const intervalId = setInterval(fetchMessages, 3000);
    return () => clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
  }, [id]);

  const handleReply = async () => {
    try {
      const receiverId = messageReceiver.id;
      const annonceTitle = requestTitle;

      const response = await axios.post(`${process.env.REACT_APP_HOSTNAME}/messages`, {
        message: {
          content: replyContent,
          title: annonceTitle,
          sender_id: currentUserId,
          receiver_id: receiverId,
          help_request_id: id,
          sent_at: new Date(),
          status: 'sent',
        },
      });

      // Logique supplémentaire si nécessaire après l'envoi du message

    } catch (error) {
      console.error('Error replying to message:', error);
      setError('Error replying to message');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ color: '#1976D2' }}> 
          {requestTitle} - Chat with {messageReceiver?.name}
        </Typography>
        <List>
          {messages.length > 0 ? (
            messages.map((message) => (
              <ListItem key={message.id} sx={{ marginBottom: 2 }}>
                <Card
                  variant="outlined"
                  sx={{
                    width: '100%',
                    backgroundColor: message.sender_id === currentUserId ? 'lightblue' : 'lightgray',
                  }}
                >
                  <CardContent>
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Sent at: {new Date(message.sent_at).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))
          ) : (
            <Typography>No messages found for this conversation.</Typography>
          )}
        </List>
        <Box mt={4}>
          <TextField
            label="Reply"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  onClick={handleReply}
                >
                  Send
                </Button>
              ),
            }}
          />
        </Box>
        {error && <Typography variant="body1" color="error">{error}</Typography>}
      </Box>
    </Container>
  );
}

export default ConversationMessages;

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
  Avatar,
  CardHeader,
  Divider,
  CardActionArea
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { deepOrange, deepPurple } from '@mui/material/colors';

function ConversationMessages({ currentUserId }) {
  const { id } = useParams();
  const [messages, setMessages] = useState({ sent_messages: [], received_messages: [] });
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/annonces/${id}/messages/annonce_messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Error fetching messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const handleReply = async () => {
    try {
      const receiverId = messages.received_messages[0]?.sender.id;
      const annonceTitle = messages.received_messages[0]?.title;

      const response = await axios.post(`http://localhost:3000/messages`, {
        message: {
          content: replyContent,
          title: annonceTitle,
          sender_id: currentUserId,
          receiver_id: receiverId,
          help_request_id: id,
          sent_at: new Date(),
          status: 'sent'
        }
      });

      console.log('Message sent:', response.data);
      setReplyContent('');
      fetchMessages();
    } catch (error) {
      console.error('Error replying to message:', error);
      setError('Error replying to message');
    }
  };

  const renderMessage = (message, type) => (
    <ListItem key={message.id} sx={{ marginBottom: 2 }}>
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: type === 'sent' ? deepOrange[500] : deepPurple[500] }}>
            {type === 'sent' ? message.receiver.name.charAt(0) : message.sender.name.charAt(0)}
          </Avatar>}
          title={type === 'sent' ? `To: ${message.receiver.name}` : `From: ${message.sender.name}`}
          subheader={`Status: ${message.status}`}
        />
        <Divider />
        <CardContent>
          <Typography variant="body1">{message.content}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Sent at: {new Date(message.sent_at).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </ListItem>
  );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Messages for Conversation {id}
        </Typography>
        <List>
          {messages.sent_messages.length > 0 || messages.received_messages.length > 0 ? (
            <>
              {messages.sent_messages.map((message) => renderMessage(message, 'sent'))}
              {messages.received_messages.map((message) => renderMessage(message, 'received'))}
            </>
          ) : (
            <Typography>No messages found for this conversation.</Typography>
          )}
        </List>
        <Box mt={4}>
          <Typography variant="h6" component="div" gutterBottom>
            Reply to Message
          </Typography>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleReply}
            sx={{ mt: 2 }}
          >
            Reply
          </Button>
        </Box>
        {error && <Typography variant="body1" color="error">{error}</Typography>}
      </Box>
    </Container>
  );
}

export default ConversationMessages;

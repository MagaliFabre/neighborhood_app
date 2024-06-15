import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Grid, Avatar, CardHeader, CardActionArea, Container, Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import MobileFooter from '../components/layout/MobileFooter'; // Assurez-vous d'importer votre footer

const MessageList = ({ currentUserId }) => {
  const [messages, setMessages] = useState({ sent_messages: [], received_messages: [] });
  const [error, setError] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOSTNAME}/messages`);
        setMessages(response.data);

        // Vérifie s'il y a des messages non lus
        const hasUnread = response.data.received_messages.some((msg) => !msg.read);
        setUnreadMessages(hasUnread);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 3000);
    return () => clearInterval(intervalId); 
  }, []);

  const groupedMessages = Object.values(
    messages.sent_messages.concat(messages.received_messages).reduce((acc, msg) => {
      acc[msg.help_request.id] = acc[msg.help_request.id] || { ...msg.help_request, messages: [] };
      acc[msg.help_request.id].messages.push(msg);
      return acc;
    }, {})
  ).map((group) => ({
    ...group,
    messages: group.messages.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at)),
  }));

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (groupedMessages.length === 0) {
    return <div>No messages found.</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Grid container spacing={3}>
          {groupedMessages.map((group) => {
            const lastMessage = group.messages[group.messages.length - 1];
            const isCurrentUserSender = lastMessage.sender_id === currentUserId;
            const otherUser = isCurrentUserSender ? lastMessage.receiver : lastMessage.sender;
            const otherUserName = otherUser ? otherUser.name : 'Unknown User';

            return (
              <Grid item xs={12} key={group.id}>
                <Card variant="outlined" sx={{ width: '100%', mb: 2 }}>
                  <CardActionArea component={Link} to={`/conversation/${group.id}`}>
                    <CardHeader
                      avatar={<Avatar sx={{ bgcolor: blue[800] }}>{otherUserName.charAt(0)}</Avatar>}
                      title={group.title}
                      subheader={`Conversation with ${otherUserName}`}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <MobileFooter unreadMessages={unreadMessages} /> {/* Passez le prop ici */}
    </Container>
  );
};

export default MessageList;

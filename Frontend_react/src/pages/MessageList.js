import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Avatar, CardHeader, CardActionArea, Container, Box } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const MessageList = ({ currentUserId }) => {
  const [messages, setMessages] = useState({ sent_messages: [], received_messages: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/messages');
        setMessages(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMessages();
  }, []);

  const groupedMessages = Object.values(messages.sent_messages.concat(messages.received_messages).reduce((acc, msg) => {
    acc[msg.help_request.id] = acc[msg.help_request.id] || { ...msg.help_request, messages: [] };
    acc[msg.help_request.id].messages.push(msg);
    return acc;
  }, {})).map(group => ({
    ...group,
    messages: group.messages.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at)) // Sort messages by sent_at date in descending order
  }));

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (groupedMessages.length === 0) {
    return <div>No messages found.</div>;
  }

  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={3}>
          {groupedMessages.map((group) => {
            const lastMessage = group.messages[group.messages.length - 1]; // Get the last message in the group
            const isCurrentUserSender = lastMessage.sender_id === currentUserId;
            const otherUser = isCurrentUserSender ? lastMessage.receiver : lastMessage.sender;
            const otherUserName = otherUser ? otherUser.name : 'Unknown User';

            return (
              <Grid item xs={12} key={group.id}>
                <Card variant="outlined" sx={{ width: '100%', mb: 2 }}>
                  <CardActionArea component={Link} to={`/conversation/${group.id}`}>
                    <CardHeader
                      avatar={<Avatar sx={{ bgcolor: deepOrange[500] }}>{group.title.charAt(0)}</Avatar>}
                      title={group.title}
                      subheader={`Conversation with ${otherUserName}`}
                    />
                    <CardContent>
                      <Typography variant="body1" color="textSecondary" noWrap>
                        {lastMessage.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default MessageList;

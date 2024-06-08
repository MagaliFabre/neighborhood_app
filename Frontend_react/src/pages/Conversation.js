import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Conversation = ({ match }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const conversationId = match.params.id;
    axios.get(`/conversations/${conversationId}/messages`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, [match.params.id]);

  return (
    <div>
      <h1>Conversation</h1>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <p>{message.content}</p>
            <p>{message.sender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversation;

// MessageFlow.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageFlow = ({ match }) => {
  const { messageFlowId } = match.params;
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/message_flows/${messageFlowId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
      }
    };

    fetchMessages();
  }, [messageFlowId]);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageFlow;

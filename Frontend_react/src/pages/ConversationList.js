import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/conversations', { withCredentials: true })
      .then(response => {
        setConversations(response.data);
      })
      .catch(error => {
        console.error('Error fetching conversations:', error);
      });
  }, []);

  return (
    <div>
      <h1>Conversation List</h1>
      <ul>
        {conversations.map(conversation => (
          <li key={conversation.id}>
            <Link to={`/conversations/${conversation.id}`}>{conversation.subject}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;

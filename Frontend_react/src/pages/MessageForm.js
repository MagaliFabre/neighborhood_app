import React, { useState } from 'react';

const MessageForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Enter your message" 
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;

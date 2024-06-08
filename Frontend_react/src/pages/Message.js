import React from 'react';

const Message = ({ content, sender, time }) => {
  return (
    <li>
      <p>{content}</p>
      <p>{sender} - {time}</p>
    </li>
  );
};

export default Message;

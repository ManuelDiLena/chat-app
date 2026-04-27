import React from 'react';
import './Message.css';
import Message from './Message';

const Messages = ({ messages }) => {
  return (
    <div className='messages'>
      {messages.map((message, i) => <Message key={i} message={message} />)}
    </div>
  );
}

export default Messages;
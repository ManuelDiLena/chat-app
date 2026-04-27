import React from 'react';
import './Message.css';
import Message from './Message';

const Messages = ({ messages }) => {
  return (
    <div className='messages'>
      {messages.map((message, i) => <div><Message key={i} message={message} /></div>)}
    </div>
  );
}

export default Messages;
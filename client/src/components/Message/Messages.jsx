import React from 'react';
import './Message.css';
import Message from './Message';

const Messages = ({ messages, name }) => {
  return (
    <div className='messages'>
      {messages.map((message, i) => <div><Message key={i} message={message} name={name} /></div>)}
    </div>
  );
}

export default Messages;
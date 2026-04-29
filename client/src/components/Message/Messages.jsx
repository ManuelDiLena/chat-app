import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Message.css';
import Message from './Message';

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className='messages'>
      {messages.map((message, i) => <div><Message key={i} message={message} name={name} /></div>)}
    </ScrollToBottom>
  );
}

export default Messages;
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import Message from '../Message/Message';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('enter', (welcomeMessage) => {
      console.log(welcomeMessage);
    });
    socket.on('message', (message) => {
      console.log(message);
    });
    socket.on('receiveMessage', (message) => {
      console.log('receiveMessage', message);
      setMessages(prevMessages => [...prevMessages, message]);
    });
    return () => {
      socket.off('receiveMessage');
      socket.off('message');
      socket.off('enter');
    };
  }, []);

  const handleChange = ({ target: { value } }) => setMessage(value);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', message, () => {
      console.log('Message sucessfully sent!');
    });
    setMessage('');
  };

  return (
    <div className='container'>
      <div className='rectangle'>
        <div className='messages'>
          <h1>Messages</h1>
          {messages.map((message, i) => <Message key={i} message={message} />)}
        </div>
        <form className='form'>
          <input id='commonSearchTerm' type='text' placeholder='Message' value={message} onChange={handleChange} />
          <button id='searchButton' type='submit' onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
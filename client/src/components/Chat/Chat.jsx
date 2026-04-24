import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import './Chat.css';
import Message from '../Message/Message';

let socket;

const Chat = () => {
  const location = useLocation();
  const ENDPOINT = 'localhost:5000';
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const params = queryString.parse(location.search);
    socket = io(ENDPOINT);
    socket.emit('join', params);
    console.log('[REACH INITIALIZATION USE EFFECT]')
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    console.log('[REACH EVENTS USE EFFECT]')
    return () => socket.off('message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', message, () => {
      console.log('Message sucessfully sent!');
    });
    setMessage('');
  };

  return (
    <div className='container'>
      <div className='paper'>
        <div className='messages'>
          <h1>Messages</h1>
          {messages.map((message, i) => <Message key={i} message={message} />)}
        </div>
        <form className='form'>
          <input className='input' type='text' placeholder='Message' value={message} onChange={({ target: { value } }) => setMessage(value)} />
          <button className='btn' type='submit' onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
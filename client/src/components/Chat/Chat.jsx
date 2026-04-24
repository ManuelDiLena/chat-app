import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import './Chat.css';
import Message from '../Message/Message';

let socket;

const Chat = () => {
  const location = useLocation();
  const ENDPOINT = 'http://localhost:5000';
  
  const [message, setMessage] = useState({ text: '', delivered: false, read: false });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const params = queryString.parse(location.search);
    socket = io(ENDPOINT);
    socket.emit('join', params, (error) => {
      if (error) alert(error);
    });
    return () => {
      socket.disconnect();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    return () => {
      socket.emit('close');
      socket.off();
    }
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', message, () => {
      setMessage({ ...message, text: message.text, delivered: true });
    });
    setMessage({ text: '', delivered: false, read: false });
  };

  return (
    <div className='container'>
      <div className='paper'>
        <div className='messages'>
          <h1>Messages</h1>
          {messages.map(({text}, i) => <Message key={i} message={text} />)}
        </div>
        <form className='form'>
          <input className='input' type='text' placeholder='Message' value={message.text} onChange={({ target: { value } }) => setMessage(prev => ({ ...prev, text: value }))} />
          <button className='btn' type='submit' onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Message/Messages';

// let socket;

const Chat = () => {
  const location = useLocation();
  const ENDPOINT = 'http://localhost:5000';
  const socketRef = useRef(null);
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const params = queryString.parse(location.search);
    socketRef.current = io(ENDPOINT);
    socketRef.current.emit('join', params, (error) => {
      if (error) alert(error);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [location.search]);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    socketRef.current.on('roomData', ({ room, users }) => {
      console.log(room, users);
    })
    return () => {
      socketRef.current.off();
    }
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socketRef.current) return;
    socketRef.current.emit('sendMessage', message, () => {
      setMessage('');
    });
  };

  return (
    <div className='outerContainer'>
      <div className="container">
        <InfoBar />
        <Messages messages={messages} />
        <Input sendMessage={sendMessage} setMessage={setMessage} message={message}/>
      </div>
    </div>
  );
}

export default Chat;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Message/Messages';

let socket;

const Chat = () => {
  const location = useLocation();
  const ENDPOINT = 'http://localhost:5000';
  
  const [message, setMessage] = useState('');
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
    socket.on('roomData', ({ room, users }) => {
      console.log(room, users);
    })
    return () => {
      socket.emit('close');
      socket.off();
    }
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', message, () => {
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
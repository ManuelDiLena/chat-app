import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Message/Messages';
import TextContainer from '../TextContainer/TextContainer';

// let socket;
const ENDPOINT = 'http://localhost:5000';

const Chat = () => {
  const location = useLocation();
  const socketRef = useRef(null);
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');

  const { room, name } = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      room: params.room || '',
      name: params.name || '',
    };
  }, [location.search]);

  useEffect(() => {
    socketRef.current = io(ENDPOINT);
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current || !room || !name) return;
    socketRef.current.emit('join', { name, room }, (error) => {
      if (error) alert(error);
    });
  }, [room, name]);

  useEffect(() => {
    if (!socketRef.current) return;
    const handleMessage = (incomingMessage) => {
      setMessages(prev => [...prev, incomingMessage]);
    };
    const handleRoomData = ({ users }) => {
      setUsers(users);
    };
    socketRef.current.on('message', handleMessage);
    socketRef.current.on('roomData', handleRoomData);
    return () => {
      socketRef.current.off('message', handleMessage);
      socketRef.current.off('roomData', handleRoomData);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socketRef.current || !message.trim()) return;
    socketRef.current.emit('sendMessage', message, () => {
      setMessage('');
    });
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
}

export default Chat;
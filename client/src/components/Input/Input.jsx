import React from 'react';
import './Input.css';

const Input = ({ sendMessage, setMessage, message }) => {
  return (
    <form>
      <input
        type='text'
        placeholder='Type a message...'
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
      />
    </form>
  );
}

export default Input;
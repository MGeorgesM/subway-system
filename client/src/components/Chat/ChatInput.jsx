import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const ChatInput = ({ senderId }) => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      await axios.post('/send-message', {
        sender_id: senderId,
        receiver_id: 2,
        message: message
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">Send</button>
    </div>
  );
};

export default ChatInput;

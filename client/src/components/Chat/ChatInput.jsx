import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const ChatInput = ({ senderId, onSendMessage }) => {
  const [selectedOption, setSelectedOption] = useState('1');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const sendMessage = async () => {
    try {
      const receiverIdToSend = parseInt(selectedOption);

      if (!isNaN(receiverIdToSend) && receiverIdToSend >= 1 && receiverIdToSend <= 5) {
        console.log("Receiver ID to Send:", receiverIdToSend);
        console.log("Sending message:", message);

        await onSendMessage(message, receiverIdToSend);

        setMessage('');
        setSelectedOption('1');
      } else {
        console.error('Invalid selected option:', selectedOption);
      }
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
      <select value={selectedOption} onChange={handleChange} className="select-rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button onClick={sendMessage} className="send-button">Send</button>
    </div>
  );
};

export default ChatInput;

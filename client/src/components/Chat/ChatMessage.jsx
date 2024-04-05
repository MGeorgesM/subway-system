import React from 'react';
import './index.css';

const ChatMessage = ({ message, isSender }) => {
  const messageStyle = isSender ? 'chat-message-sender' : 'chat-message-receiver';

  return (
    <div className={`chat-message-container ${isSender ? 'chat-message-sender-container' : 'chat-message-receiver-container'}`}>
      <div className={messageStyle}>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;

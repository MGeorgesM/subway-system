import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';

const ChatList = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/messages/${senderId}/${receiverId}`);
            if (response.status !== 200) {
                throw new Error(`Failed to fetch messages. Status: ${response.status}`);
            }
            const data = response.data;
            if (data && data.messages) {
                setMessages(data.messages);
            } else {
                console.error('No messages found in response data');
            }
        } catch (error) {
            console.error('Error fetching messages:', error.message);
        }
    };

    useEffect(() => {
        fetchMessages();

        // Refresh messages every 5 seconds
        const interval = setInterval(fetchMessages, 5000);

        return () => clearInterval(interval);
    }, [senderId, receiverId]);

    return (
        <div className="chat-list">
            {messages.map((message) => (
                <ChatMessage
                    key={message.id}
                    message={message.message}
                    isSender={message.sender_id === senderId}
                />
            ))}
        </div>
    );
};

export default ChatList;

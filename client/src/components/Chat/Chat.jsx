import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import './index.css';
import axios from 'axios';

const Chat = () => {
    const [senderId, setSenderId] = useState(null);
    const [receiverId, setReceiverId] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/users/get');
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch user data. Status: ${response.status}`);
                }
                const data = response.data;
                if (data && data.user && data.user.id) {
                    setSenderId(data.user.id);
                    console.log(data.user.id);
                    
                    let defaultReceiverId = senderId !== 4 ? 4 : senderId;
                    setReceiverId(defaultReceiverId);
                } else {
                    console.error('User ID not found in response data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        getUserInfo();
    }, []);

    const handleSendMessage = async (message, selectedOption) => {
        try {
          const receiverIdToSend = parseInt(selectedOption);
      
          if (!isNaN(receiverIdToSend) && receiverIdToSend >= 1 && receiverIdToSend <= 5) {
            console.log("Receiver ID to Send:", receiverIdToSend);
            console.log("Sending message:", message);
      
            await axios.post('/send-message', {
              sender_id: senderId,
              receiver_id: receiverIdToSend,
              message: message,
              rating: selectedOption
            });
      
            console.log("Message sent!");
      
          } else {
            console.error('Invalid selected option:', selectedOption);
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
      
    return (
        <div className="chat">
            <div className="chat-list-container">
                <ChatList senderId={senderId} receiverId={receiverId} />
            </div>
            <div className="chat-input-container">
                <ChatInput senderId={senderId} onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default Chat;

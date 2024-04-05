import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import './index.css';

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

    const handleSendMessage = async (message) => {
        try {
            let receiverIdToSend = senderId !== 4 ? 4 : senderId;
            
            console.log("Receiver ID to Send:", receiverIdToSend);

            setReceiverId(receiverIdToSend);

            console.log("Sending message:", message);

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

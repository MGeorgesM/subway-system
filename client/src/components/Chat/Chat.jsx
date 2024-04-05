import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import { sendRequest } from '../../core/tools/apiRequest'; // Adjust path as needed
import { requestMethods } from '../../core/tools/apiRequestMethods'; // Adjust path as needed
import './index.css';

const Chat = () => {
    const [senderId, setSenderId] = useState(null);
    const [receiverId, setReceiverId] = useState(2);

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
                } else {
                    console.error('User ID not found in response data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        getUserInfo();
    }, []);

    return (
        <div className="chat">
            <div className="chat-list-container">
                <ChatList senderId={senderId} receiverId={receiverId} />
            </div>
            <div className="chat-input-container">
                <ChatInput senderId={senderId} />
            </div>
        </div>
    );
};

export default Chat;

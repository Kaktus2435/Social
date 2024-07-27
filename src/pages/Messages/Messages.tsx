import React, { useEffect, useState } from 'react';
import './Messages.css';
import { SendOutlined } from '@ant-design/icons';

type PropsType = {
  isOpen: boolean,
  onClose: () => void
};

export type ChatMessagesType = {
  message: string,
  photo: string,
  userId: number,
  userName: string
};

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export const ChatPage: React.FC<PropsType> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessagesType[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };

    wsChannel.addEventListener('message', handleMessage);

    return () => {
      wsChannel.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      wsChannel.send(inputValue);
      setInputValue('');
    }
  };

  if (!isOpen) {
    return null
  } else if (isOpen) {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="chatBody">
          <Messages messages={messages} />
        </div>
        <div className='addMessages'>
          <div className='addMessages-textarea' style={{ width: '100%' }}>
            <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </div>
          <div className='button'>
            <button className='button-send' onClick={handleSendMessage}>
              <SendOutlined />
            </button>
          </div>
        </div>
      </div>
    );
  };
}
const Messages: React.FC<{ messages: Array<ChatMessagesType> }> = ({ messages }) => {
  return (
    <div>
      {messages.map((m: ChatMessagesType, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessagesType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} alt="" />
      <i>{message.userName}</i>
      <br />
      <b>{message.message}</b>
      <hr />
    </div>
  );
};


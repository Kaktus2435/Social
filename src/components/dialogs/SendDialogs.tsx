// SendDialogs.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/redux.store.ts';
import { sendMessage } from '../redux/dialogsPageReducer.ts';

interface SendMessageProps {
  userId: number;
}

const SendMessage: React.FC<SendMessageProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage(userId, message));
      setMessage('');

    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Scrie un mesaj..."
      />
      <button onClick={handleSendMessage}>Trimite</button>
    </div>
  );
};

export default SendMessage;

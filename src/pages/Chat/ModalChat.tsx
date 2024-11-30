import React, { useEffect, useState } from 'react';
import styles from './Chat.module.css';
import ChatPage from './ChatPage.tsx';
import { useLocation } from 'react-router-dom';

export const OpenModal = () => {
  const [popUpChat, setPopUpChat] = useState(false);
  const location = useLocation();

  const switchPopUpChat = () => {
    setPopUpChat(prev => !prev);
  };

  useEffect(() => {
    if (location.pathname === '/chat') {
      setPopUpChat(false);
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== '/chat' && (
        <div>
          <button className={styles.button__chat} onClick={switchPopUpChat}>Open Chat</button>
          {popUpChat && <ModalChat />}
        </div>
      )}
    </>
  );
};

export const ModalChat = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <ChatPage />
      </div>
    </div>
  );
};

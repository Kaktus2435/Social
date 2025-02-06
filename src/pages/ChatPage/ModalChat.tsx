import React, { useEffect, useState } from 'react';
import styles from './Chat.module.css';
import Chat from './ChatPage.tsx';
import { useLocation } from 'react-router-dom';
import CustomButton from '../../components/buttons/CustomButton.tsx';

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
        <>
          <CustomButton text='Chat' onClick={switchPopUpChat} />
          {popUpChat && <ModalChat />}
        </>
      )}
    </>
  );
};

export const ModalChat: React.FC = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <Chat />
      </div>
    </div>
  );
};

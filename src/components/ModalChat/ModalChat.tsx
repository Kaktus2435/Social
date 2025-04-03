import React, { useEffect, useState } from 'react';
import styles from './ModalChat.module.css';
import Chat from '../../pages/ChatPage/ChatPage.tsx';
import { useLocation } from 'react-router-dom';
import { WechatOutlined } from '@ant-design/icons';
import CustomButton from '../common/buttons/CustomButton.tsx';

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
        <WechatOutlined className={styles.chatIcon__mobile} onClick={switchPopUpChat} />
        <div>
          <div className={styles.chatButton} >
            <CustomButton text='Chat' onClick={switchPopUpChat} />
          </div>
          {popUpChat && <ModalChat />}
        </div>
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

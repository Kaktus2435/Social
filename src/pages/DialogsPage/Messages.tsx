import React, { useEffect } from 'react';
import { Message } from './Message.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getMessagesListSelector, getPageSize } from '../../components/redux/dialogs-selectors.ts';
import { AppDispatch } from '../../components/redux/redux.store.ts';
import { fetchMessagesList } from '../../components/redux/dialogsPageReducer.ts';
import { message } from 'antd';

interface MessagesProps {
  userId: number;
  messagesLists: any;
}

export const Messages: React.FC<MessagesProps> = ({ userId, pageSize ,currentPage, key }) => {
  
  const messagesLists = useSelector(getMessagesListSelector)
  const dispatch = useDispatch<AppDispatch>();
  
/*   
  useEffect(() => {
      dispatch(fetchMessagesList( 31815  , pageSize, currentPage));
    }, [])
   */

  return (
    <>

    {messagesLists.map((message) => (
      <Message key={key} message={message} />))}
    </>
  )}

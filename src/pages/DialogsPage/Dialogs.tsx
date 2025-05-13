import React, { useEffect, useState } from 'react';
import SendMessage from './SendDialogs.tsx';
import { Messages } from './Messages.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDialogsSelector, getError, getIsLoading, getMessagesList, getMessagesListSelector } from '../../components/redux/dialogs-selectors.ts';
import { fetchDialogs, fetchMessagesList } from '../../components/redux/dialogsPageReducer.ts';
//@ts-ignore
import initialPhoto from '../../img/Basic_Ui_(186).jpg'
import style from './Dialogs.module.css'
import { AppDispatch } from '../../components/redux/redux.store.ts';
import { getCurrentPage, getPageSize, getUsers, getUsersFilter } from '../../components/redux/users-selectors.ts';
import { requestUsers } from '../../components/redux/usersPageReducer.ts';

const Dialogs = (props) => {

  const dispatch = useDispatch<AppDispatch>();


  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  const [selectedCurrentPage, setSelectedCurrentPage] = useState<number | null>(null);
  const [selectedPageSize, setSelectedPageSize] = useState<number | null>(null);



  const users = useSelector(getUsers)
  const dialogs = useSelector(getAllDialogsSelector);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);


  
  useEffect(() => {
      dispatch(fetchMessagesList(31815, 1, 5));
    }, [])
  

  useEffect(() => {
    // Fetch dialogs
    dispatch(fetchDialogs());
    // Verifică dacă utilizatorii sunt încărcați, altfel preia-i
    if (users.length === 0) {
      dispatch(requestUsers(currentPage, pageSize, filter));
    }
  }, [dispatch, users.length]);
  if (isLoading) return <p>Se încarcă...</p>;
  if (error) return <p>{error}</p>;

  const handleFriendClick = (id: number) => {
    setSelectedFriendId(id);
  };

  const handleMessageClick = (id: number) => {
    setSelectedFriendId(id);
    setSelectedCurrentPage(1);
    setSelectedPageSize(10);
  }


  return (
    <div className={style.dialog_wrapper}>
      <div>
        <h2>Lista Dialogurilor</h2>
        <ul>

          {dialogs.map((dialog) => (
            <li key={dialog.id} onClick={() => handleFriendClick(dialog.id)}>
              <img className={style.dialog_photo} src={dialog.photos.small == null ? initialPhoto : dialog.photos.small} alt="photos" />
              {dialog.userName}
            </li>
          ))}
        </ul>
        <div className={style.dialogUsers}>
          <h2>Lista Userilor</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleFriendClick(user.id)}>
                <img
                  className={style.dialog_photo}
                  src={user.photos?.small == null ? initialPhoto : user.photos.small}
                  alt="photos"
                />
                {user.name}
              </li>
            ))}
          </ul>
          <div>
          </div>
        </div>
      </div>

      <div>
        
          <>
            <div>
              
                <Messages
                  userId={selectedFriendId}                  
                  pageSize={selectedPageSize}
                  currentPage={selectedCurrentPage}
                  key={selectedFriendId}
                />

            </div>
            <div>
              <SendMessage userId={selectedFriendId} />
            </div>
          </>
        
      </div>
    </div>
  );
};

export default Dialogs;


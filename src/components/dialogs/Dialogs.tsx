import React, { useEffect, useState } from 'react';
import SendMessage from './SendDialogs.tsx';
import Messages from './Messages.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDialogsSelector, getError, getIsLoading } from '../redux/dialogs-selectors.ts';
import { fetchDialogs } from '../redux/dialogsPageReducer.ts';
//@ts-ignore
import initialPhoto from '../img/Basic_Ui_(186).jpg'
import style from './Dialogs.module.css'
import { AppDispatch } from '../redux/redux.store.ts';
import { getCurrentPage, getPageSize, getUsers, getUsersFilter } from '../redux/users-selectors.ts';
import { requestUsers } from '../redux/usersPageReducer.ts';

const Dialogs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dialogs = useSelector(getAllDialogsSelector);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  const users = useSelector(getUsers)

  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);

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

        </div>
      </div>

      <div>
        {selectedFriendId ? (
          <>
            <div>
              <h1>Mesaje cu prietenul</h1>
              <Messages userId={selectedFriendId} />
            </div>
            <div>
              <SendMessage userId={selectedFriendId} />
            </div>
          </>
        ) : ''}
      </div>

    </div>
  );
};

export default Dialogs;
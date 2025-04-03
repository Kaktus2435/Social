import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/chatPage-reducer.ts";
import { AppDispatch, AppStateType } from "../../redux/redux.store.ts";
import styles from "./AddMessageForm.module.css";
import CustomButton from "../../common/buttons/CustomButton.tsx";

export const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chatPage.status);

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
        setMessage('');
    };
    return <>
        <div className={styles.container} >
            <textarea className={styles.textArea} onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            <CustomButton text="Send" onClick={sendMessageHandler} disabled={status !== 'ready'} ></CustomButton>
        </div>
    </>;

};

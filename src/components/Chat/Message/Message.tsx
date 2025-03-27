import React from "react";
import { ChatMessagesAPIType } from "../../../api/chatAPI";
import styles from "./Message.module.css";

export const Message: React.FC<{ message: ChatMessagesAPIType; authUserId }> = React.memo((props) => {
    const message = props.message

    const isMyMessage = message.userId === props.authUserId

    return <>
        <div className={`${styles.container} ${isMyMessage ? styles.myContainer : styles.otherContainer}`}>
            <img style={{ width: '50px', height: '50px' }} src={message.photo} />
            <div className={`${ isMyMessage? styles.myMessage : styles.otherMessage}  `} >
                <b className={styles.userName} >{message.userName}</b>
                <div className={styles.bubble}>{message.message}</div>
            </div>
        </div>

        <br />
        <hr style={{ width: "100%" }} />
    </>;
});

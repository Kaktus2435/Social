import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChatMessagesAPIType } from "../../../api/chatAPI.ts";
import { AppStateType } from "../../redux/redux.store.ts";
import { Message } from "../Message/Message.tsx";
import styles from "./Messages.module.css"

export const Messages: React.FC<{}> = ({ }) => {
    const messages = useSelector((state: AppStateType) => state.chatPage.messages);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const authUserId = useSelector((state: AppStateType) => state.auth.id )

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };

    useEffect(() => {
        if (isAutoScroll && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    return (
        <div className={styles.container} onScroll={scrollHandler}>
            {messages.map((m: ChatMessagesAPIType, index) => (
                <Message key={index} message={m} authUserId={authUserId}/>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

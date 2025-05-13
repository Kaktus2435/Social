import React from "react";

interface MessageProps {
    message: {
        id: number;
        addedAt: string;
        body: string;
        recipientId: number;
        senderId: number;
        senderName: string;
    }
}

export const Message: React.FC<MessageProps> = ({message}) => {
    return (
        <li key={message.id} >
            <div>{message.addedAt}</div>
            <div>ID: {message.id}</div>
            <div>BODY: {message.body}</div>
            <div>{message.recipientId}</div>
            <div>{message.senderId}</div>
            <div>{message.senderName}</div>
        </li>
    );
}
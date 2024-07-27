import { Flex, message } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');


export const ChatPage: React.FC = () => {
    return <>
        <Chat />
    </>
}

const Chat: React.FC = () => {

    return <>
        <Messages />
        <AddMessageForm />
    </>
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessagesType[]>([])

    useEffect(() => {
        // Chat componenta poate sa se randeze de mai multe ori noi trebuie sa urmarim schimbarile 
        // cu toate ca avem aici mesajele pentru a le randa noi trebu sa le avem in state
        
        /* wsChannel.addEventListener('message', (e) => {
            setMessages([...messages, ...JSON.parse(e.data)])
        })
            aici mereu o sa randam masivul gol de cate ori va veni mesajul si la sfarsitul lui se va adauga mesajul nou! 
            pentru a evita asta scrim in felul urmator
 */

            wsChannel.addEventListener('message', (e) => {
                let newMessages = JSON.parse(e.data)
                setMessages((prevMessages) => [...prevMessages, ...newMessages])
                // aici nu am trimis datele concrete dar am explicat logica schimbarii state
            })

    })

    return <div style={{ height: '500px', overflow: "auto" }} >
        {messages.map((m: any, index) => <Message key={index} message={m} />)}

    </div>
}

const Message: React.FC<{ message: ChatMessagesType }> = ({ message }) => {
    return <>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
            <img style={{width: '50px', height: '50px' }} src={message.photo} /> <b>{message.userName}</b>
        </div>
        <br />
        {message.message}
        <hr />
    </>
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }
    return <>
        <div>
            <textarea onChange={(e)=> setMessage(e.currentTarget.value)} value={message} ></textarea>
        </div>
        <button onClick={sendMessage}>Send</button>
    </>

}


export type ChatMessagesType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
};

type PropsType = {
    isOpen: boolean,
    onClose: () => void
};
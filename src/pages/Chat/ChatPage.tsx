import React, { useEffect, useState } from "react";
import { withRouter } from "../../components/utils/withRouter/withRouter.tsx";


const ChatPage: React.FC = () => {
    return <>
        <Chat />
    </>
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('CLOSE WS')
            setTimeout(createChannel, 3000)
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel()
        return() => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])
    
    return <>
        <Messages wsChannel={wsChannel} />
        <AddMessageForm wsChannel={wsChannel} />
    </>
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessagesType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
            
        }
        wsChannel?.addEventListener('message', messageHandler) 
        
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
}, [wsChannel])


    return <div style={{ height: '500px', overflow: "auto" }} >
        {messages.map((m: any, index) => <Message key={index} message={m} />)}

    </div>
}

const Message: React.FC<{ message: ChatMessagesType }> = ({ message }) => {
    return <>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
            <img style={{ width: '50px', height: '50px' }} src={message.photo} /> <b>{message.userName}</b>
        </div>
        <br />
        {message.message}
        <hr />
    </>
}

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    useEffect(() => {
        wsChannel?.addEventListener('open', () => {
            setReadyStatus('ready')
        })
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }
    return <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} ></textarea>
        </div>
        <button disabled={wsChannel ===null || readyStatus !== "ready"} onClick={sendMessage}>Send</button>
    </>

}

export default withRouter(ChatPage);

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
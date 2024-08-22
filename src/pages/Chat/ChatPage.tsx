import React, { useEffect, useState } from "react";
import { withRouter } from "../../components/utils/withRouter/withRouter.tsx";
import { ChatMessagesType } from "../../api/chatAPI.ts";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../components/redux/chatPage-reducer.ts";
import { AppDispatch, AppStateType } from "../../components/redux/redux.store.ts";



const ChatPage: React.FC = () => {
    return <>
        <Chat />
    </>
}

const Chat: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()

    
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <>
        <Messages />
        <AddMessageForm  />
    </>
}

const Messages: React.FC<{}> = ({}) => {
const messages = useSelector((state: AppStateType) => state.chatPage.messages)
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

const AddMessageForm: React.FC<{  }> = () => {
    const [message, setMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} ></textarea>
        </div>
        <button disabled={false} onClick={sendMessageHandler}>Send</button>
    </>

}

export default withRouter(ChatPage);

type PropsType = {
    isOpen: boolean,
    onClose: () => void
};
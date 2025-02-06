import React, { ComponentType, useEffect, useRef, useState } from "react";
import { withRouter } from "../../components/utils/withRouter/withRouter.tsx";
import { ChatMessagesAPIType } from "../../api/chatAPI.ts";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../components/redux/chatPage-reducer.ts";
import { AppDispatch, AppStateType } from "../../components/redux/redux.store.ts";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";


const Chat = () => {

    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chatPage.status)


    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())

        }
    }, [])

    return <>
        {status === 'error' ? <div>Some error occurred. Please refresh the page.</div> :
            <>   
                <Messages />
                <AddMessageForm />
            </>
        }
    </>
}

const Messages: React.FC<{}> =  ({}) => {
    const messages = useSelector((state: AppStateType) => state.chatPage.messages)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent> ) => {
        const element = e.currentTarget
        if(Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight) <300 )
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    return (
        <div onScroll={scrollHandler} style={{ height: '500px', overflow: 'auto' }}>
            {messages.map((m: ChatMessagesAPIType, index) => (
                <Message key={index} message={m} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

const Message: React.FC<{ message: ChatMessagesAPIType }> = React.memo( ({ message }) => {
console.log('>>>>Message');

    return <>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
            <img style={{ width: '50px', height: '50px' }} src={message.photo} /> <b>{message.userName}</b>
        </div>
        <br />
        {message.message}
        <hr />
    </>
})

const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chatPage.status)

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
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
    </>

}

export default compose<ComponentType>(withAuthRedirect, withRouter)(Chat);

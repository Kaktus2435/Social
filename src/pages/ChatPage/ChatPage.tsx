import React, { ComponentType, useEffect } from "react";
import { withRouter } from "../../components/utils/withRouter/withRouter.tsx";
import { useDispatch, useSelector } from "react-redux";
import { startMessagesListening, stopMessagesListening } from "../../components/redux/chatPage-reducer.ts";
import { AppDispatch, AppStateType } from "../../components/redux/redux.store.ts";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { AddMessageForm } from "../../components/Chat/AddMessageForm/AddMessageForm.tsx";
import { Messages } from "../../components/Chat/Messages/Messages.tsx";
import styles from "./ChatPage.module.css"


const ChatPage = () => {

    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chatPage.status)


    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())

        }
    }, [])

    return <div className={styles.container}>
        {status === 'error' ? <div>Some error occurred. Please refresh the page.</div> :
            <>   
                <Messages />
                <AddMessageForm />
            </>
        }
    </div>
}

export default compose<ComponentType>(withAuthRedirect, withRouter)(ChatPage);

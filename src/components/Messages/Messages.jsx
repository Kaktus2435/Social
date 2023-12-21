import React from "react";
import FriendsList from "../FriendsList/FriendsList/FriendsList";
import SearchFriends from "../FriendsList/searchFrends/SearchFriends";
import ChatComponent from "../Chat/ChatComponent";
import SentBar from "../Chat/SentBar/SentBar";
import style from "./Messages.module.css"


const Messages = (props) => {
    
    const contactsElements = props.contacts.map(c =>
        <FriendsList name={c.name} firstName={c.firstName} photos={c.photos} />);
    const myMessagesElements = props.messages.map((m, index) =>
        <ChatComponent isMy={m.isMy} message={m.message} key={index} />);

    return (
        <div className={style.container}>
            <div className={style.contacts}>
                <div className={style.contacts__wrapper}>
                    <div className={style.contacts__title}>
                        Messages
                    </div>
                    <SearchFriends />

                    {/* line switches */}
                    <div className={style.switches}>
                        <button className={style.switches__button}>
                            Primary
                        </button>

                        <button className={style.switches__button}>
                            General
                        </button>

                        <button className={style.switches__requests}>
                            Requests
                        </button>
                        <div className={style.line}></div>
                    </div>

                    {contactsElements}
                </div>
            </div>


            {/* chat */}
            <div className={style.chat}>
                <div className={style.chat__wraper}>
                    <div className={style.chat__interlockBar}>
                        <div className={style.chat__interlok}>

                        </div>
                        <div className={style.chat__interactionButtons}>

                        </div>
                    </div>
                    <div className={style.chat__messages}>
                        {myMessagesElements}
                    </div>
                    <div className={style.chat__addMessage}>
                        <SentBar
                            myNewMessage={props.myNewMessage} 
                            addMessage={props.addMessage}
                            updateNewMessageText={props.updateNewMessageText}
                            state={props.state}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
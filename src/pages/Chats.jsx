import FriendsList from "../components/FriendsList/FriendsList/FriendsList"
import SearchFriends from "../components/FriendsList/searchFrends/SearchFriends";

import style from "../styles/main.module.css";
import ChatComponent from "../components/Chat/ChatComponent";
import SentBar from "../components/Chat/SentBar/SentBar";

const Chats = (props) => {

    const { dispatch, chatsPage } = props.store;
    const { messages, contacts, myNewMessage } = chatsPage;

    const contactsElements = contacts.map(c =>
        <FriendsList name={c.name} firstName={c.firstName} photos={c.photos} />);
    const myMessagesElements = messages.map((m, index) =>
        <ChatComponent isMy={style.isMy} message={style.message} key={index} />);

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
                            myNewMessage={myNewMessage} 
                            dispatch={dispatch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chats;

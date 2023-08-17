import FriendsList from "../components/friendsList/FriendsList/FriendsList"
import SearchFriends from "../components/friendsList/searchFrends/SearchFriends";
import Chat from "../components/chat/Chat";
import SentBar from "../components/chat/SentBar/input"

import m from "../styles/main.module.css";


const Chats = (props) => {

    const contactsElements = props.chatsPage.contacts
        .map(c => <FriendsList name={c.name} firstName={c.firstName} photos={c.photos} />);

    const myMessagesElements = props.chatsPage.messages
        .map((m, index) => <Chat isMy={m.isMy} message={m.message} key={index} />);

    return (
        <div className={m.container}>
            <div className={m.contacts}>
                <div className={m.contacts__wrapper}>
                    <div className={m.contacts__title}>
                        Messages
                    </div>
                    <SearchFriends />


                    {/* line switches */}
                    <div className={m.switches}>
                        <button className={m.switches__button}>
                            Primary
                        </button>

                        <button className={m.switches__button}>
                            General
                        </button>

                        <button className={m.switches__requests}>
                            Requests
                        </button>
                        <div className={m.line}></div>
                    </div>

                    {contactsElements}
                </div>
            </div>


            {/* chat */}
            <div className={m.chat}>
                <div className={m.chat__wraper}>
                    <div className={m.chat__interlockBar}>
                        <div className={m.chat__interlok}>

                        </div>
                        <div className={m.chat__interactionButtons}>

                        </div>
                    </div>
                    <div className={m.chat__messages}>
                        {myMessagesElements}
                    </div>
                    <div className={m.chat__addMessage}>
                        <SentBar
                            myNewMessage={props.chatsPage.myNewMessage} /* (nu se duce prin disptchi mai departe si am chemat-o aici) */
                            dispatch={props.dispatch}
                            />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chats;

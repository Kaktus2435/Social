import c from "./Chat.module.css";

const Chat = (props) => {

    return (
        <div className={c.chat}>
            <div className={props.isMy ? c.chat__myMessages : c.chat__interlocutorMessages}>
                {props.message}
            </div>
        </div>
    );
}

export default Chat;
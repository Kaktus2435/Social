import c from "./Chat.module.css";

const ChatComponent = (props) => {

    return (
        <div className={c.chat}>
            <div className={props.isMy ? c.chat__myMessages : c.chat__interlocutorMessages}>
                {props.message}
            </div>
        </div>
    );
}

export default ChatComponent;
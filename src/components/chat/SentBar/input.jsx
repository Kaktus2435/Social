import React from "react";
import c from "./input.module.css";
import imgEmoji from "../../img/fluent_emoji-laugh-24-regular.svg";
import imgAttachment from "../../img/mingcute_attachment-line.svg";
import imgAdd from "../../img/Sent.svg";
import imgMicro from "../../img/microphone.svg";
import { updateNewMessageTextActionCreator,addMessageActionCreator } from "../../redux/chatPageReducer";


const SentBar = (props) => {
    

    const newMessage = () => {
        props.dispatch(addMessageActionCreator());
    }
    const onMessageChange = (e) => {
        const text = e.target.value;
        props.dispatch(updateNewMessageTextActionCreator(text));
    }
  console.log(props.myNewMessage)

    return (
        <div className={c.sentBar}>
            <div className={c.container}>
                <button className={c.sentBar__button} >
                    <img src={imgEmoji} alt="emoji" />
                </button >
                <button className={c.sentBar__button} >
                    <img src={imgAttachment} alt="attachament" />
                </button>
                <div className={c.sentBar__input}>
                    <input 
                        onChange={onMessageChange} 
                        value={props.myNewMessage} className={c.sentBar__addMessage} />
                    <button className={c.sentBar__buttonMicro}>
                        <img className={c.sentbar__img} src={imgMicro} alt="microphone" />
                    </button>
                </div>
                <button className={c.sentBar__button} onClick={newMessage} >
                    <img src={imgAdd} alt="attachament" />
                </button>
            </div>
        </div>
    );
}

export default SentBar;
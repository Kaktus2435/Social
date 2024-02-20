import React from 'react'
import { getContacts, updateNewMessageText, addMessage } from "../redux/messagesPageReducer";
import Messages from './Messages'
import { connect } from 'react-redux';

function MessagesContainer(props) {
  return <>
    <Messages
      messagesPage={props.messagesPage}
      contacts={props.contacts}
      messages={props.messages}
      myNewMessage={props.myNewMessage}
      addMessage={props.addMessage}
      updateNewMessageText={props.updateNewMessageText}
    />
  </>
}

let mapStateToProps = (state) => {
  return {
    contacts: state.messagesPage.contacts,
    messages: state.messagesPage.messages,
    myNewMessage: state.messagesPage.myNewMessage,

  }
}

export default connect(mapStateToProps, { getContacts, updateNewMessageText, addMessage, })(MessagesContainer);
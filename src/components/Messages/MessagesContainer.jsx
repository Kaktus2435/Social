import React, { Component } from 'react'
import { getContacts, updateNewMessageText, addMessage} from "../redux/messagesPageReducer";
import Messages from './Messages'
import { connect } from 'react-redux'; 


export class MessagesContainer extends Component {
  
  componentDidMount() {
    
 }
    render() {
    return <>
        <Messages 
        messagesPage={this.props.messagesPage}
        contacts={this.props.contacts}
        messages={this.props.messages}
        myNewMessage={this.props.myNewMessage}
        addMessage={this.props.addMessage}
        updateNewMessageText={this.props.updateNewMessageText}
        />
      </>
  }
}
let mapStateToProps = (state) => {
  return {
    contacts: state.messagesPage.contacts,
    messages: state.messagesPage.messages,
    myNewMessage: state.messagesPage.myNewMessage,
   
  }
}

export default connect(mapStateToProps, { getContacts, updateNewMessageText, addMessage, })(MessagesContainer);
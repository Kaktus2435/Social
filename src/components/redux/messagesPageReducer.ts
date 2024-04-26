
export type ContactsType = {
    name: string,
    firstNAme: string,
    id: number
}

export type MessagesType ={
    isMy: boolean,
    message: string
}

const initialState = {
    contacts: [
        {
            // photos: photo,
            name: "Ion",
            firstName: "Valcea",
            id: 1
        },
        {
            // photos: photo,
            name: "Vasile",
            id: 2
        },
        {
            // photos: photo,
            name: "Vasile",
            id: 3
        },


    ] as Array<ContactsType>,
    messages: [
        {
            isMy: true,
            message: "Salut, ce faci? "
        },

        {
            isMy: false,
            message: "Salut! Bine! Tu?"
        },

        {
            isMy: false,
            message: "bla bla bla"
        }
    ]as Array<MessagesType>,
    myNewMessage: "Mesaj"
};

export type InitialStateType = typeof initialState

const chatPageReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'messages/ADD_MESSAGE':
            let message = state.myNewMessage;
            return {
                ...state,
                myNewMessage: "",
                messages: [...state.messages, { isMy: true, message: message }]
            }
        case 'messages/UPDATE_NEW_MESSAGE':
            return {
                ...state,
                myNewMessage: action.newMessage
            }
        case 'messages/GET_CONTACTS':
            return {
                ...state, contacts: state.contacts
            }
        case 'messages/GET_MESSAGES':
            return {
                ...state, messages: state.messages
            }

        default:
            return state;
    }
}

export const actions = {
    addMessage: ()=> ({ type: 'messages/ADD_MESSAGE' } as const ),
    updateNewMessageText: (message: string) => ({ type: 'messages/UPDATE_NEW_MESSAGE', newMessage: message } as const ),
    getContacts: ()=> ({ type: 'messages/GET_CONTACTS' } as const ),
    getMessages: ()=> ({ type: 'messages/GET_MESSAGES' } as const )
}

export default chatPageReducer;
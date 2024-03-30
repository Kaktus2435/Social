// import photo from '../img/photo-1554080353-a576cf803bda.avif';

const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE';
const GET_CONTACTS = 'GET_CONTACTS';
const GET_MESSAGES = 'GET_MESSAGES';

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
        case ADD_MESSAGE:
            let message = state.myNewMessage;
            return {
                ...state,
                myNewMessage: "",
                messages: [...state.messages, { isMy: true, message: message }]
            }
        case UPDATE_NEW_MESSAGE:
            return {
                ...state,
                myNewMessage: action.newMessage
            }
        case GET_CONTACTS:
            return {
                ...state, contacts: state.contacts
            }
        case GET_MESSAGES:
            return {
                ...state, messages: state.messages
            }

        default:
            return state;
    }
}

type GetContactsActionType = {
    type: typeof GET_CONTACTS
}

export const getContacts = (): GetContactsActionType => ({ type: GET_CONTACTS })

type GetMessagesActionType = {
    type: typeof GET_MESSAGES
}

export const getMessages = (): GetMessagesActionType => ({ type: GET_MESSAGES })

type AddMessageActionType = {
    type: typeof ADD_MESSAGE
}

export const addMessage = (): AddMessageActionType => ({ type: ADD_MESSAGE })

type UpdateNewMessageTextActionType = {
    type: typeof UPDATE_NEW_MESSAGE,
    newMessage: string

}

export const updateNewMessageText = (message: string): UpdateNewMessageTextActionType => ({ type: UPDATE_NEW_MESSAGE, newMessage: message })

export default chatPageReducer;
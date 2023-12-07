import photo from '../img/photo-1554080353-a576cf803bda.avif';

const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE';
const GET_CONTACTS = 'GET_CONTACTS';
const GET_MESSAGES = 'GET_MESSAGES';


const initialState = {
    contacts: [
        {
            photos: photo,
            name: "Ion",
            firstName: "Valcea",
            id: 1
        },
        {
            photos: photo,
            name: "Vasile",
            id: 2
        },
        {
            photos: photo,
            name: "Vasile",
            id: 3
        },
       

    ],
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
    ],
    myNewMessage: "Mesaj"
};

const chatPageReducer = (state = initialState, action) => {
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

export const getContacts = () => ({ type: GET_CONTACTS });
export const getMessages = () => ({ type: GET_MESSAGES });
export const addMessage = () => ({ type: ADD_MESSAGE })
export const updateNewMessageText = (message) => ({ type: UPDATE_NEW_MESSAGE, newMessage: message })

export default chatPageReducer;
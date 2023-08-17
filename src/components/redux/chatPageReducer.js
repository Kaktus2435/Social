import photo from '../img/photo-1554080353-a576cf803bda.avif';

const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE';

const initialState = {
    contacts: [
        {
            photos: photo,
            name: "Ion",
            firstName: "Valcea"
        },
        {
            photos: photo,
            name: "Vasile",
        },
        {
            photos: photo,
            name: "Vasile",
        },
        {
            photos: photo,
            name: "Vasile",
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
            const message = state.myNewMessage;
            state.myNewMessage = "";
            state.messages.push({ isMy: true, message: message });
            return state;

        case UPDATE_NEW_MESSAGE:
            state.myNewMessage = action.newMessage;
            return state;

        default:
            return state;
    }
}
export const addMessageActionCreator = () => {
    return {
        type: ADD_MESSAGE
    }
}

export const updateNewMessageTextActionCreator = (message) => {
    return {
        type: UPDATE_NEW_MESSAGE, newMessage: message
    }
}
export default chatPageReducer;
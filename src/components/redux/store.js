import photo from "../img/photo-1554080353-a576cf803bda.avif"
import profilePageReducer from './profilePageReducer';
import chatPageReducer from './chatPageReducer';

let store = {



    _state: {

        chatsPage: {
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
        },
        profilePage: {
            posts: [
                {
                    name: "Ion",
                    post: "Iuhu"
                },
            ],
            myNewPost: "Post"
        }
    },

    _callSubscriber() {
        console.log("state");
    },

    getState() {
        return this._state
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profilePageReducer(this._state.profilePage, action);
        this._state.chatsPage = chatPageReducer(this._state.chatsPage, action);
        this._callSubscriber(this._state);
    }
}


export default store;

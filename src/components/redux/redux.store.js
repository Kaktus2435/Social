import {combineReducers, legacy_createStore as createStore} from "redux";
import profilePageReducer from "./profilePageReducer";
import chatPageReducer from "./chatPageReducer";

const reducers = combineReducers({
    profilePage: profilePageReducer,
    chatsPage: chatPageReducer,
});

const store = createStore(reducers);

export default store;
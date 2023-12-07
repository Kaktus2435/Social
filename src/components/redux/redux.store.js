import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import profilePageReducer from "./profilePageReducer";
import messagesPageReducer from "./messagesPageReducer"
import usersPageReducer from "./usersPageReducer";
import homePageReducer from "./homeReducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer} from 'redux-form'


const reducers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer,
    homePage: homePageReducer,
    auth: authReducer,
    form: formReducer
    
});



const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;
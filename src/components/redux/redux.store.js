import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import profilePageReducer from "./profilePageReducer";
import messagesPageReducer from "./messagesPageReducer"
import usersPageReducer from "./usersPageReducer";
import homePageReducer from "./homeReducer";
import authReducer from "./auth-reducer";
import { reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer,
    homePage: homePageReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
    
});
//composeEnhancers works only with chrome
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))


export default store;
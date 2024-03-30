import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import profilePageReducer from "./profilePageReducer.ts";
import messagesPageReducer from "./messagesPageReducer.ts"
import usersPageReducer from "./usersPageReducer.ts";
import homePageReducer from "./homeReducer.js";
import authReducer from "./auth-reducer.ts";
import { reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer.ts';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const rootReducers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer,
    homePage: homePageReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
    
});

type RootReducersType = typeof rootReducers
export type AppStateType = ReturnType<RootReducersType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key: string]: (...arg: any[]) => any}> = ReturnType<PropertiesTypes<T>>
//composeEnhancers works only with chrome
const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))


export default store;
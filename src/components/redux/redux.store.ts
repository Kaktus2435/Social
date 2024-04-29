import {Action, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import profilePageReducer from "./profilePageReducer.ts";
import messagesPageReducer from "./messagesPageReducer.ts"
import usersPageReducer from "./usersPageReducer.ts";
import homePageReducer from "./homeReducer.js";
import authReducer from "./auth-reducer.ts";
import { reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer.ts';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from 'redux-thunk'

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

export type InferActionTypes<T> = T extends {[key: string]: (...arg: any[]) => infer U} ? U : never

//composeEnhancers works only with chrome
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction <R, AppStateType, unknown, A>

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))


export default store;
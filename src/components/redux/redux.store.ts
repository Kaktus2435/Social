import { Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import profilePageReducer from "./profilePageReducer.ts";
import messagesPageReducer from "./messagesPageReducer.ts"
import usersPageReducer from "./usersPageReducer.ts";
import homePageReducer from "./homeReducer.js";
import authReducer from "./auth-reducer.ts";
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer.ts';
import thunk, { ThunkAction } from 'redux-thunk'
import chatPageReducer from "./chatPage-reducer.ts";



const rootReducers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer,
    homePage: homePageReducer,
    auth: authReducer,
    app: appReducer,
    chatPage: chatPageReducer,
    form: formReducer

});



export type InferActionTypes<T> = T extends { [key: string]: (...arg: any[]) => infer U } ? U : never

//composeEnhancers works only with chrome
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk))
);

type RootReducersType = typeof rootReducers
export type AppStateType = ReturnType<RootReducersType>

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducers>;


export default store;
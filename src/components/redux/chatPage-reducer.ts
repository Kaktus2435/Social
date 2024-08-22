import { FormAction } from "redux-form";
import { chatAPI, ChatMessagesType } from "../../api/chatAPI.ts";
import { getUserData } from "./auth-reducer.ts";
import { BaseThunkType, InferActionTypes } from "./redux.store.ts";
import { Dispatch } from "redux";

let initialState = {
    messages: [] as ChatMessagesType[]
};

let _newMessageHandler: ((messages: ChatMessagesType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

const chatPageReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "network/chatPage/MESSAGES_RECEIVED":
            return {
                messages: [...state.messages, ...action.payload.messages]

            }
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessagesType[]) =>
        ({ type: "network/chatPage/MESSAGES_RECEIVED", payload: { messages } }) as const
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
    
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatPageReducer;

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

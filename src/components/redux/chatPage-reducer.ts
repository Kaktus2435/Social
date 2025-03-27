import { FormAction } from "redux-form";
import { chatAPI, ChatMessagesAPIType, StatusType } from "../../api/chatAPI.ts";
import { BaseThunkType, InferActionTypes } from "./redux.store.ts";
import { Dispatch } from "redux";

let initialState = {
    messages: [] as ChatMessagesAPIType[],
    status: 'pending' as StatusType
};

let _newMessageHandler: ((messages: ChatMessagesAPIType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}



let _newStatusHandler: ((status: StatusType) => void) | null = null

const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _newStatusHandler
}

let _clearMessages: (() => void) | null = null

export const clearMessages = (dispatch: Dispatch) => {
    if (_clearMessages === null) {
        _clearMessages = () => {
            dispatch(actions.messagesCleaner());
        }
    }

    return _clearMessages;
}

const chatPageReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "network/chatPage/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]

            }

        case "network/chatPage/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
    
            } 

        case "network/chatPage/CLEAR_MESSAGES":
            return {
                ...state,
                messages: []
        
            } 
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessagesAPIType []) =>
        ({ type: "network/chatPage/MESSAGES_RECEIVED", payload: { messages } }) as const,
    
    statusChanged: (status: StatusType) =>
        ({ type: "network/chatPage/STATUS_CHANGED", payload: { status } }) as const,

    messagesCleaner: () =>
        ({ type: "network/chatPage/CLEAR_MESSAGES" }) as const
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed',  newStatusHandlerCreator(dispatch))
    
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch));
    chatAPI.stop(); 
    
    // Apelează funcția de curățare a mesajelor
    clearMessages(dispatch)();
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatPageReducer;

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

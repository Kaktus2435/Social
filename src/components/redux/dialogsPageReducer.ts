// dialogsReducer.ts
import { Dispatch } from "react";
import { dialogsAPI } from "../../api/dialogsAPI.ts";
import { AppDispatch, AppStateType, BaseThunkType, InferActionTypes } from "./redux.store.ts";
import {DialogType} from "../../types/types.ts"

interface Dialog {
    userId: number;
    messages: string[];
    userName: string;
    photos: {small: string};
    isActive: boolean;
}

const initialState = {
    dialogs: [] as Array<Dialog>,
    isLoading: false as boolean,
    error: null as string | null,
    pageSize: 6 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    messagesList: [
          {
            id: "d6414d83-08d1-470a-ba81-4492d6e15d91",
            body: "asdasdsadsadasd",
            translatedBody: null,
            addedAt: "2024-11-25T14:40:18.307",
            senderId: 29925,
            senderName: "Andrian25",
            recipientId: 31815,
            viewed: true,
          },
          {
            id: "-ba81-4492d6e15d91",
            body: "azaz",
            translatedBody: null,
            addedAt: "2024-11-25T14:40:18.307",
            senderId: 2992,
            senderName: "Andri",
            recipientId: 318,
            viewed: true,
          }
        ] as Array<DialogType> 
};

type DialogsAction =
    | { type: 'network/dialogs/SET_DIALOGS'; payload: Dialog[] }
    | { type: 'network/dialogs/SET_LOADING'; payload: boolean }
    | { type: 'network/dialogs/SET_ERROR'; payload: string }
    | { type: 'network/dialogs/ADD_MESSAGE'; payload: { userId: number; message: string }}
    | { type : 'network/dialogs/'}
    | { type: 'network/dialogs/SET_MESSAGES_LIST_FRIEND'; payload: DialogType[]}

// Reducer
export const dialogsPageReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'network/dialogs/SET_DIALOGS':
            return { ...state, dialogs: action.payload };
        case 'network/dialogs/SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'network/dialogs/SET_ERROR':
            return { ...state, error: action.payload };
        case 'network/dialogs/ADD_MESSAGE':
            return {
                ...state,
                dialogs: state.dialogs.map(dialog =>
                    dialog.userId === action.payload.userId
                        ? { ...dialog, messages: [...dialog.messages, action.payload.message] }
                        : dialog
                )};
        case 'network/dialogs/SET_MESSAGES_LIST_FRIEND': 
        return {
            ...state, 
            messagesList: action.payload
        }        
        default:
            return state;
    }
};

export const actions = {
    setDialogs: (dialogs: Array <Dialog>): DialogsAction => ({ 
        type: 'network/dialogs/SET_DIALOGS',
        payload: dialogs 
    } as const),
    setLoading: (isLoading: boolean): DialogsAction => ({ 
        type: 'network/dialogs/SET_LOADING', 
        payload: isLoading 
    } as const),
    setError: (error: string): DialogsAction => ({ 
        type: 'network/dialogs/SET_ERROR', 
        payload: error 
    } as const),
    addMessage: (userId: number, message: string): DialogsAction => ({
        type: 'network/dialogs/ADD_MESSAGE',
        payload: { userId, message }
    }as const),
    
    setMessagesList: (messagesList: Array<DialogType>): DialogsAction => ({
        type: 'network/dialogs/SET_MESSAGES_LIST_FRIEND',
        payload: messagesList
    }as const)
} 

// Actions

export const fetchDialogs = (): ThunkType => async (dispatch: AppDispatch) => {
    try {
        const dialogs = await dialogsAPI.getDialogs();
        dispatch(actions.setDialogs(dialogs));
        
    } catch (error) {
        dispatch(actions.setError('Eroare la încărcarea dialogurilor'));
    } finally {
        dispatch(actions.setLoading(false));
    }
};

export const fetchMessagesList = ( userId : number, currentPage: number, pageSize: number ): ThunkType => {
    return async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
        let data = await dialogsAPI.getMessagesListFriend(userId, currentPage, pageSize)
        dispatch(actions.setMessagesList(data.items))
    }
}

export const sendMessage = (userId: number, message: string): ThunkType => async (dispatch: AppDispatch) => {
    dispatch(actions.setLoading(true));
    try {
        const sentMessage = await dialogsAPI.postMessage(userId, message);
        dispatch(actions.addMessage(userId, sentMessage));
    } catch (error) {
        dispatch(actions.setError('Eroare la trimiterea mesajului'));
    } finally {
        dispatch(actions.setLoading(false));
    }
};

type ThunkType = BaseThunkType<ActionTypes>

type ActionTypes = InferActionTypes<typeof actions>
type InitialStateType = typeof initialState
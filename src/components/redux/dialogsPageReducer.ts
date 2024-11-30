// dialogsReducer.ts
import { dialogsAPI } from "../../api/dialogsAPI.ts";
import { AppDispatch } from "./redux.store.ts";

interface Dialog {
    userId: number;
    messages: string[];
    userName: string;
    photos: {small: string};
    isActive: boolean;
}

interface DialogsState {
    dialogs: Dialog[];
    isLoading: boolean;
    error: string | null;
    
}

const initialState: DialogsState = {
    dialogs: [],
    isLoading: false,
    error: null,
    
};

type DialogsAction =
    | { type: 'SET_DIALOGS'; payload: Dialog[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'ADD_MESSAGE'; payload: { userId: number; message: string } }


// Reducer
export const dialogsPageReducer = (state = initialState, action: DialogsAction): DialogsState => {
    switch (action.type) {
        case 'SET_DIALOGS':
            return { ...state, dialogs: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'ADD_MESSAGE':
            return {
                ...state,
                dialogs: state.dialogs.map(dialog =>
                    dialog.userId === action.payload.userId
                        ? { ...dialog, messages: [...dialog.messages, action.payload.message] }
                        : dialog
                )}
        default:
            return state;
    }
};

// Actions
export const setDialogs = (dialogs): DialogsAction => ({ type: 'SET_DIALOGS', payload: dialogs });
export const setLoading = (isLoading: boolean): DialogsAction => ({ type: 'SET_LOADING', payload: isLoading });
export const setError = (error: string): DialogsAction => ({ type: 'SET_ERROR', payload: error });
export const addMessage = (userId: number, message: string): DialogsAction => ({
    type: 'ADD_MESSAGE',
    payload: { userId, message }
});

export const fetchDialogs = () => async (dispatch: AppDispatch) => {
    try {
        const dialogs = await dialogsAPI.getDialogs();
        dispatch(setDialogs(dialogs));
    } catch (error) {
        dispatch(setError('Eroare la încărcarea dialogurilor'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const sendMessage = (userId: number, message: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const sentMessage = await dialogsAPI.postMessage(userId, message);
        dispatch(addMessage(userId, sentMessage));
    } catch (error) {
        dispatch(setError('Eroare la trimiterea mesajului'));
    } finally {
        dispatch(setLoading(false));
    }
};


// dialogsSelectors.js
import { createSelector } from 'reselect';
import { AppStateType } from './redux.store';

export const getDialogs = (state: AppStateType) => state.dialogsPage.dialogs;
export const getIsLoading = (state: AppStateType) => state.dialogsPage.isLoading;
export const getError = (state: AppStateType) => state.dialogsPage.error;
export const startChatting = (state: AppStateType) => state.dialogsPage.chatting

// Selector simplu pentru a obține dialogurile
export const getAllDialogsSelector = createSelector(
    getDialogs,
    (dialogs) => dialogs
);

// Selector avansat, de exemplu, pentru a filtra dialogurile după un criteriu
export const getFilteredDialogsSelector = createSelector(
    getDialogs,
    (dialogs) => dialogs.filter((dialog) => dialog.isActive) // Exemplu: filtrează doar dialogurile active
);


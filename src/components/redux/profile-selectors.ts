import { AppStateType } from "./redux.store";

export const getProfilePage = (state: AppStateType) => {
    return state.profilePage
}

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getStatusSelector = (state: AppStateType) => {
    return state.profilePage.status
}

export const getUpdateStatus = (state: AppStateType) => {
    return state.profilePage.updateStatus
}


export const getAuthorizedUserId = (state: AppStateType) => {
    return state.auth.id
}

export const getisAuth = (state: AppStateType) => {
    return state.auth.isAuth
}


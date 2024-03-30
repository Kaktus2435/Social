import { authAPI } from "../../api/authAPI.ts";
import { securityAPI } from "../../api/securityAPI.ts";
import { stopSubmit } from "redux-form";
import { InferActionTypes } from "./redux.store.ts";
import { Dispatch } from "react";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState; 

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCES':
            return {
            
                ...state,
                ...action.payload
                
            }

        default:
            return state;
    }
}

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => 
    ({ type: "SET_USER_DATA", payload: { id, email, login, isAuth } } as const ),
    getCaptchaUrlSucces: (captchaUrl: string) => 
    ({ type: "GET_CAPTCHA_URL_SUCCES", payload: {captchaUrl} } as const )
}

export const getUserData = () => async (dispatch: Dispatch<ActionTypes>) => {
    const meData = await authAPI.me();
    
    
    if (meData.resultCode === 0) {
        const { id, login, email } = meData.data;
        dispatch(actions.setUserData(id, login, email, true));
    }
};

// export const getUserData = () => (dispatch) => {

//     return authAPI.me()
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 let { id, login, email } = response.data.data;
//                 dispatch(setUserData(id, login, email, true));
//             }
//         });

// }


export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === 0) {
        dispatch(getUserData())
    } else {
        if (loginData.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        
        const message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))
        
    }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch<ActionTypes>) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(actions.getCaptchaUrlSucces(captchaUrl));
}



export const logout = () => async (dispatch: Dispatch<ActionTypes>) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setUserData(null, null, null, false));
    }
}

export default authReducer; 
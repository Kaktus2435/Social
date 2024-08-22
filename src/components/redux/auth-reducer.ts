import { authAPI } from "../../api/authAPI.ts";
import { securityAPI } from "../../api/securityAPI.ts";
import { stopSubmit } from "redux-form";
import { BaseThunkType, InferActionTypes } from "./redux.store.ts";
import { Dispatch } from "react";
import { ResultCodeEnum } from "../../api/api.ts";


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};


const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        case 'network/app/SET_USER_DATA':
        case 'network/app/GET_CAPTCHA_URL_SUCCESS':
            return {

                ...state,
                ...action.payload

            }

        default:
            return state;
    }
}


export const actions = {
    setUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) =>
        ({ type: "network/app/SET_USER_DATA", payload: { id, email, login, isAuth } } as const),
    getCaptchaUrlSucces: (captchaUrl: string) =>
        ({ type: "network/app/GET_CAPTCHA_URL_SUCCESS", payload: { captchaUrl } } as const)
}

export const getUserData = ():ThunkType => async (dispatch) => {
    const meData = await authAPI.me();


    if (meData.resultCode === ResultCodeEnum.Success) {
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


export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getUserData())
    } else {
        if (loginData.resultCode === ResultCodeEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }

        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))

    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch: Dispatch<ActionTypes>) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSucces(captchaUrl));
}



export const logout = (): ThunkType => async (dispatch: Dispatch<ActionTypes>) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setUserData(null, null, null, false));
    }
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | ReturnType<typeof stopSubmit>>
import { authAPI, securityAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCES = "network/auth/GET_CAPTCHA_URL_SUCCES";
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action, userId) => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCES:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export const setUserData = (id, email, login, isAuth) => ({ 
    type: SET_USER_DATA, payload: { id, email, login, isAuth } 
});

export const getCaptchaUrlSucces = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCES, payload: {captchaUrl} 
});

export const getUserData = () => async (dispatch) => {
    const response = await authAPI.me();
    
    if (response.data.resultCode === 0) {
        const { id, login, email } = response.data.data;
        dispatch(setUserData(id, login, email, true));
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


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        
        const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))
        
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSucces(captchaUrl));
}



export const logout = (email, password, rememberMe, isAuth) => async (dispatch) => {
    const response = await authAPI.logout(email, password, rememberMe, isAuth)
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    }
}

export default authReducer; 
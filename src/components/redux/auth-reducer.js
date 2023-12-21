import { authAPI } from "../../api/api";
<<<<<<< HEAD
import { stopSubmit } from "redux-form";
=======
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action, userId) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export const setUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });
<<<<<<< HEAD

export const getUserData = () => (dispatch) => {
    debugger
    return authAPI.me()
        .then(response => {
=======
export const getUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {

>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setUserData(id, login, email, true));
            }
        });
<<<<<<< HEAD
        
}

export const login = (email, password, rememberMe) => (dispatch) => {
       
=======
}

export const login = (email, password, rememberMe) => (dispatch) => {
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
    authAPI.login(email, password, rememberMe)
        .then(response => {

            if (response.data.resultCode === 0) {
<<<<<<< HEAD
               dispatch(getUserData())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] :"Some error"
                dispatch(stopSubmit("login", {_error: message}))

=======
               dispatch(getUserData(email, password, rememberMe))
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
            }
        });
}

export const logout = (email, password, rememberMe, isAuth) => (dispatch) => {
    authAPI.logout(email, password, rememberMe, isAuth)
        .then(response => {
<<<<<<< HEAD
=======

>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false));
            }
        });
}
export default authReducer; 
import { authAPI } from "../../api/api";

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
export const getUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {

            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setUserData(id, login, email, true));
            }
        });
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {

            if (response.data.resultCode === 0) {
               dispatch(getUserData(email, password, rememberMe))
            }
        });
}

export const logout = (email, password, rememberMe, isAuth) => (dispatch) => {
    authAPI.logout(email, password, rememberMe, isAuth)
        .then(response => {

            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false));
            }
        });
}
export default authReducer; 
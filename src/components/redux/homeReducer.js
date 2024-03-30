import { homeAPI } from "../../api/homeAPI.ts";

const SET_USERS = "SET_USERS";


let initialState = {
    users: [],
}

const homePageReducer = (state = initialState, action, userId) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state, users: [...action.users]
            }
        default:
            return state;
    }
}


export const setUsers = (users) => ({ type: SET_USERS, users });

export const getUsersHome = () => {
    return (dispatch) => {
        homeAPI.getUsersHome()
            .then(data => {
                dispatch(setUsers(data.items))
            })
    }
}

export default homePageReducer;
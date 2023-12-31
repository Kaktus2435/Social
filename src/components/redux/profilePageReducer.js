import { profileAPI, usersAPI } from "../../api/api";

const ADD_POST = 'ADD_POST';

const SET_USERS_PROFILE ='SET_USERS_PROFILE';
const SET_USERS_ID ='SET_USERS_ID';
const SET_STATUS ='SET_STATUS';

const initialState = {
    posts: [
        {
            id: 1,
            name: "Ion",
            post: "Iuhu"
        },
    ],
    profile: null,
    status: ""
};

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) { 
        
        case ADD_POST:
            let post = action.myNewPost;
            return {
                ...state,
                myNewPost: '',
                posts: [...state.posts, { id: 2, name: 'Incognito', post: post }]
            }
        case SET_USERS_PROFILE:
            return {
                ...state, profile: action.profile

            }
        case SET_USERS_ID:
            return {
                ...state, id: action.userId
            }
       case SET_STATUS:
            return {
                ...state, status: action.status
                }
    
        default:
            return state;
    }
}
export const addPost = (myNewPost) => ({type: ADD_POST, myNewPost })

export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});
export const setUsersId = (userId) => ({type: SET_USERS_ID, userId});
export const setStatus = (status) => ({type: SET_STATUS, status})

export const getUsersProfile = (userId) => (dispatch) =>{
    usersAPI.getProfile(userId)
    .then(response => {
        
            dispatch(setUsersProfile(response.data));
        });
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
    .then(response => {
            dispatch(setStatus(response.data));
        });
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
    .then(response => {
        if(response.data.resultCode === 0) {
            dispatch (setStatus(status))
            
        }
    });
}

export default profilePageReducer;
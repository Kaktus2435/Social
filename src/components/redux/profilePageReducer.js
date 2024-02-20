import { profileAPI, usersAPI } from "../../api/api";

const ADD_POST = 'ADD_POST';

const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_USERS_ID = 'SET_USERS_ID';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS';

const initialState = {
    posts: [
        {
            id: 1,
            name: "Ion",
            post: "Iuhu"
        }
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
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id !== action.userId) }

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
        case SET_PHOTO_SUCCESS:
            return {
                ...state, profile: { ...state.profile, photos: action.photos }
            }
    


        default:
            return state;
    }
}
export const addPost = (myNewPost) => ({ type: ADD_POST, myNewPost })
export const deletePost = (userId) => ({ type: DELETE_POST, userId })

export const setUsersProfile = (profile) => ({ type: SET_USERS_PROFILE, profile });
export const setUsersId = (userId) => ({ type: SET_USERS_ID, userId });
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const savePhotoSucces = (photos) => ({ type: SET_PHOTO_SUCCESS, photos })

export const getUsersProfile = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUsersProfile(response.data));
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
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))

            }
        });
}

export const savePhoto = (file) => (dispatch) => {
    profileAPI.savePhoto(file)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSucces(response.data.data.photos));
            }
        }
        )
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUsersProfile(userId));
    }
}

// export const savePhoto = (file) => {
//     return async (dispatch) => {
//         savePhotoSucces(dispatch, file, )
//     }
// }
export default profilePageReducer;
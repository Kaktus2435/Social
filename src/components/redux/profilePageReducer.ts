import { profileAPI } from "../../api/profileAPI.ts";
import { usersAPI } from "../../api/usersAPI.ts";
import { PhotosType, PostsType, ProfileType } from "../../types/types";

const ADD_POST = 'ADD_POST';

const SET_USERS_PROFILE = 'SET_USERS_PROFILE';

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
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    myNewPost: null as string | null,
    updateStatus: null as string | null
};

export type InitialStateType = typeof initialState

const profilePageReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

        case ADD_POST:
            let post = action.myNewPost;
            return {
                ...state,
                myNewPost: '',
                posts: [...state.posts, { id: 2, name: 'Incognito', post: post, updateStatus }]
            }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id !== action.userId) }

        case SET_USERS_PROFILE:
            return {
                ...state, profile: action.profile

            }

        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case SET_PHOTO_SUCCESS:
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as ProfileType
            }



        default:
            return state;
    }
}


type AddPostActionType = {
    type: typeof ADD_POST,
    myNewPost: string
}

export const addPost = (myNewPost: string): AddPostActionType => ({ type: ADD_POST, myNewPost })


type DeletePostActionType = {
    type: typeof DELETE_POST,
    userId: number
}

export const deletePost = (userId: number): DeletePostActionType => ({ type: DELETE_POST, userId })


type SetUsersProfileActionType = {
    type: typeof SET_USERS_PROFILE,
    profile: ProfileType
}

export const setUsersProfile = (profile: ProfileType): SetUsersProfileActionType => ({ type: SET_USERS_PROFILE, profile });


type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })


type SavePhotoSuccesActionType = {
    type: typeof SET_PHOTO_SUCCESS,
    photos: PhotosType
}

export const savePhotoSucces = (photos: PhotosType): SavePhotoSuccesActionType => ({ type: SET_PHOTO_SUCCESS, photos })

export const getUsersProfile = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.getProfile(userId);
    dispatch(setUsersProfile(response.data));
}

export const getStatus = (userId: number) => (dispatch: any) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data));
        });
}

export const updateStatus = (status: string) => (dispatch: any) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))

            }
        });
}

export const savePhoto = (file: any) => (dispatch: any) => {
    profileAPI.savePhoto(file)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSucces(response.data.data.photos));
            }
        }
        )
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
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
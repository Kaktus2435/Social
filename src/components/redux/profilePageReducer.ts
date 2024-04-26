import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../../api/api.ts";
import { profileAPI } from "../../api/profileAPI.ts";
import { PhotosType, PostsType, ProfileType } from "../../types/types";
import { BaseThunkType, InferActionTypes } from "./redux.store.ts";

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



const profilePageReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        case "profile/ADD_POST":
            let post = action.myNewPost;
            return {
                ...state,
                myNewPost: '',
                posts: [...state.posts, { id: 2, name: 'Incognito', post: post, updateStatus }]
            }
        case "profile/DELETE_POST":
            return { ...state, posts: state.posts.filter(p => p.id !== action.userId) }

        case "profile/SET_USERS_PROFILE":
            return {
                ...state, profile: action.profile

            }

        case "profile/SET_STATUS":
            return {
                ...state, status: action.status
            }
        case "profile/SET_PHOTO_SUCCESS":
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as ProfileType
            }



        default:
            return state;
    }
}
export const addPost = (myNewPost: string) => ({ type: "profile/ADD_POST", myNewPost })

export const actions = {
    deletePost: (userId: number) => ({ type: "profile/DELETE_POST", userId } as const),
    setUsersProfile: (profile: ProfileType) => ({ type: "profile/SET_USERS_PROFILE", profile } as const),
    setStatus: (status: string) => ({ type: "profile/SET_STATUS", status } as const),
    savePhotoSucces: (photos: PhotosType) => ({ type: "profile/SET_PHOTO_SUCCESS", photos } as const)
}

export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUsersProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))

    // profileAPI.getStatus(userId)
    //     .then(data => {
    //         dispatch(actions.setStatus(data));
    //     });
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.savePhotoSucces(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === ResultCodeEnum.Success) {
        if (userId != null) {
            dispatch(getUsersProfile(userId));
        } else {
            dispatch(stopSubmit('edit-profile', { error: data.messages[0] }))
            return Promise.reject(data.messages[0]);
        }
    }
}
// export const savePhoto = (file) => {
//     return async (dispatch) => {
//         savePhotoSucces(dispatch, file, )
//     }
// }
export default profilePageReducer;

type ThunkType = BaseThunkType<ActionType | FormAction>
export type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>


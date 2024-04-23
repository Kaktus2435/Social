import { ResultCodeEnum } from "../../api/api.ts";
import { profileAPI } from "../../api/profileAPI.ts";
import { usersAPI } from "../../api/usersAPI.ts";
import { PhotosType, PostsType, ProfileType } from "../../types/types";

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

        case "ADD_POST":
            let post = action.myNewPost;
            return {
                ...state,
                myNewPost: '',
                posts: [...state.posts, { id: 2, name: 'Incognito', post: post, updateStatus }]
            }
        case "DELETE_POST":
            return { ...state, posts: state.posts.filter(p => p.id !== action.userId) }

        case "SET_USERS_PROFILE":
            return {
                ...state, profile: action.profile

            }

        case "SET_STATUS":
            return {
                ...state, status: action.status
            }
        case "SET_PHOTO_SUCCESS":
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as ProfileType
            }



        default:
            return state;
    }
}
export const addPost = (myNewPost: string) => ({ type: "ADD_POST", myNewPost })

export const actions = {
    deletePost: (userId: number) => ({ type: "DELETE_POST", userId } as const ),
    setUsersProfile: (profile: ProfileType) => ({ type: "SET_USERS_PROFILE", profile } as const ),
    setStatus: (status: string) => ({ type: "SET_STATUS", status } as const ),
    savePhotoSucces: (photos: PhotosType) => ({ type: "SET_PHOTO_SUCCESS", photos } as const )
}

export const getUsersProfile = (userId: number) => async (dispatch: any) => {
    const data = await usersAPI.getProfile(userId);
    dispatch(actions.setUsersProfile(data));
}

export const getStatus = (userId: number) => (dispatch: any) => {
    profileAPI.getStatus(userId)
        .then(data => {
            dispatch(actions.setStatus(data));
        });
}

export const updateStatus = (status: string) => (dispatch: any) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === ResultCodeEnum.Success) {
                dispatch(actions.setStatus(status))

            }
        });
}

export const savePhoto = (file: any) => (dispatch: any) => {
    profileAPI.savePhoto(file)
        .then(data => {
            if (data.resultCode === ResultCodeEnum.Success) {
                dispatch(actions.savePhotoSucces(data.data.photos));
            }
        }
        )
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getUsersProfile(userId));
    }
}

// export const savePhoto = (file) => {
//     return async (dispatch) => {
//         savePhotoSucces(dispatch, file, )
//     }
// }
export default profilePageReducer;
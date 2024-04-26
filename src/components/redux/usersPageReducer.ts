import { Dispatch } from 'react';
import { AppStateType, BaseThunkType, InferActionTypes } from './redux.store';
import { usersAPI } from "../../api/usersAPI.ts";
import { UserType } from "../../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { ResultCodeEnum } from '../../api/api.ts';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5 as number | null,
    totalUsersCount: 0 as number | null,
    currentPage: 1 as number | null,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>,
}


const usersPageReducer = (state = initialState, action: ActionTypes, userId: number): InitialStateType => {

    switch (action.type) {
        case 'network/users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: true }
                //     }
                //     return u;
                // })
            }
        case 'network/users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
                //     users: state.users.map(m => {
                //         if (m.id === action.userId) {
                //             return { ...m, followed: false }
                //         }
                //         return m;
                //     })
            }
        case 'network/users/SET_USERS':
            return {
                ...state, users: [...action.users]
            }

        case 'network/users/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }

        case 'network/users/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.count
            }


        case 'network/users/TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }

        case 'network/users/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userId: number) => ({ type: "network/users/FOLLOW", userId } as const),
    unfollowSuccess: (userId: number) => ({ type: "network/users/UNFOLLOW", userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: "network/users/SET_USERS", users } as const),
    setCurrentPage: (currentPage: number) => ({ type: "network/users/SET_CURRENT_PAGE", currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "network/users/SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "network/users/TOGGLE_IS_FETCHING", isFetching } as const),
    toggleIsFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: "network/users/TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const)
}

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
        dispatch(actions.toggleIsFetching(true));

        let data = await usersAPI.requestUsers(currentPage, pageSize)
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleIsFollowingInProgress(true, userId));
    let data = await apiMethod(userId)

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleIsFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType  => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}
export default usersPageReducer;

type ThunkType = BaseThunkType<ActionTypes>
export type InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof actions>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

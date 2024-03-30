import { AppStateType, InferActionTypes } from './redux.store';
import { usersAPI } from "../../api/usersAPI.ts";
import { UsersType } from "../../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5 as number | null,
    totalUsersCount: 0 as number | null,
    currentPage: 1 as number | null,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>,
    fake: 10 as number
}
export type InitialStateType = typeof initialState; 


const usersPageReducer = (state = initialState, action: ActionTypes, userId: number): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: true }
                //     }
                //     return u;
                // })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            //     users: state.users.map(m => {
            //         if (m.id === action.userId) {
            //             return { ...m, followed: false }
            //         }
            //         return m;
            //     })
             }
        case 'SET_USERS':
            return {
                // @ts-ignore
                ...state, users: [...action.users]
            }

        case 'SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }

        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.count
            }


        case 'TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }

        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: "FOLLOW", userId }as const),
    unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId }as const),
    setUsers: (users: UsersType) => ({ type: "SET_USERS", users }as const),
    setCurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage }as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "SET_TOTAL_USERS_COUNT", count: totalUsersCount }as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching }as const),
    toggleIsFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId }as const)
}

export const requestUsers = (currentPage: number, pageSize: number) => {
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
    let response = await apiMethod(userId)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleIsFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown,  ActionTypes>  => {
    return async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}
export default usersPageReducer;
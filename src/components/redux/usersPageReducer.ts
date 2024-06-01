import { Dispatch } from 'react';
import { AppStateType, BaseThunkType, InferActionTypes } from './redux.store';
import { usersAPI } from "../../api/usersAPI.ts";
import { UserType } from "../../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { APIResponseType, ResultCodeEnum } from '../../api/api.ts';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}


const usersPageReducer = (state = initialState, action: ActionTypes): InitialStateType => {

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
                ...state, users: action.users
            }
        case 'network/users/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
                
            }

        case 'network/users/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.count
            }
        case 'network/users/SET_FILTER':
            return {
                ...state, filter: action.payload
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
    setFilter: (filter: FilterType) => ({ type: "network/users/SET_FILTER", payload: filter } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "network/users/SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "network/users/TOGGLE_IS_FETCHING", isFetching } as const),
    toggleIsFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: "network/users/TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const)
}

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));
       
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend ) 
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number, 
    apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleIsFollowingInProgress(true, userId));
    let data = await apiMethod(userId)

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleIsFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType  => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}
export default usersPageReducer;

export type ThunkType = BaseThunkType<ActionTypes>
export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

type ActionTypes = InferActionTypes<typeof actions>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

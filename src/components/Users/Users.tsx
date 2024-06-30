import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paginator from "../common/paginator/Pagination.tsx";
import SearchForm from "../header/search/UsersSearchForm.tsx";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUserSuperSelector, getUsersFilter } from "../redux/users-selectors.ts";
import { FilterType, follow, requestUsers, unfollow } from "../redux/usersPageReducer.ts";
import User from "./User.tsx";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
debugger
    const users = useSelector(getUserSuperSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    /* daca nu avem selectorul pregatit putem scri direct
    const pageSize = useSelector((state) => state.usersPage.pageSize)*/
    const dispatch = useDispatch<any>()
    /* useDispatch - intoarce o functie pe care o putem apela.Apoi acestei functii 
    putem sa-i dam thunk sau action si ea se va expedia unde e nevoie. */
    
    const navigate = useNavigate()
    useEffect(() => {
        navigate({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&currentPage=${currentPage}`
        })
    }, [filter, currentPage])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    
    /* avem nevoie ca sa montam userii si nu putem folosi componentDidMount
    in schim folosim useEffect - useEffect un pic e diferit de componentDidMount mai degraba 
    se aseamana cu sincronizare si actualizarea a datelor decat cu montare */
    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
        /* requestUsers - este thunk creator lui i se face dispatch 
        thunk creator - este o varietate a action creator adica este un action care se
        indeplineste asincron
        */
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }


    const handleFollow  = (userId: number) => {
        dispatch(follow(userId));
    }

    const handleUnfollow  = (id: number) => {
        dispatch(unfollow(id))
    }

    return <div>
        
        <SearchForm onFilterChanged={onFilterChanged} />

        <Paginator currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize} />

        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={followingInProgress}
                    unfollow={handleUnfollow }
                    follow={handleFollow}
                    key={u.id}
                />)
            }
        </div>
    </div>

}



import React, { useEffect } from "react";
import Paginator from "../common/paginator/Pagination.tsx";
import User from "./User.tsx";
import SearchForm from "../header/search/UsersSearchForm.tsx";
import { FilterType, requestUsers } from "../redux/usersPageReducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUserSuperSelector, getUsersFilter } from "../redux/users-selectors.ts";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

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

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])
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


    const follow = (id: number) => {
        dispatch(follow(id))
    }

    const unfollow = (id: number) => {
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
                    unfollow={unfollow}
                    follow={follow}
                    key={u.id}
                />)
            }
        </div>
    </div>

}



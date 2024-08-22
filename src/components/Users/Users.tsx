import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Paginator from "../common/paginator/Pagination.tsx";
import {SearchForm} from "../header/search/UsersSearchForm.tsx";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUserSuperSelector, getUsersFilter } from "../redux/users-selectors.ts";
import { FilterType, follow, requestUsers, unfollow } from "../redux/usersPageReducer.ts";
import User from "./User.tsx";
import { AppDispatch } from "../redux/redux.store.ts";

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
    const dispatch: AppDispatch = useDispatch()
    /* useDispatch - intoarce o functie pe care o putem apela.Apoi acestei functii 
    putem sa-i dam thunk sau action si ea se va expedia unde e nevoie. */

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

   
    useEffect(() => {
        const parsed = Object.fromEntries(searchParams) as {page: string, term: string, friend: string}

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false}


        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const query: any = {}
            if (!!filter.term) query.term = filter.term /* daca obiectul !!filter.term exista, atunci noi adaugam in query.term ceia ce este in filter.term */
            if (filter.friend !== null) query.friend = String(filter.friend) /* daca filter.friend nu e ste null atunci adaugam String(filter.friend) in query.friend. Se scrie String(filter.friend) deoarece */
            if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: '/users',
            search:  new URLSearchParams(query).toString()
        })
    }, [filter, currentPage])// eslint-disable-line react-hooks/exhaustive-deps


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


    const handleFollow = (userId: number) => {
        dispatch(follow(userId));
    }

    const handleUnfollow = (id: number) => {
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
                    unfollow={handleUnfollow}
                    follow={handleFollow}
                    key={u.id}
                />)
            }
        </div>
    </div>

}



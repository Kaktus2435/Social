import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Paginator from "../../components/common/paginator/Pagination.tsx";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUserSuperSelector, getUsersFilter } from "../../components/redux/users-selectors.ts";
import { FilterType, follow, requestUsers, unfollow } from "../../components/redux/usersPageReducer.ts";
import User from "./User.tsx";
import { AppDispatch } from "../../components/redux/redux.store.ts";
import styles from "./Users.module.css"

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUserSuperSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)


    const dispatch: AppDispatch = useDispatch()


    const navigate = useNavigate()
    const [searchParams] = useSearchParams()


    useEffect(() => {
        const parsed = Object.fromEntries(searchParams) as { page: string, term: string, friend: string }

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }
        if (!!parsed.friend) actualFilter = { ...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false }


        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: any = {}
        if (!!filter.term) query.term = filter.term /* daca obiectul !!filter.term exista, atunci noi adaugam in query.term ceia ce este in filter.term */
        if (filter.friend !== null) query.friend = String(filter.friend) /* daca filter.friend nu e ste null atunci adaugam String(filter.friend) in query.friend. Se scrie String(filter.friend) deoarece */
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: '/users',
            search: new URLSearchParams(query).toString()
        })
    }, [filter, currentPage])// eslint-disable-line react-hooks/exhaustive-deps



    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))

    }

    const handleFollow = (userId: number) => {
        dispatch(follow(userId));
    }

    const handleUnfollow = (id: number) => {
        dispatch(unfollow(id))
    }

    return <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} >
        <Paginator currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize} />

        <div className={styles.gridContainer} >
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



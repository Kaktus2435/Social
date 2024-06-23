import React from "react";
import Paginator from "../common/paginator/Pagination.tsx";
import User from "./User.tsx";
import { UserType } from "../../types/types.ts";
import { UsersSearchForm } from "./UsersSearchForm.tsx";
import { FilterType } from "../redux/usersPageReducer.ts";

type PropsType = {
    currentPage: number
    onPageChanged: (pages: number) => void
    totalUsersCount: number
    pageSize: number
    users : Array<UserType>
    followingInProgress: Array<number>
    unfollow: (id: number) => void 
    follow: (id: number) => void
    onFilterChanged: (filter: FilterType) => void
}

const Users:React.FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {

    return <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged} />
        <Paginator currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize} />

        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow}
                    key={u.id}
                />)
            }
        </div>
    </div>

}

export default Users;
import React from "react";
import Paginator from "../common/paginator/Pagination";
import User from "./User";




const Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {

    return <div>
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
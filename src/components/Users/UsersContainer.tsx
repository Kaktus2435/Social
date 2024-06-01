import { useSelector } from "react-redux";
import React from "react";
//@ts-ignore
import preloader from "../img/Dual Ring-1s-200px.svg";
import {
    getIsFetching
    } from "../redux/users-selectors.ts";
import { Users } from "./Users.tsx";

type UsersPagePropsType = {
  
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <img src={preloader} alt="preloader" /> : null}

        <Users />
    </>
}


/*
class UsersContainer extends React.Component<PropsType> {

     componentDidMount() {
        const { currentPage, pageSize, filter } = this.props
        this.props.getUsers(currentPage, pageSize, filter)

In loc de componentDidMount folosim useEffect.
    }
 
    onPageChanged = (pageNumber) => {
        const { pageSize, filter } = this.props
        this.props.getUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const { pageSize } = this.props
        this.props.getUsers(1, pageSize, filter)

    }


    render() {
        return <>
            {this.props.isFetching ? <img src={preloader} alt="preloader" /> : null}

            <Users
                //currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                //pageSize={this.props.pageSize}
                // totalUsersCount={this.props.totalUsersCount}
                onFilterChanged={this.onFilterChanged}

            />
        </>
    }
}
 const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
 
 const mapStateToProps = (state) => {
    console.log("mapStateToProps")
    return {
        users: getUserSuperSelector(state),
        //users: getUsers(state),
daca inainte aveam nevoie de connect si in mapStateToProps trimeteam ceva, acum utilizam useSelector 
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)

    }
}
// let AuthRedirectComponent = withAuthRedirect(UsersContainer)

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps,
        { follow, unfollow, getUsers: requestUsers })
)(UsersContainer);

 */


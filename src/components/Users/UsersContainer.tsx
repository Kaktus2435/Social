import { connect } from "react-redux";
import {
    follow, unfollow, requestUsers
} from "../redux/usersPageReducer.ts";
import Users from "./Users.tsx";
import React from "react";
import preloader from "../img/Dual Ring-1s-200px.svg";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUserSuperSelector } from "../redux/users-selectors.js";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.js";
import { UsersType } from "../../types/types.ts";

type PropsType = {
    currentPage: number
    pageSize: number
    requestUsers: (currentPage: number, pageSize: number) => void
    isFetching: boolean
    unfollow: (id: number) => void
    follow: (id: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    totalUsersCount: number
} 

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} =this.props
        this.props.requestUsers(pageNumber, pageSize)
    }

    render() {
        console.log("render");
        return <>
            {this.props.isFetching ? <img src={preloader} alt="preloader" /> : null}
            <Users currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
               

            />
        </>
    }
}
// const mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,

const mapStateToProps = (state) => {
    console.log("mapStateToProps")
    return {
        users: getUserSuperSelector(state),
        // users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),


    }
}
// let AuthRedirectComponent = withAuthRedirect(UsersContainer)

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,
        { follow, unfollow, requestUsers })
)(UsersContainer);



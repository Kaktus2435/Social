import { connect } from "react-redux";
import {
    follow, unfollow, requestUsers,
    FilterType
} from "../redux/usersPageReducer.ts";
import Users from "./Users.tsx";
import React from "react";
//@ts-ignore
import preloader from "../img/Dual Ring-1s-200px.svg";
import { compose } from "redux";
import { 
    getCurrentPage, getFollowingInProgress, getIsFetching, 
    getPageSize, getTotalUsersCount, getUserSuperSelector 
 } from "../redux/users-selectors.ts";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { UserType } from "../../types/types.ts";

type PropsType = {
    currentPage: number
    pageSize: number
    getUsers: (currentPage: number, pageSize: number, term: string) => void
    isFetching: boolean
    unfollow: (id: number) => void
    follow: (id: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    totalUsersCount: number
    
} 

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize, '')
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} =this.props
        this.props.getUsers(pageNumber, pageSize, '')
    }
 
    onFilterChanged = (filter: FilterType) => {
        const {pageSize, currentPage} = this.props
        this.props.getUsers(currentPage, pageSize, filter.term)
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
                onFilterChanged={this.onFilterChanged}

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

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps,
        { follow, unfollow, getUsers: requestUsers })
)(UsersContainer);



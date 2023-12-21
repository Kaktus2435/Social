import { connect } from "react-redux";
import {
<<<<<<< HEAD
    follow, unfollow, requestUsers
=======
    follow, unfollow, getUsers
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
} from "../redux/usersPageReducer";
import Users from "./Users";
import React from "react";
import preloader from "../img/Dual Ring-1s-200px.svg";
<<<<<<< HEAD
import { compose } from "redux";
import { withRouter } from "../utils/withRouter/withRouter";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../redux/users-selectors";
=======
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7



class UsersContainer extends React.Component {

    componentDidMount() {
<<<<<<< HEAD
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
=======
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
    }

    render() {
        return <>
            {this.props.isFetching ? <img src={preloader} alt="preloader" /> : null}
            <Users currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
<<<<<<< HEAD

=======
                
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
            />
        </>
    }
}
<<<<<<< HEAD

// const mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,


//     }
// }
const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),


=======
 
const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        
        
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
    }
}
// let AuthRedirectComponent = withAuthRedirect(UsersContainer)

export default compose(
<<<<<<< HEAD
    withRouter,
    connect(mapStateToProps,
        { follow, unfollow, requestUsers })
)(UsersContainer);
=======
    withAuthRedirect,
    connect(mapStateToProps,
        { follow, unfollow, getUsers })
 ) (UsersContainer);
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7



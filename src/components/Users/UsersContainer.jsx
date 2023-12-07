import { connect } from "react-redux";
import {
    follow, unfollow, getUsers
} from "../redux/usersPageReducer";
import Users from "./Users";
import React from "react";
import preloader from "../img/Dual Ring-1s-200px.svg";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";



class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
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
        
        
    }
}
// let AuthRedirectComponent = withAuthRedirect(UsersContainer)

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,
        { follow, unfollow, getUsers })
 ) (UsersContainer);



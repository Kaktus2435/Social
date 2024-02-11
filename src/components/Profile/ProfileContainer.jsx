import Profile from "./Profile";
import { addPost, getUsersProfile, getStatus, updateStatus, savePhoto } from "../redux/profilePageReducer";
import { connect } from "react-redux";
import React from "react";
import { withAuthRedirect } from './../../hoc/withAuthRedirect.js';
import { withRouter } from './../utils/withRouter/withRouter.js';
import { compose } from "redux";


class ProfileContainer extends React.Component {

    refreshProfile() {
        let profileId = this.props.router.params.profileId;
        if (!profileId) {
            profileId = this.props.authorizedUserId;
            if (!profileId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUsersProfile(profileId);
        this.props.getStatus(profileId);
    }

    componentDidMount() {
        
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.profileId !== prevProps.router.params.profileId) {

            this.refreshProfile()
        }
    }
    render() {

        return <>
            <Profile profilePage={this.props.profilePage}
                isOwner={!this.props.router.params.profileId}
                savePhoto={this.props.savePhoto}
                addPost={this.props.addPost}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        </>
    }



}

let mapStateToProps = (state) => {

    return {
        profilePage: state.profilePage,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        updateStatus: state.profilePage.updateStatus,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    withAuthRedirect, withRouter,
    connect(mapStateToProps,
        { addPost, getUsersProfile, getStatus, updateStatus, savePhoto })
)(ProfileContainer);

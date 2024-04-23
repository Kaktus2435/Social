import Profile from "./Profile.tsx";
import { addPost, getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../redux/profilePageReducer.ts";
import { connect } from "react-redux";
import React from "react";
import { withAuthRedirect } from '../../hoc/withAuthRedirect.js';
import { withRouter } from '../utils/withRouter/withRouter.js';
import { compose } from "redux";
import { AppStateType } from "../redux/redux.store.ts";
import { getAuthorizedUserId, getProfile, getProfilePage, getStatusSelector, getUpdateStatus, getisAuth } from "../redux/profile-selectors.ts";


type MapStatePropsType = {
       
}

type MapDispatchPropsType = {
       getUsersProfile: (profileId: number) => void
       getStatus: (profileId: number) => void
       router: any
       history: any
       authorizedUserId: (profileId: number) => void
    }


type PropsType = MapStatePropsType & MapDispatchPropsType



class ProfileContainer extends React.Component<PropsType> {

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
                saveProfile={this.props.saveProfile}
            />
        </>
    }



}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {

    return {
        profilePage: getProfilePage(state),
        profile: getProfile(state),
        status: getStatusSelector(state),
        updateStatus: getUpdateStatus(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuth: getisAuth(state)
    }
}

export default compose(
    withAuthRedirect, withRouter,
    connect(mapStateToProps,
        { addPost, getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile })
)(ProfileContainer);

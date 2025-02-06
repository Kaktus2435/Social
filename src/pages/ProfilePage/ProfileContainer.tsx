import Profile from "./Profile.tsx";
import { getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../components/redux/profilePageReducer.ts";
import { connect } from "react-redux";
import React from "react";
import { withAuthRedirect } from '../../hoc/withAuthRedirect.tsx';
import { withRouter } from '../../components/utils/withRouter/withRouter.tsx';
import { compose } from "redux";
import { AppStateType } from "../../components/redux/redux.store.ts";
import { getAuthorizedUserId, getProfile, getProfilePage, getStatusSelector, getUpdateStatus, getIsAuth } from "../../components/redux/profile-selectors.ts";
import { PhotosType, ProfilePageType, ProfileType } from "../../types/types.ts";


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUsersProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (files: PhotosType) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    history: any
}

type ProfilePropsType = {
    profilePage: ProfilePageType
    profileId: number
    addPost: (myNewPost: string) => void
    profile: ProfileType
    status: string
    saveProfile: ProfileType
}

type PathParamsType = {
    userId: string
    
}

type PropsType = MapPropsType & DispatchPropsType & PathParamsType & ProfilePropsType ;


class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                // todo: may be replace push with Redirect??
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUsersProfile(userId);
            this.props.getStatus(userId);
            }
    }
    componentDidMount() {
        
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {

            this.refreshProfile()
        }
    }
    render() {

        return <>
            <Profile profilePage={this.props.profilePage}
                isOwner={!this.props.router.params.userId}
                savePhoto={this.props.savePhoto}
                
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                saveProfile={this.props.saveProfile}
            />
        </>
    }



}

let mapStateToProps = (state: AppStateType) => {

    return {
        profilePage: getProfilePage(state),
        profile: getProfile(state),
        status: getStatusSelector(state),
        updateStatus: getUpdateStatus(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuth: getIsAuth(state)
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect, withRouter,  
    connect(mapStateToProps,
        { getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile })
)(ProfileContainer);

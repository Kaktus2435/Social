import Profile from "./Profile";
import { addPost, getUsersProfile, getStatus, updateStatus } from "../redux/profilePageReducer";
import { connect } from "react-redux";
import React from "react";
import {withAuthRedirect} from './../../hoc/withAuthRedirect.js';



import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom"
import { compose } from "redux";


class ProfileContainer extends React.Component {



    componentDidMount() {
        let profileId = this.props.router.params.profileId;
        if (!profileId) {
            profileId = 29925;
        }
        this.props.getUsersProfile(profileId);
        this.props.getStatus(profileId);
    }

    render() {
        return <>
            <Profile profilePage={this.props.profilePage}
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
        updateStatus: state.profilePage.updateStatus
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}




 export default compose(
    connect(mapStateToProps,
        { addPost, getUsersProfile, getStatus, updateStatus }), withAuthRedirect) (withRouter(ProfileContainer));
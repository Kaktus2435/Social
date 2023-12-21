import Profile from "./Profile";
import { addPost, getUsersProfile, getStatus, updateStatus } from "../redux/profilePageReducer";
import { connect } from "react-redux";
import React from "react";
<<<<<<< HEAD
import { withAuthRedirect } from './../../hoc/withAuthRedirect.js';
import  {withRouter}  from './../utils/withRouter/withRouter.js';
=======
import {withAuthRedirect} from './../../hoc/withAuthRedirect.js';



import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom"
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
import { compose } from "redux";


class ProfileContainer extends React.Component {



    componentDidMount() {
        let profileId = this.props.router.params.profileId;
        if (!profileId) {
<<<<<<< HEAD
            profileId = this.props.authorizedUserId;
             if (!profileId) {
                this.props.history.push('/login')
             }
=======
            profileId = 29925;
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
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
<<<<<<< HEAD
        updateStatus: state.profilePage.updateStatus,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    withAuthRedirect, withRouter,
    connect(mapStateToProps,
        { addPost, getUsersProfile, getStatus, updateStatus })
 ) (ProfileContainer);
=======
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
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7

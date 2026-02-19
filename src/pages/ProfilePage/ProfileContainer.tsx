import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Profile from "./Profile.tsx";

import { 
    getUsersProfile, 
    getStatus, 
    updateStatus, 
    savePhoto, 
    saveProfile 
} from "../../components/redux/profilePageReducer.ts";

import { 
    getProfile, 
    getStatusSelector, 
    getProfilePage, 
    getAuthorizedUserId 
} from "../../components/redux/profile-selectors.ts";
import { AppDispatch } from "../../components/redux/redux.store.ts";
import Preloader from "../../components/utils/preloader/Preloader.jsx";

type PropsType = {

}

const ProfileContainer: React.FC<PropsType> = (props) => {
    const dispatch: AppDispatch = useDispatch();
    const params = useParams<{ userId: string }>();
    const navigate = useNavigate();

    const profile = useSelector(getProfile);
    const status = useSelector(getStatusSelector);
    const profilePage = useSelector(getProfilePage);
    const authorizedUserId = useSelector(getAuthorizedUserId);

    const refreshProfile = useCallback(() => {
        let userId: number | null = params.userId ? Number(params.userId) : null;

        if (!userId) {
            userId = authorizedUserId;
            if (!userId) {
                navigate("/login");
                return;
            }
        }

        dispatch(getUsersProfile(userId));
        dispatch(getStatus(userId));
    }, [params.userId, authorizedUserId, navigate, dispatch]);

    useEffect(() => {
        refreshProfile();
    }, [refreshProfile]);

if (!profile) {
    return <Preloader />
}

    return (
        <Profile 
            profilePage={profilePage}
            isOwner={!params.userId}
            profile={profile}
            status={status}
            savePhoto={(file: any) => dispatch(savePhoto(file))}
            updateStatus={(status: string) => dispatch(updateStatus(status))}
            saveProfile={(profile: any) => dispatch(saveProfile(profile))}
        />
    );
};

export default ProfileContainer;
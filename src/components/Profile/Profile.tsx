import React, { useState } from "react";
// @ts-ignore
import defaultAvatar from '../img/Basic_Ui_(186).jpg'
import ProfileStatusWithHooks from './profileStatus/ProfileStatusWithHooks.tsx';
import styles from './Profile.module.css';
import ProfileDataForm from './ProfileInfo/Profile.Data.Form.tsx';
import Preloader from "../utils/preloader/Preloader.jsx";
import { PhotosType, ProfilePageType, ProfileType } from "../../types/types.js";
import ProfileData from "./ProfileInfo/ProfileInfo.tsx";
import MyPostsContainer from "./MyPosts/MyPostsContainer.tsx";


type PropsType = {
    profile: ProfileType
    profilePage: ProfilePageType
    isOwner: boolean
    saveProfile: any

    status: string
    updateStatus: (status: string) => void

    savePhoto: (files: PhotosType) => void
}

const Profile: React.FC<PropsType> = ({ profile, isOwner, profilePage, savePhoto, saveProfile, status, updateStatus }) => {
    const [editMode, setEditMode] = useState(false);
    const goToEditMode = () => { setEditMode(true) };


    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (FormData: ProfileType) => {
        saveProfile(FormData);
        setEditMode(false);
    }

    return (
        <>
            <img className={styles.defaultAvatar} src={profile.photos.large == null ? defaultAvatar : profile.photos.large} alt="photos" />
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}

            {editMode
                ? <ProfileDataForm
                    profile={profile}
                    onSubmit={onSubmit}
                    initialValues={profile}
                />
                : <ProfileData profile={profile}
                    goToEditMode={goToEditMode}
                    isOwner={isOwner}
                />}


            <div className="">
                <div>

                    <ProfileStatusWithHooks
                        // @ts-ignore
                        status={status}
                        updateStatus={updateStatus} />

                      <MyPostsContainer />
                </div>
            </div>
        </>
    );
}

// const ProfileDataForm = ( {isOwner, goToEditMode} ) => {
//     return (
//         <div>
//           <div> {isOwner && <button onClick={goToEditMode}> Stop editing</button>}</div>
//         </div>
//     )
// }

export default Profile;
import React, { useState } from "react";
import defaultAvatar from '../../img/Basic_Ui_(186).jpg'
import ProfileStatusWithHooks from './profileStatus/ProfileStatusWithHooks.tsx';
import styles from './Profile.module.css';
import ProfileDataForm from './ProfileInfo/Profile.Data.Form.tsx';
import Preloader from "../../components/utils/preloader/Preloader.jsx";
import { PhotosType, ProfilePageType, ProfileType } from "../../types/types.js";
import ProfileData from "./ProfileInfo/ProfileInfo.tsx";
import { CameraOutlined } from '@ant-design/icons';


type PropsType = {
    profile: ProfileType
    profilePage: ProfilePageType
    isOwner: boolean
    saveProfile: any

    status: string
    updateStatus: (status: string) => void

    savePhoto: (files: PhotosType) => void
}

const Profile: React.FC<PropsType> = ({ profile, isOwner, savePhoto, saveProfile, status, updateStatus }) => {


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
        <div className={styles.profile}>
            <div className={`${styles.leftContainer} ${styles.container}`}>
                <div className={styles.photoWrapper} >
                    <img
                        className={styles.photo}
                        src={profile.photos.large == null ? defaultAvatar : profile.photos.large}
                        alt="photos"
                    />
                </div>
                <div className={styles.photoUploadContainer}>
                    <input
                        className={styles.photoUpload}
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={onMainPhotoSelected}
                    />
                    <label htmlFor="fileInput" className={styles.uploadLabel}>
                        <CameraOutlined style={{ color: "gray" }} />
                    </label>
                </div>
                <div className={styles.statusContainer} >
                    <ProfileStatusWithHooks
                        status={status}
                        updateStatus={updateStatus} />
                </div>
            </div>
        <div className={`${styles.rightContainer} ${styles.container}`}>
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
                    
            </div>
            
        </div>
    );
}

export default Profile;
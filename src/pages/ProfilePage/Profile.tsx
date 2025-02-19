import React, { useState } from "react";
import defaultAvatar from '../../img/Basic_Ui_(186).jpg'
import ProfileStatusWithHooks from './profileStatus/ProfileStatusWithHooks.tsx';
import styles from './Profile.module.css';
import ProfileDataForm from './ProfileInfo/Profile.Data.Form.tsx';
import Preloader from "../../components/utils/preloader/Preloader.jsx";
import { PhotosType, ProfilePageType, ProfileType } from "../../types/types.js";
import PrimaryInformation from "./ProfileInfo/PrimaryInformation.tsx";
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import SecondaryInformation from "./ProfileInfo/SecondaryInformation.tsx";
import { Card } from "antd";


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
            <div className={styles.topLevel} >
                <div className={styles.photoContainer}>
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
                            <VerticalAlignBottomOutlined className={styles.cameraOutlander} />
                            <h6>Upload img.</h6>
                        </label>
                    </div>
                </div>

                <div style={{ width: '80%', display: "flex", justifyContent: "center" }} >
                    <Card variant="borderless" title=<h2 style={{opacity: "0.8"}} >Status</h2> 
                        style={{ width: "auto", fontFamily: "cursive"}}>
                        
                    <ProfileStatusWithHooks
                            status={status}
                            updateStatus={updateStatus} />
                    </Card>
                </div>

            </div>
            <div style={{ width: "100%" }} >
                {editMode
                    ? <ProfileDataForm
                        profile={profile}
                        onSubmit={onSubmit}
                        initialValues={profile}
                    />
                    : <div className={styles.info} >
                        <PrimaryInformation
                            profile={profile}
                            goToEditMode={goToEditMode}
                            isOwner={isOwner}
                        />
                        <SecondaryInformation
                            profile={profile} />
                    </div>}
            </div>
        </div>
    );
}

export default Profile;
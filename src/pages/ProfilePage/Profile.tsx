import React, { useState } from "react";
import defaultAvatar from '../../img/Basic_Ui_(186).jpg'
import ProfileStatusWithHooks from './profileStatus/ProfileStatusWithHooks.tsx';
import styles from './Profile.module.css';
import ProfileDataForm from './ProfileInfo/Profile.Data.Form/Profile.Data.Form.tsx';
import Preloader from "../../components/utils/preloader/Preloader.jsx";
import { PhotosType, ProfilePageType, ProfileType } from "../../types/types.js";
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Card } from "antd";
import ProfileInfoRight from "./ProfileInfo/ProfileInfoRight/ProfileInfoRight.tsx";
import ProfileInfoLeft from "./ProfileInfo/ProfileInfoLeft/ProfileInfoLeft.tsx";
import Contact from "./ProfileInfo/Contact/Contact.tsx";


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
            <div className={styles.firstContainer} >
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
                        {isOwner &&
                            <label htmlFor="fileInput" className={styles.uploadLabel}>
                                <VerticalAlignBottomOutlined className={styles.cameraOutlander} />
                                <h4>Upload img.</h4>
                            </label>
                        }
                        <div style={{height:"20px"}} ></div>
                    </div>
                </div>

                {editMode
                    ? <></>
                    :

                    <ProfileInfoLeft
                        profile={profile}
                        goToEditMode={goToEditMode}
                        isOwner={isOwner}
                    />
                }
            </div>

            <div className={styles.secondContainer} >
                <div className={styles.statusCardContainer}>
                    <Card className={styles.statusCard}
                        title=<h1 style={{ opacity: "0.8" }} >Status</h1>>
                        <ProfileStatusWithHooks
                            status={status}
                            updateStatus={updateStatus}
                            isOwner={isOwner}
                        />

                    </Card>
                </div>

                {editMode
                    ? <ProfileDataForm
                        profile={profile}
                        onSubmit={onSubmit}
                        initialValues={profile}
                    />
                    : <div className={styles.info} >
                        <ProfileInfoRight
                            profile={profile}
                        />
                    </div>}

            </div>
            {editMode
                ? <div className={styles.boxForEditMod} ></div>
                :
                <div className={styles.contacts} >
                    {Object.keys(profile.contacts || {}).map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                    })}
                </div>
            }
        </div>
    );
}

export default Profile;
import React, { useState } from "react";
import Post from "./post/Post.jsx";
// @ts-ignore
import defaultAvatar from '../img/Basic_Ui_(186).jpg'
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../utils/validators/validators.ts'
import { Textarea } from "../common/forms/FormsControls.tsx";
import ProfileStatusWithHooks from './profileStatus/ProfileStatusWithHooks.jsx';
import styles from './Profile.module.css';
import ProfileDataForm from './Profile.Data.Form.tsx';
import Preloader from "../utils/preloader/Preloader.jsx";
import { PhotosType, ProfilePageType, ProfileType } from "../../types/types.js";


type PropsType = {
    profile: ProfileType
    profilePage: ProfilePageType
    isOwner: boolean
    saveProfile: any

    status: string
    updateStatus: string

    addPost: (myNewPost: string) => void
    savePhoto: (files: PhotosType) => void
}

const Profile: React.FC<PropsType> = ({ profile, addPost, isOwner, profilePage, savePhoto, saveProfile, status, updateStatus }) => {
    const [editMode, setEditMode] = useState(false);
    const goToEditMode = () => { setEditMode(true) };


    if (!profile) {
        return <Preloader />
    }

    const postsElements = profilePage.posts
        .map(p => <Post name={p.name} post={p.post} key={p.id} />)

    const onPostChange = (value: any) => {
        addPost(value.myNewPost);
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (FormData) => {
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

                    <ProfileReduxForm onSubmit={onPostChange} />
                    {postsElements}

                </div>
            </div>
        </>
    );
}

const Contact = ({ contactTitle, contactValue }) => {
    return <div>
        <b className={styles.contactTitle}>{contactTitle}</b>: {contactValue} {contactValue ? '.' : ''}
    </div>
}

const ProfileData = ({ profile, goToEditMode, isOwner }) => {
    return (
        <div>
            <div> {isOwner && <button onClick={goToEditMode}>Edit</button>}</div>
            <div><b>Full name</b>: {profile.fullName}.</div>
            <div> <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}. </div>
            {profile.lookingForAJob &&
                <div> <b>My professional skills</b>: {profile.lookingForAJobDescription} </div>
            }
            <div>{profile.aboutMe}</div>
            <div> <b>User ID</b>: {profile.userId}.</div>
            <div> <b>Contacts</b>:  {Object.keys(profile.contacts || {}).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })
            }</div>

        </div>
    )
}


// const ProfileDataForm = ( {isOwner, goToEditMode} ) => {
//     return (
//         <div>
//           <div> {isOwner && <button onClick={goToEditMode}> Stop editing</button>}</div>
//         </div>
//     )
// }

const maxLength10 = maxLengthCreator(10);
const ProfileForm = (props) => {
    return (

        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="myNewPost" placeholder="Post"
                validate={[required, maxLength10]} />
            <button>Add Post</button>
        </form>
    )
}

const ProfileReduxForm = reduxForm({ form: "AddPostForm" })(ProfileForm)

export default Profile;
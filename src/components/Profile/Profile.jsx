import React, { useState } from "react";
import Post from "././post/Post";
import preloader from '../img/Dual Ring-1s-200px.svg'
import defaultAvatar from '../img/Basic_Ui_(186).jpg'
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../utils/validators/validators'
import { Textarea } from "../common/forms/FormsControls.js";
import ProfileStatusWithHooks from './profileStatus/ProfileStatusWithHooks.jsx';
import styles from './Profile.module.css';
import ProfileDataForm from './Profile.Data.Form.jsx';



const Profile = (props) => {
    const [editMode, setEditMode] = useState(false);
    const goToEditMode = () => { setEditMode(true) };
    const profile = props.profile;
    const state = props.profilePage;
    const isOwner = props.isOwner


    if (!props.profile) {
        return <img src={preloader} alt="" />
    }

    const postsElements = state.posts
        .map(p => <Post name={p.name} post={p.post} key={p.id} />)

    const onPostChange = (value) => {
        props.addPost(value.myNewPost);
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (FormData) => {
        console.log(FormData);
    }

    return (
        <>
            <img className={styles.defaultAvatar} src={profile.photos.large == null ? defaultAvatar : profile.photos.large} alt="photos" />
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}

            {editMode
                ? <ProfileDataForm profile={profile}
                    goToEditMode={goToEditMode}
                    isOwner={isOwner}
                    onSubmit={onSubmit}

                />
                : <ProfileData profile={profile}
                    goToEditMode={goToEditMode}
                    isOwner={isOwner}
                />}


            <div className="">
                <div>

                    <ProfileStatusWithHooks
                        status={props.status}
                        updateStatus={props.updateStatus} />

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
            <div> <b>Looking for a job lookingForAJob</b>: {profile.lookingForAJob ? 'Yes' : 'No'}. </div>
            {profile.lookingForAJob &&
                <div> <b>My professional skills</b>: {profile.lookingForAJobDescription} </div>
            }
            <div>{profile.aboutMe}</div>
            <div> <b>User ID</b>: {profile.userId}.</div>
            <div> <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}.</div>

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
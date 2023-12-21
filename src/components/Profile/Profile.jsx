import React from "react";
import Post from "././post/Post";
import preloader from '../img/Dual Ring-1s-200px.svg'
import ProfileStatus from "./profileStatus/ProfileStatus";
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../utils/validators/validators'
import { Textarea } from "../utils/forms/FormsControls";


const Profile = (props) => {
    const state = props.profilePage
    

    if (!props.profile) {
        return <img src={preloader} alt="" />
    }

    const postsElements = state.posts
        .map(p => <Post name={p.name} post={p.post} key={p.id} />)

    const onPostChange = (value) => {
        props.addPost(value.myNewPost);
    }


    return (
        <>
            <div>{props.profile.aboutMe}</div>
            <div>{props.profile.contacts.instagram}</div>
            <div>{props.profile.contacts.facebook}</div>
            <div>{props.profile.lookingForAJob}</div>
            <div>{props.profile.lookingForAJobDescription}</div>
            <div>{props.profile.fullName}</div>
            <div>{props.profile.userId}</div>
            <img src={props.profile.photos.large == null ? preloader : props.profile.photos.large} alt="photos" />

            <div className="">
                {postsElements}
                <div>
                <ProfileReduxForm onSubmit={onPostChange}/>
                    <ProfileStatus

                        status={props.status}
                        updateStatus={props.updateStatus} />

                </div>
            </div>
        </>
    );
}

const maxLength10 = maxLengthCreator(10);
const ProfileForm = (props) => {
    return (

        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="myNewPost" placeholder="Post" 
            validate={[required, maxLength10 ]} />
            <button>Add Post</button>
        </form>
    )
}

const ProfileReduxForm = reduxForm({form:"AddPostForm"}) (ProfileForm)

export default Profile;
import React from "react"
import styles from "../Profile.module.css"

const Contact = ({ contactTitle, contactValue }) => {
    return <div>
        <b className={styles.contactTitle}>{contactTitle}</b>: {contactValue} 
    </div>
}
const ProfileData = ({ profile, goToEditMode, isOwner }) => {
    return (
        <div className={styles.wrapper_profileData}>
            <div> {isOwner && <button className={styles.button_profileData} onClick={goToEditMode}>Edit profile</button>}</div>
            <div><b>Full name</b>: {profile.fullName}</div>
            <div> <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
            {profile.lookingForAJob &&
                <div> <b>My professional skills</b>: {profile.lookingForAJobDescription} </div>
            }
            <div>{profile.aboutMe}</div>
            <div> <b>User ID</b>: {profile.userId}</div>
            <div> <b>Contacts</b>:  {Object.keys(profile.contacts || {}).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })
            }</div>

        </div>
    )
}

export default ProfileData
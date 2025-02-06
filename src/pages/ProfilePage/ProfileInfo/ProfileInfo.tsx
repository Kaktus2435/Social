import React from "react"
import styles from "../Profile.module.css"
import CustomButton from "../../../components/buttons/CustomButton.tsx"
import Contact from "./Contact.tsx"




const ProfileData = ({ profile, goToEditMode, isOwner }) => {
    return (
        <div className={styles.wrapperProfileData}>
            <div> {isOwner && 
            <CustomButton onClick={goToEditMode} text="EditProfile" />}
                </div>
            <div><b>Full name</b>: {profile.fullName}</div>
            <div> <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
            {profile.lookingForAJob &&
                <div> <b>My professional skills</b>: {profile.lookingForAJobDescription} </div>
            }
            <div>{profile.aboutMe}</div>
            <div> <b>User ID</b>: {profile.userId}</div>
            <div style={{display: "flex"}} > <b>Contacts</b>:{Object.keys(profile.contacts || {}).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })
            }</div>

        </div>
    )
}

export default ProfileData
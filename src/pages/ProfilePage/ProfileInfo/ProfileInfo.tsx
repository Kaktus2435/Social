import React from "react"
import styles from "./ProfileInfo.module.css"
import CustomButton from "../../../components/buttons/CustomButton.tsx"
import Contact from "./Contact.tsx"




const ProfileData = ({ profile, goToEditMode, isOwner }) => {
    return (
        <div>
            <div className={styles.notebookPage}>
                <span className={styles.notebookLine}>
                    <div className={styles.text} >
                        <p className={styles.textKey} >Full name:</p><b className={styles.textValue}>{profile.fullName}</b>
                    </div>
                </span>
                <span className={styles.notebookLine}>
                    <div className={styles.text} >
                        <p className={styles.textKey} >Looking for a job:</p><b className={styles.textValue}>{profile.lookingForAJob ? 'Yes' : 'No'}</b>
                    </div>
                </span>
                <span className={styles.notebookLine}>
                    {profile.lookingForAJob &&
                        <div className={styles.text} >
                            <p className={styles.textKey} >My professional skills:</p><b className={styles.textValue}>{profile.lookingForAJobDescription}</b>
                        </div>
                    }
                </span>
                <span className={styles.notebookLine}>
                    <div className={styles.text} >
                        <p className={styles.textKey} >About Me:</p><b className={styles.textValue}>{profile.aboutMe}</b>
                    </div>
                </span>
                <span className={styles.notebookLine}>
                    <div className={styles.text} >
                        <p className={styles.textKey} >User ID:</p><b className={styles.textValue}>{profile.userId}</b>
                    </div>
                </span>
                <span className={styles.notebookLine}>

                    <div className={styles.contacts} >
                        {Object.keys(profile.contacts || {}).map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />})}
                    </div>
                </span>
            </div>
            
            <div className={styles.containerEditMode} > {isOwner &&
                    <CustomButton onClick={goToEditMode} text="Edit Profile" />}
                </div>
        </div>
    )
}

export default ProfileData
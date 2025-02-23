import React from "react"
import styles from "./ProfileInfoLeft.module.css"
import CustomButton from "../../../../components/buttons/CustomButton.tsx"

const ProfileInfoLeft = ({ profile, goToEditMode, isOwner }) => {
    
    return (
        <div className={styles.container} >
            <span>
                <div className={styles.textData} >
                    <h4 className={styles.labelText} >Full name:</h4>
                    <h2 className={styles.valueText} >{profile.fullName}</h2>
                    <div className={styles.lineDesign}></div>
                </div>

                <span>
                    <div className={styles.textData} >
                        <h4 className={styles.labelText} >Looking for a job:</h4>
                        <h3 className={styles.valueText} >{profile.lookingForAJob ? 'Yes' : 'No'}</h3>
                        <div className={styles.lineDesign}></div>

                    </div>
                </span>
                <div className={styles.textData} >
                    <h4 className={styles.labelText} >User ID:</h4>
                    <h3 className={styles.valueText} >{profile.userId}</h3>
                </div>
            </span>
            <div className={styles.editModeButton} > {isOwner &&
                <CustomButton onClick={goToEditMode} text="Edit Profile" />}
            </div>
        </div>
    )
}

export default ProfileInfoLeft
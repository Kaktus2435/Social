import React from "react"
import styles from "./ProfileInfo.module.css"

const SecondaryInformation = ({ profile }) => {
    return (
        <div>
            <div>
                <span>
                    <div className={styles.textData} >
                        <p>Full name:</p><b>{profile.fullName}</b>
                    </div>
                </span>
                <span>
                <span>
                    <div className={styles.textData} >
                        <p>Looking for a job:</p><b>{profile.lookingForAJob ? 'Yes' : 'No'}</b>
                    </div>
                </span>
                    <div className={styles.textData} >
                        <p >User ID:</p><b>{profile.userId}</b>
                    </div>
                </span>
            </div>
            
        </div>
    )
}

export default SecondaryInformation
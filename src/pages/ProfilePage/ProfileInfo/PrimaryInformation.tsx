import React from "react"
import styles from "./ProfileInfo.module.css"
import CustomButton from "../../../components/buttons/CustomButton.tsx"
import Contact from "./Contact.tsx"
import { Card } from "antd"

const PrimaryInformation = ({ profile, goToEditMode, isOwner }) => {
    return (
        <div>
            <div className={styles.containerEditMode} > {isOwner &&
                <CustomButton onClick={goToEditMode} text="Edit Profile" />}
            </div>
            <div style={{display: "flex"}} >
                <div style={{ width: "40vw" }} >
                    <Card title="About Me" variant="borderless" style={{ width: 300 }}>
                        <p>{profile.aboutMe}</p>
                    </Card>
                </div>
        
                    {profile.lookingForAJob &&
                        <Card title="My professional skills" variant="borderless" style={{ width: 300 }}>
                            <p>{profile.lookingForAJobDescription}</p>
                        </Card>
                    }

                    </div>  
                    <div className={styles.contacts} >
                        {Object.keys(profile.contacts || {}).map(key => {
                            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                        })}
            </div>
        </div>
    )
}

export default PrimaryInformation
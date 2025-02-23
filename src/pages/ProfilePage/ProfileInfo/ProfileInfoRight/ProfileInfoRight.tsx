import React from "react"
import styles from "./ProfileInfoRight.module.css"
import CustomButton from "../../../../components/buttons/CustomButton.tsx"
import Contact from "../Contact/Contact.tsx"
import { Card } from "antd"

const ProfileInfoRight = ({ profile }) => {
    return (
        <div className={styles.container} >
            <div className={styles.infoCards} >
                
                    <Card className={styles.firstCard}
                        title=<h3 style={{ opacity: "0.8" }} >About me</h3>>
                        <p style={{opacity: "0.5"}} >{profile.aboutMe}</p>
                    </Card>
                

                {profile.lookingForAJob &&
                    <Card className={styles.secondCard} 
                        title=<h3 style={{ opacity: "0.8" }}>My professional skills</h3>>
                        <p style={{opacity: "0.5"}} >{profile.lookingForAJobDescription}</p>
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

export default ProfileInfoRight
import React from "react"
import styles from "./ProfileInfoRight.module.css"
import { Card } from "antd"
import { useTranslation } from "react-i18next";

const ProfileInfoRight = ({ profile }) => {
const { t, i18n } = useTranslation('profile');

    return (
        <div className={styles.container} >
            <div className={styles.infoCards} >
                
                    <Card className={styles.firstCard}
                        title=<h3 style={{ opacity: "0.8" }} >{t("aboutMe")}</h3>>
                        <p style={{opacity: "0.5"}} >{profile.aboutMe}</p>
                    </Card>
                

                {profile.lookingForAJob &&
                    <Card className={styles.secondCard} 
                        title=<h3 style={{ opacity: "0.8" }}>{t("professionalSkills")}</h3>>
                        <p style={{opacity: "0.5"}} >{profile.lookingForAJobDescription}</p>
                    </Card>
                }

            </div>

        </div>
    )
}

export default ProfileInfoRight
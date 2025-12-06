import React from "react"
import styles from "./ProfileInfoLeft.module.css"
import CustomButton from '../common/buttons/CustomButton.tsx';
import { useTranslation } from "react-i18next";

const ProfileInfoLeft = ({ profile, goToEditMode, isOwner }) => {

const { t, i18n} = useTranslation('profile');

    return (
        <div className={styles.container} >
            <span>
                <div className={styles.textData} >
                    <h4 className={styles.labelText} >{t("fullName")}:</h4>
                    <h2 className={styles.valueText} >{profile.fullName}</h2>
                    <div className={styles.lineDesign}></div>
                </div>

                <span>
                    <div className={styles.textData} >
                        <h4 className={styles.labelText} >{t("lookingForJob")}:</h4>
                        <h3 className={styles.valueText} >{profile.lookingForAJob ? t("yes") : t("no")}</h3>
                        <div className={styles.lineDesign}></div>

                    </div>
                </span>
                <div className={styles.textData} >
                    <h4 className={styles.labelText} >{t("userID")}:</h4>
                    <h3 className={styles.valueText} >{profile.userId}</h3>
                </div>
            </span>
            <div className={styles.editModeButton} > {isOwner &&
                <CustomButton onClick={goToEditMode} text={t("editProfile")} />}
            </div>
        </div>
    )
}

export default ProfileInfoLeft
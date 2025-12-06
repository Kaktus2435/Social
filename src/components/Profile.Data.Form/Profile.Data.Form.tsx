import { InjectedFormProps, reduxForm } from "redux-form";
import { GetStringKeys, Input, Textarea, createField } from "../../components/common/forms/FormsControls.tsx";
import styles from './Profile.Data.Form.module.css';
import React from "react";
import { ProfileType } from "../../types/types.ts";
import CustomButton from "../common/buttons/CustomButton.tsx";
import { useTranslation } from "react-i18next";

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {

    const { t, i18n } = useTranslation('profile');

    return <form onSubmit={handleSubmit}>
        <div className={styles.container} >
            <div className={styles.containerPersonalData} >
                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>
                }
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >

                    <div className={styles.textBox} >
                        <b className={styles.labelText} >{t("fullName")}</b>: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input, { className: styles.valueInputText })}
                    </div>
                    <div className={styles.textBox} >
                        <b className={styles.labelText} >{t("lookingForJob")}</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox", className: styles.checkBox })}
                    </div>
                </div>

                <div className={styles.textBox} >
                    <b className={styles.labelText} >{t("professionalSkills")}</b>: <div>{t("setLookingForJob")}</div>
                    {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea, { className: styles.valueTextareaText })}

                </div>


                <div className={styles.textBox} >
                    <b className={styles.labelText} >{t("aboutMe")}</b>:
                    {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea, { className: styles.valueTextareaText })}

                </div>
            </div>
            <div className={styles.containerContacts} >
                <div>
                    <h2>{t('contacts')}:</h2>{Object.keys(profile.contacts).map(key => {
                        return <div key={key} className={styles.contact}>
                            <b>{key}: {createField(key, "contacts." + key, [], Input, { className: styles.valueInputText })}</b>

                        </div>
                    })}
                </div>
            </div>
            <CustomButton text={t('save')} />
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm;

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

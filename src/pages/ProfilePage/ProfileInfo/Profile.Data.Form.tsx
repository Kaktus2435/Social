import { InjectedFormProps, reduxForm } from "redux-form";
import { GetStringKeys, Input, Textarea, createField } from "../../../components/common/forms/FormsControls.tsx";
import styles from './Profile.Data.Form.module.css';
import React from "react";
import { ProfileType } from "../../../types/types.ts";
import CustomButton from "../../../components/buttons/CustomButton.tsx";

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div className={styles.container} >
            <div className={styles.containerPersonalData} >
                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>
                }
                <div>
                    <b>Full name</b>: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
                </div>
                <div>
                    <b>Looking for a job</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
                </div>

                <div>
                    <b>My professional skills</b>:
                    {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
                </div>


                <div>
                    <b>About me</b>:
                    {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
                </div>
            </div>
            <div className={styles.containerContacts} >
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                        return <div key={key} className={styles.contact}>
                            <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                        </div>
                    })}
                </div>
            </div>
            <CustomButton text="Save" />
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm;

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

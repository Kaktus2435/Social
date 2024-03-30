import { reduxForm } from "redux-form";
import { Input, Textarea, createField } from "../common/forms/FormsControls.tsx";
import styles from './Profile.module.css';
import React from "react";
import { ProfileType } from "../../types/types";

type PropsType = {
  handleSubmit: any
  profile: ProfileType
}

 const ProfileDataForm: React.FC<PropsType> = (props) => {
    return (
      <form onSubmit={props.handleSubmit}> 
      <div>
        <button>save</button>
        </div>
      <div>
        <b>Full name</b>: {createField("Full name", 'fullName', [], Input)}
        </div>
      <div> <b>Looking for a job.</b>: {props.profile.lookingForAJob ? 'Yes' : 'No'}
        {createField("", 'lookingForAJob', [], Input, {type: "checkbox"} )}
       </div>
      
          <div> 
            <b>My professional skills</b>: {props.profile.lookingForAJobDescription} 
            {createField("My professional skills", "lookingForAJobDescription", [], Textarea, )}
            </div>
      
      <div> 
            <b>About me</b>: {props.profile.aboutMe } 
            {createField("About me", "aboutMe", [], Textarea, )}
            </div>
      
      <div> <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
          return <div className={styles.contact}>
             {key}: {createField(key, 'contacts.' + key, [], Input)} </div>
      })}.</div>

  </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;
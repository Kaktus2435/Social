import { reduxForm } from "redux-form";
import { Input, Textarea, createField } from "../common/forms/FormsControls";
import styles from './Profile.module.css';

 const ProfileDataForm = ( {handleSubmit, profile} ) => {
    return (
      <form onSubmit={handleSubmit}> 
      <div>
        <button>save</button>
        </div>
      <div>
        <b>Full name</b>: {createField("Full name", 'fullName', [], Input)}
        </div>
      <div> <b>Looking for a job.</b>: {profile.lookingForAJob ? 'Yes' : 'No'}
        {createField("", 'lookingForAJob', [], Input, {type: "checkbox"} )}
       </div>
      
          <div> 
            <b>My professional skills</b>: {profile.lookingForAJobDescription} 
            {createField("My professional skills", "lookingForAJobDescription", [], Textarea, )}
            </div>
      
      <div> 
            <b>About me</b>: {profile.aboutMe } 
            {createField("About me", "aboutMe", [], Textarea, )}
            </div>
      
      <div> <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
          return <div className={styles.contact}>
             {key}: {createField(key, 'contacts.' + key, [], Input)} </div>
      })}.</div>

  </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;
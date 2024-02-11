import { reduxForm } from "redux-form";
import { Input, Textarea, createField } from "../common/forms/FormsControls";

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
            {createField("My professional skills", "lookingForAJob", [], Textarea, )}
            </div>
      
      <div> 
            <b>About me</b>: {profile.aboutMe } 
            {createField("About me", "aboutMe", [], Textarea, )}
            </div>
      <div>{profile.aboutMe}</div>
      <div> <b>User ID</b>: {profile.userId}.</div>
      {/* <div> <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
          return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}.</div> */}

  </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;
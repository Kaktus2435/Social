import React from "react";
// import { maxLengthCreator } from "../../../utils/validators/validators.ts";
import { required } from "../../../utils/validators/validators.ts";
import { InjectedFormProps, reduxForm } from "redux-form";
import { GetStringKeys, Input, createField } from "../../../common/forms/FormsControls.tsx";

type PropsType = {

}

export type AddPostFormValuesType = {
    myNewPost: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

// const maxLength10 = maxLengthCreator(10);
const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>("Your post", "myNewPost", [required], Input)}
            </div>
            <button>Add Post</button>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({ form: "profile-add-post" })(AddPostForm)
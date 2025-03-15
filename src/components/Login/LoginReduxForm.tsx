import React from "react";
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Input, createField } from '../common/forms/FormsControls.tsx';
import { required, maxLengthCreator } from '../utils/validators/validators.ts';
import styles from './../common/forms/FormsControls.module.css';
import CustomButton from "../buttons/CustomButton.tsx";

const maxLength50 = maxLengthCreator(50);
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {

    return (
        <>

            <form onSubmit={handleSubmit}>

                {createField<LoginFormPropertiesTypeKeys>("Email", "email", [required, maxLength50], Input)}
                {createField<LoginFormPropertiesTypeKeys>("Password", "password", [required, maxLength50], Input, { type: "password" })}
                {createField<LoginFormPropertiesTypeKeys>(undefined, 'rememberMe', [], Input, { type: "checkbox" }, "remember me")}
                {captchaUrl && <img alt="captcha" src={captchaUrl} />}
                {captchaUrl && createField("Symbols from img", "captcha", [required], Input, {})}

                {/* <div>
                 <Field component={Input} placeholder='Email' name='email'
                    validate={[required, maxLength50]} />
            </div>
            <div>
                <Field component={Input} name='password' placeholder="Password" type="password"
                    validate={[required, maxLength50]} />
            </div>
            <div>
                <Field component={Input} name='rememberMe' type="checkbox" /> Remember me
            </div> */}

                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <CustomButton text="Login" className={styles.loginButton}></CustomButton>
                </div>
            </form>
        </>
    );
};

export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm); export type LoginFormPropertiesTypeKeys = Extract<keyof LoginFormValuesType, string>;

export type LoginFormValuesType = {
    email: string; password: string; rememberMe: boolean; captcha: string;
};
export type LoginFormOwnProps = {
    captchaUrl: string | null;
};


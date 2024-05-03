import React from "react";
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Input, createField } from '../common/forms/FormsControls.tsx'
import { required, maxLengthCreator } from '../utils/validators/validators.ts'
import { connect } from "react-redux";
import { login } from '../redux/auth-reducer.ts';
import { Navigate } from "react-router-dom";
import style from './../common/forms/FormsControls.module.css';
import { AppStateType } from "../redux/redux.store.ts";

const maxLength50 = maxLengthCreator(50)

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {

    return (
        <>

            <form onSubmit={handleSubmit}>
                
                {createField<LoginFormPropertiesTypeKeys>("Email", "email", [required, maxLength50], Input, )}
                {createField<LoginFormPropertiesTypeKeys>("Password", "password", [required, maxLength50], Input,{type: "password"} )}
                {createField<LoginFormPropertiesTypeKeys>(undefined, 'rememberMe', [], Input, {type: "checkbox"}, "remember me")}
                { captchaUrl && <img alt="captcha" src={captchaUrl}/> }
                { captchaUrl && createField("Symbols from img", "captcha", [required], Input, {} ) }

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

                {error && <div className={style.formSummmaryError}>
                    {error}
                </div>
                }
                <div>
                    <button>Login</button>
                </div>
            </form>
        </>
    );
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        const { email, password, rememberMe, captcha } = formData
        props.login(email, password, rememberMe, captcha)
    }

    if (props.isAuth) return <Navigate to='/profile' />

    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </>
    );
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);

type LoginFormOwnProps = {
    captchaUrl: string | null
}

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormPropertiesTypeKeys = Extract <keyof LoginFormValuesType, string>

export type LoginFormValuesType = {
    email: string, password: string, rememberMe: boolean, captcha: string
}
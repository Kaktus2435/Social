import React from "react";
import { reduxForm } from 'redux-form'
import { Input, createField } from '../common/forms/FormsControls.js'
import { required, maxLengthCreator } from '../utils/validators/validators'
import { connect } from "react-redux";
import { login } from './../redux/auth-reducer.js';
import { Navigate } from "react-router-dom";
import style from './../common/forms/FormsControls.module.css';



const maxLength50 = maxLengthCreator(50)

const LoginForm = ({handleSubmit, error}) => {

    return (
        <>

            <form onSubmit={handleSubmit}>
                
                {createField("Email", "email", [required, maxLength50], Input, )}
                {createField("Password", "password", [required, maxLength50], Input,{type: "password"} )}
                {createField(null, 'rememberMe', null, Input, {type: "checkbox"}, "remember me")}
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



const Login = (props) => {
    const onSubmit = (formData) => {
        const { email, password, rememberMe } = formData
        props.login(email, password, rememberMe)
    }

    if (props.isAuth) return <Navigate to='/profile' />

    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </>
    );
}


const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);


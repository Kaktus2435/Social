import React from "react";
import { Field, reduxForm } from 'redux-form'
import { Input } from '../utils/forms/FormsControls'
import { required, maxLengthCreator } from '../utils/validators/validators'
import { connect } from "react-redux";
import { login } from './../redux/auth-reducer.js';
import { Navigate } from "react-router-dom";




const maxLength50 = maxLengthCreator(50)

const LoginForm = (props) => {

    return (
        <>

            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Input} placeholder='Email' name='email'
                        validate={[required, maxLength50]} />
                </div>
                <div>
                    <Field component={Input} name='password' placeholder="Password" type="password"
                        validate={[required, maxLength50]} />
                </div>
                <div>
                    <Field component={Input} name='rememberMe' type="checkbox" /> Remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </>
    );
}



const Login = (props) => {
    const onSubmit = (formData) => {
        const {email, password, rememberMe} = formData
        props.login(email, password, rememberMe)
    }

    if (props.isAuth) return <Navigate to='/profile'/>

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


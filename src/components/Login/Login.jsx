import React from "react";
import { Field, reduxForm } from 'redux-form'
import { Input } from '../utils/forms/FormsControls'
import { required, maxLengthCreator } from '../utils/validators/validators'
import { connect } from "react-redux";
import { login } from './../redux/auth-reducer.js';
import { Navigate } from "react-router-dom";
<<<<<<< HEAD
import style from './../utils/forms/FormsControls.module.css';
=======

>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7



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
<<<<<<< HEAD

                {props.error && <div className={style.formSummmaryError}>
                    {props.error}
                </div>
                }
=======
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
                <div>
                    <button>Login</button>
                </div>
            </form>
        </>
    );
}



const Login = (props) => {
    const onSubmit = (formData) => {
<<<<<<< HEAD
        const { email, password, rememberMe } = formData
        props.login(email, password, rememberMe)
    }

    if (props.isAuth) return <Navigate to='/profile' />
=======
        const {email, password, rememberMe} = formData
        props.login(email, password, rememberMe)
    }

    if (props.isAuth) return <Navigate to='/profile'/>
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7

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


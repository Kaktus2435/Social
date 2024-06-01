import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/auth-reducer.ts';
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux.store.ts";
import { LoginReduxForm } from "./LoginReduxForm.tsx";
import { LoginFormValuesType } from "./LoginReduxForm.tsx";

export const Login: React.FC = (props) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const dispatch = useDispatch<any>()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) return <Navigate to='/profile' />

    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </>
    );
}
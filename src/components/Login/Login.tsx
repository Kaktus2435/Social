import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/auth-reducer.ts';
import { Navigate, useLocation } from "react-router-dom";
import { AppStateType } from "../redux/redux.store.ts";
import { LoginReduxForm } from "./LoginReduxForm.tsx";
import { LoginFormValuesType } from "./LoginReduxForm.tsx";

export const Login: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const dispatch = useDispatch<any>();

    const location = useLocation();
    const from = location.state?.from?.pathname || '/profile'; 
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }

    if (isAuth) return <Navigate to={from} replace />;

    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </>
    );
}

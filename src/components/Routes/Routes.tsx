import React from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import ProfileContainer from "../../pages/ProfilePage/ProfileContainer.tsx";
import { withSuspense } from "../../hoc/withSuspense.tsx";
import UsersPage from '../../pages/UsersPage/UsersContainer.tsx';

const Login = React.lazy(
  () => import('../Login/Login.tsx').then(module => ({ default: module.Login }))
);
const ChatPage = React.lazy(() => import("../../pages/ChatPage/ChatPage.tsx"));


const LoginWithSuspense = withSuspense(Login);
const UsersContainerWithSuspense = withSuspense(UsersPage);
const ChatWithSuspense = withSuspense(ChatPage);


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProfileContainer />} />
                <Route path="/profile/:userId?" element={<ProfileContainer />} />
                <Route path="/users" element={<UsersContainerWithSuspense />} />
                <Route path="/login" element={<LoginWithSuspense />} />
                <Route path="/chat" element={<ChatWithSuspense />} />
            </Routes>
        </>

    )
}

export default AppRoutes;
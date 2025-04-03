import React from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import ProfileContainer from "../../pages/ProfilePage/ProfileContainer.tsx";
import { withSuspense } from "../../hoc/withSuspense.tsx";
import UsersPage from '../../pages/UsersPage/UsersContainer.tsx';
import DialogsPage from '../../pages/DialogsPage/DialogsContainer.tsx'

const Login = React.lazy(
  () => import('../Login/Login.tsx').then(module => ({ default: module.Login }))
);
const ChatPage = React.lazy(() => import("../../pages/ChatPage/ChatPage.tsx"));


const LoginWithSuspense = withSuspense(Login);
const UsersContainerWithSuspense = withSuspense(UsersPage);
const ChatWithSuspense = withSuspense(ChatPage);
const DialogsWithSuspense = withSuspense(DialogsPage)


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProfileContainer />} />
                <Route path="/profile/:userId?" element={<ProfileContainer />} />
                <Route path="/users" element={<UsersContainerWithSuspense />} />
                <Route path="/login" element={<LoginWithSuspense />} />
                <Route path="/chat" element={<ChatWithSuspense />} />
                <Route path="/dialogs" element={<DialogsWithSuspense />} />
            </Routes>
        </>

    )
}

export default AppRoutes;
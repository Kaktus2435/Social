import React, { ComponentType, useEffect } from 'react'
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import ProfileContainer from './components/Profile/ProfileContainer.tsx';
import { withRouter } from './components/utils/withRouter/withRouter.tsx';
import { initializeApp } from './components/redux/app-reducer.ts';

import store from "./components/redux/redux.store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { withSuspense } from './hoc/withSuspense.tsx';
import { Layout, Menu } from 'antd';
import Header from "./components/header/Header.tsx";
import { chatAPI } from "./api/chatAPI.ts";
import UsersPage from './components/Users/UsersContainer.tsx';
import DialogsPage from './components/dialogs/DialogsContainer.tsx'
import { getIsAuth, getProfile } from "./components/redux/profile-selectors.ts";

import styles from "./App.module.css"

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Login = React.lazy(
  () => import('./components/Login/Login.tsx').then(module => ({ default: module.Login }))
);
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage.tsx'));

const ModalChat = React.lazy(
  () => import('./pages/Chat/ModalChat.tsx').then(module => ({ default: module.ModalChat }))
);

const LoginWithSuspense = withSuspense(Login);
const UsersContainerWithSuspense = withSuspense(UsersPage);
const ChatWithSuspense = withSuspense(ChatPage);
const DialogsWithSuspense = withSuspense(DialogsPage)

const App: React.FC = React.memo(() => {
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  const profile = useSelector(getProfile)

  // Obținem ruta curentă folosind useLocation
  const location = useLocation();
  
  useEffect(() => {
    dispatch(initializeApp());
    chatAPI.start();
    return () => {
      chatAPI.stop();
    };
  }, [dispatch]);

  // Definim cheile active în funcție de ruta curentă
  const getMenuKey = (path: string) => {
    if (path.startsWith('/profile')) return '1';
    if (path.startsWith('/chat')) return '2';
    if (path.startsWith('/users')) return '3';
    if (path.startsWith('/dialogs')) return '4'
    return '';
  };

  const selectedKey = getMenuKey(location.pathname);

  return (
    <Layout className={styles.container}>
      <Header />
      <Layout >
        {isAuth ? (
          <Sider width={200} >
            <Menu
              className={styles.sideMenu_wrapper}
              mode="inline"
              selectedKeys={[selectedKey]}
              defaultOpenKeys={['sub1']}>
                  
                <Menu.Item className={styles.link} key="1"><NavLink to="/profile">Profile</NavLink></Menu.Item>
                <Menu.Item className={styles.link} key="2"><NavLink to="/chat">Chat</NavLink></Menu.Item>
                <Menu.Item className={styles.link} key="3"><NavLink to="/users">Users</NavLink></Menu.Item>
                <Menu.Item className={styles.link} key="4"><NavLink to="/dialogs">Dialogs</NavLink></Menu.Item>
              
            </Menu>
          </Sider>
        ) : null}
        <Layout>
          <Content  className={styles.content} >
            <Routes>
              <Route path="/" element={<ProfileContainer />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersContainerWithSuspense />} />
              <Route path="/login" element={<LoginWithSuspense />} />
              <Route path="/chat" element={<ChatWithSuspense />} />
              <Route path="/dialogs" element={<DialogsWithSuspense />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
});

let AppContainer = compose<ComponentType>(
  withRouter,
  connect(null, { initializeApp })
)(App);

let AppMain: React.FC = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default AppMain;

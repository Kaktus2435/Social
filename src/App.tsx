import React, { ComponentType, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';

import { withRouter } from './components/utils/withRouter/withRouter.tsx';
import { initializeApp } from './components/redux/app-reducer.ts';

import store from "./components/redux/redux.store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Layout, Menu } from 'antd';
import Header from "./components/Header/Header.tsx";
import { chatAPI } from "./api/chatAPI.ts";

import styles from "./App.module.css"
import AppRoutes from './components/Header/Routes/Routes.tsx';
import Footer from './components/Footer/Footer.tsx';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Login = React.lazy(
  () => import('./components/Login/Login.tsx').then(module => ({ default: module.Login }))
);
const ChatPage = React.lazy(() => import('./pages/ChatPage/ChatPage.tsx'));

const ModalChat = React.lazy(
  () => import('./pages/ChatPage/ModalChat.tsx').then(module => ({ default: module.ModalChat }))
);

const App: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
    chatAPI.start();
    return () => {
      chatAPI.stop();
    };
  }, [dispatch]);

  return (
    <Layout className={styles.container}>
      <Header />
        <Layout >
          <Content className={styles.content} >
            <AppRoutes />
          </Content>
        </Layout>
        <Footer />
        
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

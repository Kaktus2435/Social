import React, { ComponentType, Suspense, useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter } from './components/utils/withRouter/withRouter.tsx';
import { initializeApp } from './components/redux/app-reducer.ts';

import store from "./components/redux/redux.store.ts";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Layout } from 'antd';
import Header from "./components/header/Header.tsx";
import { chatAPI } from "./api/chatAPI.ts";

import styles from "./App.module.css"
import AppRoutes from './components/Routes/Routes.tsx';
import Footer from './components/footer/Footer.tsx';
import { useAppDispatch } from './hoc/hooks.ts';

const { Content } = Layout;



const App: React.FC = React.memo(() => {

  const dispatch = useAppDispatch();

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
      <Layout  >
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

let AppMain: React.FC = () => {
  return (
    <Suspense fallback="...is loading">
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </HashRouter>
    </Suspense>
  );
};

export default AppMain;

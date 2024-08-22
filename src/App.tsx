import { Routes, Route, NavLink, Link } from "react-router-dom"
import { connect } from 'react-redux'
import { compose } from 'redux';
import React, { Component, ComponentType } from 'react'

// import Chats from "./pages/Chats";
import SideMenu from './components/side-menu-bar/Side-menu.jsx';
import Footer from './components/footer/Footer.jsx';


import ProfileContainer from './components/Profile/ProfileContainer.tsx';


import { withRouter } from './components/utils/withRouter/withRouter.tsx';
import { initializeApp } from './components/redux/app-reducer.ts';

import store, { AppStateType } from "./components/redux/redux.store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import { withSuspense } from './hoc/withSuspense.tsx';
import Preloader from './components/utils/preloader/Preloader.jsx';

// -------- ant design

import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from 'antd';
import { DesktopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Header from "./components/header/Header.tsx";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

// -------- ant design


const Login = React.lazy(
  () => import('./components/Login/Login.tsx').then(module => ({ default: module.Login }))
);

const UsersPage = React.lazy(
  () => import('./components/Users/UsersContainer.tsx').then(module => ({ default: module.UsersPage }))
);

const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage.tsx'));



const LoginWithSuspense = withSuspense(Login)
const UsersContainerWithSuspense = withSuspense(UsersPage);
const ChatWithSuspense = withSuspense(ChatPage)


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}


class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {

    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />

    }
    return (

      // -------- ant design
      <Layout>
        <Header />
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><UserOutlined />My Profile</span>}>
                <Menu.Item key="1"><NavLink to="/profile">Profile</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to="/chat">Chat</NavLink></Menu.Item>


              </SubMenu>
              <SubMenu key="sub2" title={<span><DesktopOutlined />Developers</span>}>
                <Menu.Item key="3"><NavLink to="/users">Users</NavLink></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><NotificationOutlined />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Routes>
                <Route path="/profile/:userId?" element={<ProfileContainer />} />


                {/* <Route path="/chats" element={<Chats
           store={props.store}
        />} */}

                {/* <Route path="/explore" element={<Chats />} />*/}

                <Route path="/users" element={<UsersContainerWithSuspense />} />
                {/*<Route path="/settings" element={<Chats />} /> */}
                <Route path="/login" element={<LoginWithSuspense />} />
                <Route path="/chat" element={<ChatWithSuspense />} />

                
              </Routes>
            </Content>

          </Layout>
        </Layout>
      </Layout>
      // -------- ant design

      //   <div className="App">
      //   <HeaderContainer />
      //     <SideMenu />

      //     <div className="container">

      //       <Routes>


      //         <Route path="/profile/:userId?" element={<ProfileContainer/>} />


      //         {/* <Route path="/chats" element={<Chats
      //           store={props.store}
      //         />} */}

      //         {/* <Route path="/explore" element={<Chats />} />*/}

      //         <Route path="/users" element={ <UsersContainerWithSuspense /> }/>
      //         {/*<Route path="/settings" element={<Chats />} /> */}
      //         <Route path="/login" element={ <LoginWithSuspense />}/>

      //       </Routes>

      //     </div>
      //     <Footer />

      // </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized
  }
}


let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

let AppMain: React.FC = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}


export default AppMain;
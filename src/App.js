import './App.css';
import { Routes, Route } from "react-router-dom"
import { connect } from 'react-redux'
import { compose } from 'redux';
import React, { Component, lazy } from 'react'

// import Chats from "./pages/Chats";
import SideMenu from './components/side-menu-bar/Side-menu';
import Footer from './components/Footer/Footer';


import HomeContainer from './components/Home/HomeContainer';
import ProfileContainer from'./components/Profile/ProfileContainer';

import HeaderContainer from './components/Header/HeaderContainer';
import MessagesContainer from './components/Messages/MessagesContainer';


import preloader from './components/img/Dual Ring-1s-200px.svg'
import { withRouter } from './components/utils/withRouter/withRouter';
import { initializeApp } from './components/redux/app-reducer';

import store from "./components/redux/redux.store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import { withSuspense } from './hoc/withSuspense';



const Login = lazy(() => import ('./components/Login/Login'));
const UsersContainer = lazy(() => import ('./components/Users/UsersContainer'));

const LoginWithSuspense = withSuspense(Login)
const UsersContainerWithSuspense = withSuspense(UsersContainer);

class App extends Component {
  componentDidMount() {
    
    this.props.initializeApp()
 }
  render() {
    if (!this.props.initialized) {
    return <img src={preloader} alt="" />
   
    }
    return (
      <div className="App">
      <HeaderContainer />
        <SideMenu />

        <div className="container">

          <Routes>
            <Route path="/" element={<HomeContainer />} />
            
            <Route path="/profile/:profileId?" element={<ProfileContainer/>} />
            <Route path="/messages" element={<MessagesContainer />} />

            {/* <Route path="/chats" element={<Chats
              store={props.store}
            />} */}
            
            {/* <Route path="/explore" element={<Chats />} />*/}
            
            <Route path="/friends" element={ <UsersContainerWithSuspense /> }/>
            {/*<Route path="/settings" element={<Chats />} /> */}
            <Route path="/login" element={ <LoginWithSuspense />}/>

          </Routes>

        </div>
        <Footer />
      
    </div>
    )
  }
}

const mapStateToProps = (state) =>{ 
    return {
  initialized: state.app.initialized
}}


let AppContainer = compose(	
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

let AppMain = (props) => {
  return <BrowserRouter>
  <Provider store={store}>
    <AppContainer />
</Provider>
  </BrowserRouter>
}

export default AppMain;
import './App.css';
// import Chats from "./pages/Chats";
import SideMenu from './components/side-menu-bar/Side-menu';
import Footer from './components/Footer/Footer';

import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';

import { Routes, Route } from "react-router-dom"
import HeaderContainer from './components/Header/HeaderContainer';
import HomeContainer from './components/Home/HomeContainer';
import MessagesContainer from './components/Messages/MessagesContainer';

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { compose } from 'redux';


import preloader from './components/img/Dual Ring-1s-200px.svg'
import { withRouter } from './components/utils/withRouter/withRouter';
import { initializeApp } from './components/redux/app-reducer copy';

import store from "./components/redux/redux.store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"

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
      {/* iar */}
      <HeaderContainer />
        <SideMenu />

        <div className="container">

          <Routes>
            <Route path="/" element={<HomeContainer/>} />

            <Route path="/profile/:profileId?" element={<ProfileContainer />} />
            <Route path="/messages" element={<MessagesContainer />} />

            {/* <Route path="/chats" element={<Chats
              store={props.store}
            />} */}
            
            {/* <Route path="/explore" element={<Chats />} />*/}
            <Route path="/friends" element= {<UsersContainer />} />
            {/*<Route path="/settings" element={<Chats />} /> */}
            <Route path="/login" element={<Login />} /> 
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
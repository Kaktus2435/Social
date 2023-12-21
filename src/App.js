import './App.css';
// import Chats from "./pages/Chats";
import SideMenu from './components/side-menu-bar/Side-menu';
import Footer from './components/Footer/Footer';
<<<<<<< HEAD

import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
=======

import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HeaderContainer from './components/Header/HeaderContainer';
import HomeContainer from './components/Home/HomeContainer';
import MessagesContainer from './components/Messages/MessagesContainer';

>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7

import { Routes, Route } from "react-router-dom"
import HeaderContainer from './components/Header/HeaderContainer';
import HomeContainer from './components/Home/HomeContainer';
import MessagesContainer from './components/Messages/MessagesContainer';

import React, { Component } from 'react'
import { connect } from 'react-redux'

<<<<<<< HEAD
import { compose } from 'redux';


import preloader from './components/img/Dual Ring-1s-200px.svg'
import { withRouter } from './components/utils/withRouter/withRouter';
import { initializeApp } from './components/redux/app-reducer copy';

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
      
=======
    <div className="App">
      <Router>
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
      <HeaderContainer />
        <SideMenu />

        <div className="container">

          <Routes>
            <Route path="/" element={<HomeContainer/>} />
<<<<<<< HEAD

            <Route path="/profile/:profileId?" element={<ProfileContainer />} />
            <Route path="/messages" element={<MessagesContainer />} />

=======

            <Route path="/profile/:profileId?" element={<ProfileContainer
              store={props.store}/>} />
            <Route path="/messages" element={<MessagesContainer
            />} />

>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
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

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(	
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);
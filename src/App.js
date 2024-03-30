import './App.css';
import { Routes, Route } from "react-router-dom"
import { connect } from 'react-redux'
import { compose } from 'redux';
import React, { Component, lazy } from 'react'

// import Chats from "./pages/Chats";
import SideMenu from './components/side-menu-bar/Side-menu';
import Footer from './components/Footer/Footer';


import ProfileContainer from'./components/Profile/ProfileContainer.tsx';

import HeaderContainer from './components/Header/HeaderContainer';




import { withRouter } from './components/utils/withRouter/withRouter';
import { initializeApp } from './components/redux/app-reducer.ts';

import store from "./components/redux/redux.store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import { withSuspense } from './hoc/withSuspense';
import Preloader from './components/utils/preloader/Preloader.jsx';



const Login = lazy(() => import ('./components/Login/Login.tsx'));
const UsersContainer = lazy(() => import ('./components/Users/UsersContainer.tsx'));

const LoginWithSuspense = withSuspense(Login)
const UsersContainerWithSuspense = withSuspense(UsersContainer);

class App extends Component {
  componentDidMount() {
    
    this.props.initializeApp()
 }
  render() {
    if (!this.props.initialized) {
    return <Preloader />
   
    }
    return (
      <div className="App">
      <HeaderContainer />
        <SideMenu />

        <div className="container">

          <Routes>
       
            
            <Route path="/profile/:profileId?" element={<ProfileContainer/>} />
            

            {/* <Route path="/chats" element={<Chats
              store={props.store}
            />} */}
            
            {/* <Route path="/explore" element={<Chats />} />*/}
            
            <Route path="/friends" element={ <UsersContainerWithSuspense pageTitle={'ABC'} /> }/>
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
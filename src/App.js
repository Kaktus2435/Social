import './App.css';
// import Chats from "./pages/Chats";
import SideMenu from './components/side-menu-bar/Side-menu';
import Footer from './components/Footer/Footer';

import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HeaderContainer from './components/Header/HeaderContainer';
import HomeContainer from './components/Home/HomeContainer';
import MessagesContainer from './components/Messages/MessagesContainer';


function App(props) {

  return (

    <div className="App">
      <Router>
      <HeaderContainer />
        <SideMenu />

        <div className="container">

          <Routes>
            <Route path="/" element={<HomeContainer/>} />

            <Route path="/profile/:profileId?" element={<ProfileContainer
              store={props.store}/>} />
            <Route path="/messages" element={<MessagesContainer
            />} />

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
      </Router>
    </div>
  );
}

export default App;

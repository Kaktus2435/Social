import './App.css';
import Header from './components/header/Header';
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";
import SideMenu from './components/side-menu-bar/Side-menu';
import Footer from './components/footer/Footer';
import Home from './pages/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(props) {

  return (

    <div className="App">
      <Router>
        <Header />
        <SideMenu />

        <div className="container">

          <Routes>
            <Route path="/" element={<Home/>} />

            <Route path="/profile" element={<Profile
              profilePage={props.appState.profilePage}
              dispatch={props.dispatch}

            />} />
            <Route path="/chats" element={<Chats
              chatsPage={props.appState.chatsPage}
              dispatch={props.dispatch}
            />}
            />
            {/* <Route path="/explore" element={<Chats />} />
            <Route path="/friends" element={<Chats />} />
            <Route path="/settings" element={<Chats />} /> */}
          </Routes>

        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

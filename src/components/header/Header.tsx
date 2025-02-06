import React from "react";
import styles from "./header.module.css";
import { Layout, Avatar, Menu, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, getLogin } from "../redux/auth-selectors.ts";
import { logout } from "../redux/auth-reducer.ts";
import { PhotosType } from "../../types/types.ts";
import { OpenModal } from "../../pages/ChatPage/ModalChat.tsx";
import Logout from "../Logout/Logout.tsx";
import { NavLink, useLocation } from "react-router-dom";


export type MapPropsType = {
  isAuth: boolean
  login: string | null
  logout: string
  smallPhoto: PhotosType

}

export type DispatchPropsType = {
  logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {


  const location = useLocation();

  const getMenuKey = (path: string) => {
    if (path.startsWith('/profile')) return '1';
    if (path.startsWith('/chat')) return '2';
    if (path.startsWith('/users')) return '3';
    if (path.startsWith('/dialogs')) return '4'
    return '';
  };

  const selectedKey = getMenuKey(location.pathname);



  const { Header } = Layout;

  const isAuth = useSelector(getIsAuth)

  const dispatch = useDispatch()


  const logoutCallback = () => {
    dispatch(logout());
  };


  return (
    <Layout>
      <Header style={{ backgroundColor:"#fff", display: "flex", alignItems: "center", width: "100%" }}>

        <div className={styles.containerLogo} >
          <h1 className={styles.logo}>A</h1>
        </div>


        {isAuth ?
          <div className={styles.containerLinks} >
            
            <div>
              <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[selectedKey]}
                style={{ marginLeft: "auto" }}>
                <Menu.Item className={styles.link} key="1"><NavLink to="/profile">Profile</NavLink></Menu.Item>
                <Menu.Item className={styles.link} key="2"><NavLink to="/chat">Chat</NavLink></Menu.Item>
                <Menu.Item className={styles.link} key="3"><NavLink to="/users">Users</NavLink></Menu.Item>
                <Menu.Item className={styles.link} key="4"><NavLink to="/dialogs">Dialogs</NavLink></Menu.Item>
              </Menu>
            </div>
            <div className={styles.header__buttons_wrapper}>
              <OpenModal />
              <Logout />
            </div>
          </div>
          
          : ""}

        {props.isAuth ? <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
          : null}
      </Header>
    </Layout>
  );
}

export default Header;


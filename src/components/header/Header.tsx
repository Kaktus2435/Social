import React, { useState } from "react";
import styles from "./Header.module.css";
import { Layout, Avatar, Menu, ConfigProvider, Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth } from "../redux/auth-selectors.ts";
import { logout } from "../redux/auth-reducer.ts";
import { PhotosType } from "../../types/types.ts";
import { OpenModal } from "../ModalChat/ModalChat.tsx";
import Logout from "../Logout/Logout.tsx";
import { NavLink, useLocation } from "react-router-dom";
//@ts-ignore
import logo from "../../img/LogoA.svg"
import { MenuOutlined } from "@ant-design/icons";


export type MapPropsType = {
  isAuth: boolean
  login: string | null
  logout: string
  smallPhoto: PhotosType

}

export type DispatchPropsType = {
  logout: () => void
}

const items = [
  { key: "1", label: <NavLink to="/profile" className={styles.link}>Profile</NavLink> },
  { key: "2", label: <NavLink to="/chat" className={styles.link}>Chat</NavLink> },
  { key: "3", label: <NavLink to="/users" className={styles.link}>Users</NavLink> },
  { key: "4", label: <NavLink to="/dialogs" className={styles.link}>Dialogs</NavLink> },
]

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

  const [visible, setVisible] = useState(false);


  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);


  return (
    <Layout style={{ height: "63px" }} >
      <Header className={styles.container}>

        <div className={styles.containerLogo} >
          <img src={logo} className={styles.logo} alt="A" />
        </div>

        {isAuth ?
          <div className={styles.containerLinks} >
            <div className={styles.menuContainer} >
              <Menu
                className={`${styles.menuDesktop} ${styles.desktop}`}
                theme="light"
                mode="horizontal"
                selectedKeys={[selectedKey]}
                items={items}
              >
              </Menu>
            </div>
            <div className={styles.buttonsWrapper}>
              <OpenModal />
              <div className={`${styles.logoutButton} ${styles.desktop}`}>
                <Logout />
              </div>
              <Button type="text" onClick={showDrawer}
                className={`${styles.mobileMenuButton} ${styles.mobile}`}>
                <        MenuOutlined style={{ fontSize: "2em", color: "gray" }} />
              </Button>

              <Drawer className={styles.drawer} placement="right" onClose={closeDrawer}
                onClick={closeDrawer} open={visible}>
                <Menu mode="vertical"
                  items={items}>
                </Menu>
                <div className={`${styles.logoutButton} ${styles.mobile}`}>
                  <Logout />
                </div>
              </Drawer>

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


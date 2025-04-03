import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { Layout, Avatar, Menu, Drawer, Button, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth } from "../redux/auth-selectors.ts";
import { PhotosType } from "../../types/types.ts";
import { OpenModal } from "../ModalChat/ModalChat.tsx";
import Logout from "../Logout/Logout.tsx";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
//@ts-ignore
import logo from "../../img/LogoA.svg"
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { AppDispatch } from "../redux/redux.store.ts";
import { getCurrentPage, getPageSize, getUsersFilter } from "../redux/users-selectors.ts";
import { FilterType, requestUsers } from "../redux/usersPageReducer.ts";
import { SearchForm } from "./search/UsersSearchForm.tsx";


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

  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)


  const dispatch: AppDispatch = useDispatch()

  const [searchParams] = useSearchParams()


  useEffect(() => {
    const parsed = Object.fromEntries(searchParams) as { page: string, term: string, friend: string }

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }
    if (!!parsed.friend) actualFilter = { ...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false }


    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  //

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


  const [visible, setVisible] = useState(false);


  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);


  return (
    <Layout style={{ height: "63px" }} >
      <Header className={styles.container}>

        <NavLink className={styles.containerLogo} to="/profile">
          <img src={logo} className={styles.logo} alt="A" />
        </NavLink>

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

              <Popover
                content={
                  <div className={styles.searchForm}>
                    <SearchForm onFilterChanged={onFilterChanged} />
                  </div>
                }
                trigger="click"
                placement="bottomRight"
              >
                <SearchOutlined style={{ fontSize: "2em", color: "gray", cursor: "pointer", padding:"10px" }} />
              </Popover>

              <OpenModal />
              <div className={`${styles.logoutButton} ${styles.desktop}`}>
                <Logout />
              </div>
              <Button type="text" onClick={showDrawer}
                className={`${styles.mobileMenuButton} ${styles.mobile}`}>
                <MenuOutlined style={{ fontSize: "2em", color: "gray", padding:"10px" }} />
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
      </Header>
    </Layout>
  );
}

export default Header;


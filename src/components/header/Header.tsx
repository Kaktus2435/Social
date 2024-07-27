import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { ProfileType } from "../../types/types";
import { Link, NavLink } from "react-router-dom";
import { Row, Col, Menu, Layout, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../redux/redux.store";
import { getIsAuth, getLogin } from "../redux/auth-selectors.ts";
import { logout } from "../redux/auth-reducer.ts";
import logo from "../img/LOGO1.png"
import {ChatPage} from "../../pages/Messages/Messages.tsx";
import { WechatOutlined } from "@ant-design/icons";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
    logout: string

}

export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const { Header } = Layout;

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        // isChatOpen === false ? setIsChatOpen(true) : setIsChatOpen(false)
        setIsChatOpen(!isChatOpen)
    };


    return (


        <Header className="header">

            <Row>
                <div className={styles.header__logo} > <img className={styles.logo} src={logo} alt="logo" /> </div>

                <Col span={20}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}>
                    </Menu>
                </Col>
                {isAuth ?
                    <div>
                        <div>
                            <Row>
                            <Col span={20} >
                            <button className={styles.logout} onClick={logoutCallback}>Logout</button>
                            </Col>
                            </Row>
                        </div>
                        
                    </div>
                    : <NavLink to={'/login'}> <button onClick={login}>
                        Login
                    </button> </NavLink>}
                
                    {props.isAuth ? <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
                        : null}

            </Row>
        </Header>





        /*  <header className={styles.header}>
              
            
         </header> */
    );
}

export default Header;


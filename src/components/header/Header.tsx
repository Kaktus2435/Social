import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { NavLink } from "react-router-dom";
import { Row, Col, Menu, Layout, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, getLogin } from "../redux/auth-selectors.ts";
import { logout } from "../redux/auth-reducer.ts";
import { PhotosType } from "../../types/types.ts";
import { OpenModal } from "../../pages/Chat/ModalChat.tsx";
import switchTheme from "../img/line-md_switch.jpg"

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


        <Header className={styles.header}>

          
                <div className={styles.header__logo_wrapper} > <h1 className={styles.header__logo}>ANDREACT</h1></div>

                {isAuth ?
                    <div className={styles.header__buttons_wrapper}>
                                    <OpenModal />
                                    <img src={switchTheme} />
                                    <button className={styles.button__logout} onClick={logoutCallback}>Logout</button>       

                    </div>
                    : <NavLink to={'/login'}> <button onClick={login}>
                        Login
                    </button> </NavLink>}

                        
                {props.isAuth ? <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
                    : null}

           
        </Header>
    );
}

export default Header;


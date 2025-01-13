import React from "react";
import styles from "./header.module.css";
import { Layout, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, getLogin } from "../redux/auth-selectors.ts";
import { logout } from "../redux/auth-reducer.ts";
import { PhotosType } from "../../types/types.ts";
import { OpenModal } from "../../pages/Chat/ModalChat.tsx";

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


    return (


        <Header className={styles.header}>

          
                <div className={styles.header__logo_wrapper} > 
                    <h1 className={styles.header__logo}>A</h1>
                </div>

                {isAuth ?
                    <div className={styles.header__buttons_wrapper}>
                                    <OpenModal />
                                    <button className={styles.button__authentication} onClick={logoutCallback}>Logout</button>       

                    </div>
                    : ""}

                        
                {props.isAuth ? <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
                    : null}

           
        </Header>
    );
}

export default Header;

